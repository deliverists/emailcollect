const cors = require('cors')
const whitelist = require('./emails/white-list')

const corsOptions = {
  origin(origin, callback) {
    console.log('NICK IN CORS', origin, whitelist)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

module.exports = cors(corsOptions)
