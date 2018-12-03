const normalize = require('../normalize')
const invalidate = require('../invalidate')

const invalidateEmail = invalidate('email')

const domainBlackList = ['example.com', 'example.org']
const maxLength = 254
const re = /^([\w-\.]+)@([\w-]+\.+[\w-]{2,6})$/

const matcher = index => email => email.match(re)[index]
const domainPart = matcher(2)

module.exports = ({ body: { email: _email } }, res, next) => {
  const sendInvalidation = invalidateEmail(res)
  const email = normalize(_email)
  const emailAllowed = !domainBlackList.includes(domainPart(email))

  if (!email) sendInvalidation('your email address must be included')
  else if (email.length > maxLength)
    sendInvalidation(`email must be shorter than ${maxLength + 1} characters`)
  else if (!re.test(email))
    sendInvalidation('email must be in the form: "recipient@domain.com"')
  else if (!emailAllowed)
    sendInvalidation('email must be on an allowed domain (e.g. not "example.com")')
  else next()
}
