const validateIp = require('./ip')

module.exports = app => {
  app.use(validateIp)
}
