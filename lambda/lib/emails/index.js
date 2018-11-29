const validateRequest = require('./validate')
const mapFromRequestObject = require('./map-from-request-object')
const upsert = require('./upsert')
const respond = require('./respond')
const { pipe } = require('../functional')

module.exports = {
  upsert: (req, res) =>
    pipe(
      validateRequest,
      mapFromRequestObject,
      upsert,
      respond(res),
    )(req),
}
