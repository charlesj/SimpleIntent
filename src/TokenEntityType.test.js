import { TokenEntityType } from './TokenEntityType'

it('can match a simple entity', () => {
  const entity = TokenEntityType('simple', { simple: ['simple'] })
  expect(entity.match(['simple'])).toMatchSnapshot()
})

it('does not match a simple entity against something else', () => {
  const entity = TokenEntityType('simple', { simple: ['simple'] })
  expect(entity.match(['wat'])).toMatchSnapshot()
})

it('can match phrases', () => {
  const entity = TokenEntityType('phrase', { simple: ['multiple words'] })
  expect(entity.match(['here', 'are', 'multiple', 'words'])).toMatchSnapshot()
})
