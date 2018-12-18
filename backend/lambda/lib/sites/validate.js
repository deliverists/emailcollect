const validateSite = require('./validate-site')

module.exports = api => {
  api.post('/sites', validateSite)
}
