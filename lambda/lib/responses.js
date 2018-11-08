const ApiBuilder = require('claudia-api-builder')

const customResponse = statusCode => error => new ApiBuilder.ApiResponse(
  { error },
  {'Content-Type': 'application/json'},
  statusCode,
)

module.exports = {
  badRequest: customResponse(400),
  serverError: customResponse(500),
}
