import Fastify, { FastifyInstance } from 'fastify'

const server: FastifyInstance = Fastify({
  // logger: { prettyPrint: true },
})
server.register(import('./app'))

const PORT = parseInt(process.env.PORT || '') || 4000
server.listen(PORT, (err) => {
  console.log(`🚀 Server Listening at port: ${PORT}`)

  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
