const normalize = require('../normalize')
const invalidate = require('../invalidate')

const invalidateSite = invalidate('site')

const maxLength = 254

module.exports = ({ body, method }, res, next) => {
  if (method !== 'POST') {
    next()
  } else {
    const sendInvalidation = invalidateSite(res)
    const site = normalize(body.site)

    if (!site) sendInvalidation('domain name must be included')
    else if (site.length > maxLength)
      sendInvalidation(`email must be shorter than ${maxLength + 1} characters`)
    else next()
  }
}
