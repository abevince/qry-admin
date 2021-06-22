import { FastifyPluginAsync } from 'fastify'

import { prisma } from '../../prisma'

const ResultRoutes: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  interface IParams {
    questId: string
    schoolId: string
  }
  fastify.route<{ Params: IParams }>({
    method: 'GET',
    url: '/non/:questId/:schoolId',
    handler: (request) => {
      return prisma.$queryRaw`
      SELECT * FROM users WHERE token
        NOT IN
        (SELECT username FROM quest_response
         WHERE
         schoolid=${request.params.schoolId})
        AND
        schoolid=${request.params.schoolId}
        AND
        quest_id=${request.params.questId}
      `
    },
  })

  fastify.route<{ Params: IParams }>({
    method: 'GET',
    url: '/:questId/:schoolId',
    handler: (request) => {
      return prisma.$queryRaw`
      SELECT * FROM users WHERE token
         IN
        (SELECT username FROM quest_response
         WHERE
         schoolid=${request.params.schoolId})
        AND
        schoolid=${request.params.schoolId}
        AND
        quest_id=${request.params.questId}
      `
    },
  })
}

export default ResultRoutes
