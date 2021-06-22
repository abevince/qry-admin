import { prisma } from '../prisma'

export default function getQuestions(quest_id: number) {
  return prisma.quest_question.findMany({
    where: {
      AND: [{ quest_id: quest_id }],
    },
    orderBy: {
      position: 'asc',
    },
    include: {
      quest_question_choice: true,
    },
  })
}
