'use strict'

const mod = require('./../lambda/index')

const jestPlugin = require('serverless-jest-plugin')
const lambdaWrapper = jestPlugin.lambdaWrapper
const wrapped = lambdaWrapper.wrap(mod, { handler: 'handler' })

describe('health', () => {
  it('always responds with a-okay', () => {
    return wrapped.run({}).then((response) => {
      console.log('info', response)
      expect(response).toBeDefined()
    })
  })
})
