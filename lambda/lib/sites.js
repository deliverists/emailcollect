const whiteList = [
  'www.clockswan.com',
]

// 8 because it assumes https - this will mean http fails which is a good thing
const normalizedUrl = url.trim().toLowerCase().substring(8)
const domainNameFromUrl = _url => {
  const url = normalizedUrl(_url)
  url.substring(0, url.indexOf('/'))
}

module.exports = {
  validate(site, referer) {
    const siteAllowed = whiteList.includes(site)
    const domainAllowed = whiteList.includes(domainNameFromUrl(referer))
  
    const message = null
    if (!site) message = 'body must include site'
    if (!siteAllowed) message = 'site not registered, sign up at https://www.emailcollect.com!'
    if (!domainAllowed) message = 'invalid referer'

    return (message) ? { valid: false, message } : { valid: true }
  }
}
