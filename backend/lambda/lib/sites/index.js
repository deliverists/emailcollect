const validate = require('./validate')
const upsert = require('./upsert')

module.exports = api => {
  validate(api)
  api.post('/sites', upsert)
}
