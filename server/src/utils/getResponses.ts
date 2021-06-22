import { prisma } from '../prisma'

export default function getResponses(school_id: string, quest_id: number) {
  if (school_id === '') {
    return prisma.quest_response.findMany({
      where: {
        quest_id: quest_id,
      },
      include: {
        schools: true,
      },
      orderBy: { id: 'asc' },
    })
  } else {
    return prisma.quest_response.findMany({
      where: {
        school: school_id,
        quest_id: quest_id,
      },
      include: {
        schools: true,
      },
    })
  }
}
