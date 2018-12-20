const validate = require('./validate')
const upsert = require('./upsert')

module.exports = api => {
  validate(api)
  api.post('/emails', upsert)
  api.get('/emails', (req, res) => res.send({ status: 'some list of emails!' }))
}
