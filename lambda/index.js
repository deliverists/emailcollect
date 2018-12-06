const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

const validateRequest = require('./lib/request/validate')
const emails = require('./lib/emails')

const app = express()

app.use(cors())
app.use((req, res, next) => {
  console.log('NICK IN YOUR YULE LOGS', req)
  next()
})
app.use(bodyParser.json({ strict: false }))
validateRequest(app)

app.get('/health', (req, res) => res.send({ status: 'a-okay' }))
app.get('/emails', (req, res) => res.send({ status: 'some list of emails!' }))
emails(app)

module.exports.handler = serverless(app)
