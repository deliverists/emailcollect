const api = require('lambda-api')({ logger: { level: 'debug', access: 'true' } })

const validateRequest = require('./lib/request/validate')
const cors = require('./lib/request/cors')
const emails = require('./lib/emails')

cors(api)
validateRequest(api)

api.get('/health', (req, res) => res.send({ status: 'a-okay' }))
api.get('/emails', (req, res) => res.send({ status: 'some list of emails!' }))
emails(api)

const errorLogger = (err, req, res, next) => {
  console.log(err)
  next()
}
api.use(errorLogger)

exports.handler = async (event, context) => api.run(event, context)
