const validateSite = require('./validate-site')
const query = require('./query')
const upsert = require('./upsert')

module.exports = api => {
  api.use('/sites', validateSite)
  api.get('/sites', query)
  api.post('/sites', upsert)
}
