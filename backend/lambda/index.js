const api = require('lambda-api')({ logger: { level: 'debug', access: 'true' } })

const errorLogger = require('./lib/request/error-logger')
const cors = require('./lib/request/cors')
const validateIp = require('./lib/request/ip')

const emails = require('./lib/emails')
const sites = require('./lib/sites')

api.use(errorLogger)
api.use(cors)
api.use(validateIp)

emails(api)
sites(api)

exports.handler = async (event, context) => api.run(event, context)
