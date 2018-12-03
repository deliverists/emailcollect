const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const express = require('express')

const validateRequest = require('./lib/request/validate')
const emails = require('./lib/emails')

const app = express()

app.use(bodyParser.json({ strict: false }))
validateRequest(app)

app.get('/health', (req, res) => res.send('a-okay'))
emails(app)

module.exports.handler = serverless(app)
