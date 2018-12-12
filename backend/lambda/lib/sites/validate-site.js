const normalize = require('../normalize')
const invalidate = require('../invalidate')

const invalidateSite = invalidate('site')

const maxLength = 254

module.exports = ({ body: { site: _site } }, res, next) => {
  const sendInvalidation = invalidateSite(res)
  const site = normalize(_site)

  if (!site) sendInvalidation('domain name must be included')
  else if (site.length > maxLength)
    sendInvalidation(`email must be shorter than ${maxLength + 1} characters`)
  else next()
}
