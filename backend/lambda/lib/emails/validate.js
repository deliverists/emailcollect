const validateEmail = require('./validate-email')
const validateSite = require('./validate-site')

module.exports = app => {
  app.post('/emails', validateEmail)
  app.post('/emails', validateSite)
}
