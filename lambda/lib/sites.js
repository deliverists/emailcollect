const whiteList = [
  'www.clockswan.com',
]

// 8 because it assumes https - this will mean http fails which is a good thing
const normalizedUrl = url => url.trim().toLowerCase().substring(8)
const domainNameFromUrl = _url => {
  const url = normalizedUrl(_url)
  let endOfDomainName = url.indexOf('/')
  return (endOfDomainName === -1) ? url : url.substring(0, endOfDomainName)
}
const domainAllowed = url => whiteList.includes(domainNameFromUrl(url))

module.exports = {
  domainAllowed,
  validate(site, referer) {
    const siteAllowed = whiteList.includes(site)
    const refererAllowed = domainAllowed(referer)
  
    const message = null
    if (!site) message = 'body must include site'
    if (!siteAllowed) message = 'site not registered, sign up at https://www.emailcollect.com!'
    if (!refererAllowed) message = 'invalid referer'

    return (message) ? { valid: false, message } : { valid: true }
  }
}
