const validate = require('./validate')
const upsert = require('./upsert')

module.exports = app => {
  validate(app)
  app.post('/emails', upsert)
}
