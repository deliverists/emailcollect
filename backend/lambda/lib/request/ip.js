const invalidate = require('../invalidate')
const getIp = require('./get-ip')

const maxLength = 16
const re = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/

const invalidateIp = invalidate('ip')

module.exports = (
  req,
  res,
  next,
) => {
  const sendInvalidation = invalidateIp(res)
  const ip = getIp(req)

  if (!ip) sendInvalidation(`source ip does not exist`)
  else if (ip.length > maxLength) sendInvalidation('source ip is too long')
  else if (!re.test(ip)) sendInvalidation('source ip is not valid')
  else next()
}
