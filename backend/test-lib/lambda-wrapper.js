const jestPlugin = require('serverless-jest-plugin')

const { lambdaWrapper } = jestPlugin
module.exports = lambdaModule =>
  lambdaWrapper.wrap(lambdaModule, { handler: 'handler' })
