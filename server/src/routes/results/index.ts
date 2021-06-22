import { FastifyPluginAsync } from 'fastify'
import fs from 'fs'
import createCSVResult from '../../utils/createCSVResult'
import getResult from '../../utils/getResult'

const ResultRoutes: FastifyPluginAsync = async (
  fastify,
  _opts,
): Promise<void> => {
  interface IResultParams {
    questId: string
    schoolId: string
  }
  fastify.route<{ Params: IResultParams }>({
    method: 'GET',
    url: '/:questId/:schoolId',
    handler: (request) => {
      return getResult(request.params.questId, request.params.schoolId)
    },
  })

  interface ICSVParams {
    questId: string
  }
  fastify.route<{ Params: ICSVParams }>({
    method: 'GET',
    url: '/csv/:questId',
    handler: async (request, reply) => {
      try {
        const csvData = await createCSVResult(request.params.questId)
        const buffer = fs.readFileSync(csvData.fileName, 'utf-8')

        reply
          .header(
            'Content-disposition',
            `attachment; filename=${csvData.fileName}`,
          )
          .header('Content-Type', 'text/csv; charset=utf-8')
          .send(buffer)
      } catch (error) {
        console.log(error)
        reply.internalServerError('Something went wrong')
      }
    },
  })
}

export default ResultRoutes
