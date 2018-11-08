const ApiBuilder = require('claudia-api-builder')

const customResponse = statusCode => body => {
  const headers = {
    'Content-Type': 'application/json',
  }

  return new ApiBuilder.ApiResponse(
    (typeof body === 'string') ? { info: body } : body,
    headers,
    statusCode,
  )
}

module.exports = {
  success: customResponse(200),
  badRequest: customResponse(400),
  serverError: customResponse(500),
}
