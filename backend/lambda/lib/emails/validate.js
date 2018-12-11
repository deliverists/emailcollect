const validateEmail = require('./validate-email')
const validateSite = require('./validate-site')

module.exports = api => {
  api.post('/emails', validateEmail)
  api.post('/emails', validateSite)
}
