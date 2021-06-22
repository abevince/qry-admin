import { prisma } from '../prisma'
import fs from 'fs'

import { quest_response_rank } from '.prisma/client'
import getQuestions from './getQuestions'
import getResponses from './getResponses'

export default async function (questId: string) {
  const questionnaireId = parseInt(questId)
  const [responses, questions] = await Promise.all([
    getResponses('', questionnaireId),
    getQuestions(questionnaireId),
  ])
  const csvHeader = questions.map(({ type_id, quest_question_choice }) => {
    if (type_id === 3 || type_id === 4) {
      return quest_question_choice
    } else if (type_id === 6) {
      return quest_question_choice.filter(
        (choice) => choice.value === 0 ?? choice.content,
      )
    }
  })

  const header = csvHeader.flat().map((item) => item?.content)

  const rowRow = responses.map(async (res) => {
    const filteredChoiceResponse: quest_response_rank[] =
      await prisma.$queryRaw`
        SELECT *, 0 as rank FROM quest_response_multiple
        WHERE response_id=${res.response_id}
        UNION
        SELECT *, 0 as rank FROM quest_response_single
        WHERE response_id=${res.response_id}
        UNION
        SELECT * FROM quest_response_rank
        WHERE response_id=${res.response_id}
      `
    const row = await questions
      .map((question) => {
        if (question.type_id === 3 || question.type_id === 4) {
          return question.quest_question_choice.map((choice) => {
            if (
              filteredChoiceResponse.find(
                (e) =>
                  e.response_id === res.response_id &&
                  e.question_id === choice.question_id &&
                  e.choice_id === choice.value,
              )
            ) {
              return 1
            }
            return 0
          })
        } else if (question.type_id === 6) {
          const rowQuestion = question.quest_question_choice.filter(
            (choice) => choice.value === 0,
          )
          const valueRow = question.quest_question_choice.filter(
            (choice) => choice.value !== 0,
          )
          return rowQuestion.map((choice) => {
            const x = filteredChoiceResponse.find(
              (e) =>
                e.response_id === res.response_id &&
                e.question_id === choice.question_id &&
                e.choice_id === choice.id,
            )
            if (x) {
              return valueRow.find((e) => x.rank === e.value)?.content
            }
            return 0
          })
        }
      })
      .flat()
      .map((col) => `"${col}"`)
      .join(',')
    return `${`"${res.response_id}","${res.school}","${res.schools.schoolname}","${res.schools.program}"`},${row}`
  })
  const x = await Promise.all(rowRow)
  x.unshift(
    ['responseId', 'school', 'schoolname', 'program', ...header]
      .map((col) => `"${col}"`)
      .join(','),
  )
  const fileName = `./csv/${questId}-${Date.now().toString()}-result.csv`
  fs.writeFileSync(fileName, x.join('\n'))
  return {
    fileName,
  }
}
