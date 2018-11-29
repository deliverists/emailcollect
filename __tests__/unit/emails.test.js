const emails = require('../../lambda/lib/emails')

jest.mock('../../lambda/lib/emails/validate', () => () => 'validate')
jest.mock('../../lambda/lib/emails/map-from-request-object', () => input =>
  `${input}, mapRequest`,
)
jest.mock('../../lambda/lib/emails/upsert', () => input => `${input}, upsert`)
jest.mock('../../lambda/lib/emails/respond', () => res => input =>
  `${input}, respond-${res}`,
)

describe('emails', () => {
  test('emails upsert calls validate, then mapRequest, then upsert, then respond (with res) in that order', () => {
    const output = emails.upsert('', 'res')
    expect(output).toEqual('validate, mapRequest, upsert, respond-res')
  })
})
