import { replaceWithEntityMatches } from './replaceWithEntityTokens'

it('can replace a single value', () => {
  const tokens = ['replace', 'me']
  const matches = [{ entity: 'replaced', value: 'me', position: 1 }]
  expect(replaceWithEntityMatches(tokens, matches)).toEqual('replace replaced')
})

it('can replace a phrase synonym', () => {
  const tokens = ['here', 'is', 'a', 'phrase']
  const matches = [{ entity: 'replaced', value: ['a', 'phrase'], position: 2 }]
  expect(replaceWithEntityMatches(tokens, matches)).toEqual('here is replaced')
})

it('can replace a phrase at the beginning', () => {
  const tokens = ['a', 'phrase', 'here', 'is']
  const matches = [{ entity: 'replaced', value: ['a', 'phrase'], position: 0 }]
  expect(replaceWithEntityMatches(tokens, matches)).toEqual('replaced here is')
})
