import natural from 'natural'
import _ from 'lodash'
import { replaceWithEntityMatches } from './replaceWithEntityTokens'

export const SimpleIntent = () => {
  const intents = []
  const entities = []
  const tokenizer = new natural.WordTokenizer()
  const classifier = new natural.BayesClassifier()

  return {
    addEntity: (entity) => entities.push(entity),
    addIntent: (intent) => intents.push(intent),
    train: () => {
      intents.forEach((intent) => {
        intent.trainingPhrases.forEach((tp) => {
          const trainingTokens = tokenizer.tokenize(tp)
          classifier.addDocument(trainingTokens, intent.name)
        })
      })
      classifier.train()
    },
    detectIntent: (phrase) => {
      const inputTokens = tokenizer.tokenize(phrase)
      const matches = entities.reduce((acc, entity) => {
        const entityMatches = entity.match(inputTokens)
        return acc.concat(entityMatches)
      }, [])

      const classifications = classifier.getClassifications(replaceWithEntityMatches(inputTokens, matches))

      const top = _.reverse(_.sortBy(classifications, c => c.value))

      return {
        intent: top[0].label,
        entities: matches,
        intents: classifications.map(c => ({ name: c.label, score: c.value })),
      }
    }
  }
}
