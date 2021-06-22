import { prisma } from '../prisma'

export default function getQuestionnaire(quest_id: number) {
  return prisma.questionnaires.findUnique({
    where: {
      id: quest_id,
    },
  })
}
