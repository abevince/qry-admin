import { getMultipleChoiceResult } from './getMultipleChoiceResult'
import getQuestionnaire from './getQuestionnaire'
import getQuestions from './getQuestions'
import { getRankResults } from './getRankResponses'
import getResponses from './getResponses'
import getSchool from './getSchool'

export default async function getResult(questId: string, schoolId: string) {
  const quest = parseInt(questId)
  const school = schoolId
  const [responses, questions, schoolData, questData] = await Promise.all([
    getResponses(school, quest),
    getQuestions(quest),
    getSchool(school),
    getQuestionnaire(quest),
  ])
  if (!responses || responses.length === 0) {
    return null
  }
  if (!questions || questions.length === 0) {
    return null
  }
  const responseArray = responses.map((res) => {
    return res.response_id
  })

  const resultPromiseArray = questions.map(async (question) => {
    if (question.type_id === 6) {
      return getRankResults(question, responseArray)
    } else if (question.type_id === 3 || question.type_id === 4) {
      return getMultipleChoiceResult(question, responseArray)
    }
  })

  return {
    school: schoolData,
    questionnaire: questData,
    result: await Promise.all(resultPromiseArray),
  }
}
