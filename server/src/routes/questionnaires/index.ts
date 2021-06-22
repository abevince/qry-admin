import { FastifyPluginAsync } from 'fastify'

import { prisma } from '../../prisma'

const ResultRoutes: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: () => {
      return prisma.questionnaires.findMany({
        where: {
          id: { not: 1 },
        },
      })
    },
  })
}

export default ResultRoutes
