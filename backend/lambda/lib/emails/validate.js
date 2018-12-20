const validateEmail = require('./validate-email')
const validateSite = require('./validate-site')

module.exports = api => {
  api.use('/emails', validateEmail)
  api.use('/emails', validateSite)
}
