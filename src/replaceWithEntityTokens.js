import _ from 'lodash'

export const replaceWithEntityMatches = (tokens, matches) => {
  const sorted = _.reverse(_.sortBy(matches, m => m.position))

  return sorted.reduce((acc, match) => {
    if (Array.isArray(match.value)) {
      const beginning = acc.slice(0, match.position)
      const end = acc.slice(match.position + match.value.length, acc.length)
      return [...beginning, match.entity, ...end]
    } else {
      acc[match.position] = match.entity
      return acc
    }
  }, tokens).join(' ')
}
