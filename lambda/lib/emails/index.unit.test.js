const emails = require('./index')

jest.mock('./validate', () => () => 'validate')
jest.mock('./map-from-request-object', () => input => `${input}, mapRequest`)
jest.mock('./upsert', () => input => `${input}, upsert`)
jest.mock('./respond', () => res => input => `${input}, respond-${res}`)

describe('emails', () => {
  test('emails upsert calls validate, then mapRequest, then upsert, then respond (with res) in that order', () => {
    const output = emails.upsert('', 'res')
    expect(output).toEqual('validate, mapRequest, upsert, respond-res')
  })
})
