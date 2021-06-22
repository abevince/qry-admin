import { FastifyPluginAsync } from 'fastify'

import { prisma } from '../../prisma'

const ResultRoutes: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  interface IParams {
    questId: string
  }
  fastify.route<{ Params: IParams }>({
    method: 'GET',
    url: '/:questId',
    handler: (request) => {
      return prisma.$queryRaw`
        SELECT * FROM schools WHERE schoolid IN
        (SELECT DISTINCT(school) FROM quest_response
        WHERE quest_id=${request.params.questId})
        ORDER BY schools.schoolname
      `
    },
  })
}

export default ResultRoutes
