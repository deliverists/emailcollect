const maxLength = 16
const re = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/

module.exports = {
  validate(ip) {
    const message = null

    if (ip.length > maxLength) message = 'source ip is too long'
    // if (!re.test(ip)) message = 'source ip is not valid'

    return (message) ? { valid: false, message } : { valid: true }
  }
}
