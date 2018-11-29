const domainBlackList = ['example.com', 'example.org']
const maxLength = 254
const re = /^([\w-\.]+)@([\w-]+\.+[\w-]{2,6})$/

const matcher = index => email => email.match(re)[index]
const namePart = matcher(1)
const domainPart = matcher(2)
const normalize = email => email.trim().toLowerCase()

const validations = {
  normalize,
  validate(_email) {
    const email = normalize(_email)

    const emailPresent = !!email
    const emailValidSize = email.length <= maxLength
    const emailValid = re.test(email)
    const emailAllowed = !domainBlackList.includes(domainPart(email))

    const message = null
    if (!emailPresent) message = 'your email address must be included'
    if (!emailValidSize)
      message = `email must be shorter than ${maxLength + 1} characters`
    if (!emailValid) message = 'email must be in the form: "recipient@domain.com"'
    if (!emailAllowed)
      message = 'email must be on an allowed domain (e.g. not "example.com")'

    return message ? { valid: false, message } : { valid: true }
  },
}

module.exports = req => req
