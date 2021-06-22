import { quest_question, quest_question_choice } from '.prisma/client'
import { prisma, Prisma } from '../prisma'

export async function getRankResults(
  question: quest_question,
  responses: string[],
) {
  const questionRankChoices = await prisma.quest_question_choice.findMany({
    where: {
      AND: [{ question_id: question.id }],
    },
  })
  const questionRankRow = questionRankChoices.filter(
    (choice) => choice.value === 0,
  )
  const questionRankCol = questionRankChoices.filter(
    (choice) => choice.value !== 0,
  )

  const rankResultsPromise = questionRankRow.map(async (choice) => {
    return rankRowResult(responses, question, choice, questionRankCol)
  })
  return {
    question_id: question.id,
    question: question.question,
    type_id: question.type_id,
    position: question.position,
    columns: questionRankCol,
    result: await Promise.all(rankResultsPromise),
  }
}
interface TResult {
  content: string
  _count: number
}
export function rankRowResult(
  responses: string[],
  question: quest_question,
  choice: quest_question_choice,
  questionRankCol: quest_question_choice[],
) {
  return new Promise(async (resolve, _reject) => {
    const result: TResult[] =
      await prisma.$queryRaw`SELECT b.content, COUNT(a.id) AS _count FROM
     quest_response_rank AS a
     INNER JOIN quest_question_choice AS b
     ON a.rank=b.value AND a.question_id=b.question_id
     WHERE a.question_id=${question.id} AND choice_id=${choice.id} AND
     response_id IN (${Prisma.join(responses)})
     GROUP BY a.rank`

    if (result.length < questionRankCol.length) {
      // const diff = questionRankCol.length - result.length
      // const arraySlice = questionRankCol.slice(0, diff)
      // const zeroRes = arraySlice.map((choice) => {
      //   return { content: choice.content, _count: 0 }
      // })

      const res = questionRankCol.map((choice) => {
        const resultItem = result.find(
          (resultItem) => choice.content === resultItem.content,
        )
        if (!resultItem) return { content: choice.content, _count: 0 }
        return resultItem
      })
      resolve({
        question: choice.content,
        result: [...res],
      })
    } else {
      resolve({
        question: choice.content,
        result: result,
      })
    }
  })
}
