const validateIp = require('./ip')

module.exports = api => {
  api.use(validateIp)
}
