import { join } from 'path'
import { FastifyPluginAsync } from 'fastify'
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload'
import Cors from 'fastify-cors'
import fastifySensible from 'fastify-sensible'
import underPressure from 'under-pressure'

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  _opts,
): Promise<void> => {
  // Place here your custom code!
  fastify.register(fastifySensible)

  fastify.register(underPressure, {
    maxEventLoopDelay: 1000,
    maxHeapUsedBytes: 1000000000,
    maxRssBytes: 1000000000,
    maxEventLoopUtilization: 0.98,
  })

  fastify.register(Cors, {
    origin: ['http://localhost:3000'],
  })
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  // void fastify.register(AutoLoad, {
  //   dir: join(__dirname, 'plugins'),
  //   options: opts,
  // })

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: { prefix: '/api/v1' },
  })
}

export default app
export { app }
