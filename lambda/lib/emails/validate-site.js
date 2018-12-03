const normalize = require('../normalize')
const invalidate = require('../invalidate')
const whiteList = require('./white-list')

const invalidateSite = invalidate('site')

// 8 because it assumes https - this will mean http fails which is a good thing
/*
const normalizedUrl = url =>
  url
    .trim()
    .toLowerCase()
    .substring(8)
const domainNameFromUrl = _url => {
  const url = normalizedUrl(_url)
  const endOfDomainName = url.indexOf('/')
  return endOfDomainName === -1 ? url : url.substring(0, endOfDomainName)
}
const domainAllowed = url => whiteList.includes(domainNameFromUrl(url))
*/

module.exports = ({ body: { site: _site } }, res, next) => {
  const sendInvalidation = invalidateSite(res)
  const site = normalize(_site)

  if (!site) sendInvalidation('body must include site')
  else if (!whiteList.includes(site))
    sendInvalidation('site not registered, sign up at https://www.emailswan.com!')
  // else if (!domainAllowed(referer)) sendInvalidation('invalid referer')
  else next()
}
