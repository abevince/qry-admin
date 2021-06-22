import { prisma } from '../prisma'

export default function getSchool(schoolId: string) {
  return prisma.schools.findUnique({
    where: {
      schoolid: schoolId,
    },
  })
}
