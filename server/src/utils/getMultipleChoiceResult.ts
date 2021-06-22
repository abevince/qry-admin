import { quest_question } from '.prisma/client'
import { prisma, Prisma } from '../prisma'

export function getMultipleChoiceResult(
  question: quest_question,
  responses: string[],
) {
  return new Promise(async (resolve, _reject) => {
    if (question.type_id === 3) {
      // const result = await prisma.quest_response_single.groupBy({
      //   where: {
      //     AND: [
      //       { question_id: question.id },
      //       { response_id: { in: responses } },
      //     ],
      //   },
      //   by: ['choice_id'],
      //   _count: {
      //     choice_id: true,
      //   },
      // })
      const result =
        await prisma.$queryRaw`SELECT b.content, COUNT(a.choice_id) AS _count FROM
      quest_response_single AS a
      INNER JOIN quest_question_choice AS b
      ON a.choice_id=b.value AND a.question_id=b.question_id
      WHERE a.question_id=${question.id} AND
      response_id IN (${Prisma.join(responses)})
      GROUP BY a.choice_id`
      resolve({
        question_id: question.id,
        question: question.question,
        type_id: question.type_id,
        position: question.position,
        result: result,
      })
    } else if (question.type_id === 4) {
      // const result = await prisma.quest_response_multiple.groupBy({
      //   where: {
      //     AND: [
      //       { question_id: question.id },
      //       { response_id: { in: responses } },
      //     ],
      //   },
      //   by: ['choice_id'],
      //   _count: {
      //     choice_id: true,
      //   },
      // })
      //     SELECT b.content, COUNT(a.choice_id) AS _count FROM
      //     quest_response_multiple AS a
      //     INNER JOIN quest_question_choice AS b
      //     ON a.choice_id=b.value AND a.question_id=b.question_id
      //     WHERE a.question_id=120 AND
      //     response_id IN (SELECT response_id FROM quest_response
      // WHERE quest_id=6 AND school='1d98eb4683cf4e3152c67fe0ea9457d4')
      //     GROUP BY a.choice_id
      //     SELECT a.content, COUNT(b.choice_id) AS _count FROM
      //     quest_question_choice AS a
      //     LEFT OUTER JOIN quest_response_single AS b
      //     ON b.choice_id=a.value AND b.question_id=a.question_id
      //     WHERE a.question_id=120 AND
      //     response_id IN (SELECT response_id FROM quest_response
      // WHERE quest_id=6 AND school='1d98eb4683cf4e3152c67fe0ea9457d4')
      //     GROUP BY value
      const result =
        await prisma.$queryRaw`SELECT b.content, COUNT(a.choice_id) AS _count FROM
      quest_response_multiple AS a
      INNER JOIN quest_question_choice AS b
      ON a.choice_id=b.value AND a.question_id=b.question_id
      WHERE a.question_id=${question.id} AND
      response_id IN (${Prisma.join(responses)})
      GROUP BY a.choice_id`
      resolve({
        question_id: question.id,
        question: question.question,
        type_id: question.type_id,
        position: question.position,
        result: result,
      })
    }
  })
}
