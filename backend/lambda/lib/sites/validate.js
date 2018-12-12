const validateSite = require('./validate-site')

module.exports = api => {
  api.use('/sites', validateSite)
}
