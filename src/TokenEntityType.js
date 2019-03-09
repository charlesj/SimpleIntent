import natural, { NGrams } from 'natural'

export const TokenEntityType = (name, values) => {
  const tokenizer = new natural.WordTokenizer()

  const tokenizedValues = Object.entries(values).reduce((acc, [entity, synonyms]) => {
    synonyms.forEach(syn => {
      acc.push({ entity, synonymTokens: tokenizer.tokenize(syn) })
    })
    return acc
  }, [])

  const match = (tokens) => {
    const matches = tokenizedValues.map(({ entity, synonymTokens }) => {
      if (synonymTokens.length === 1) {
        const matches = matchSingleTokens(tokens, synonymTokens[0])
        if (matches.length > 0) {
          return matches.map(m => ({ entity, ...m }))
        }
      } else {
        return matchPhrase(tokens, synonymTokens).map(m => ({ entity, ...m }))
      }
    }).filter(m => m).reduce((acc, matches) => acc.concat(matches), [])

    return matches
  }

  return {
    entityType: name,
    match,
  }
}

const hammingMatch = (source, target) => {
  const distance = natural.HammingDistance(source, target, true)
  return distance >= 0 && distance < 2
}

const matchPhrase = (tokens, synonymTokens) => {
  const grammified = NGrams.ngrams(tokens.join(' '), synonymTokens.length)
  const matched = grammified.filter((ngrams) => {
    return ngrams.every((token, index) => hammingMatch(token, synonymTokens[index]))
  })
  return matched.map(m => ({
    value: m,
    position: tokens.indexOf(m[0])
  }))
}



const matchSingleTokens = (tokens, synonym) => {
  const matched = tokens.map((token, index) => {
    if (hammingMatch(synonym, token)) {
      return { token, index }
    }
  }).filter(e => e)

  return matched.map(m => ({
    value: m.token,
    position: m.index,
  }))
}
