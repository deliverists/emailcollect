const validateSite = require('./validate-site')
const query = require('./query')
const upsert = require('./upsert')

module.exports = api => {
  api.get('/sites', query)
  api.post('/sites', validateSite)
  api.post('/sites', upsert)
}
