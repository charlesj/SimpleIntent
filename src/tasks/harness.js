import { SimpleIntent } from '../SimpleIntent'
import { TokenEntityType } from '../TokenEntityType'

export const runHarness = () => {

  const agent = SimpleIntent()

  const wifiEntity = TokenEntityType('wifi', {
    wifi: [
      'WiFi',
      'btnWiFi',
      'WiFi_Access',
      'Network',
      'Password',
      'Access',
      'internet',
      'web',
    ]
  })


  const materialsEntity = TokenEntityType('materials', {
    materials: [
      'Materials', 'btnMaterials', 'Presentations', 'Resources', 'Handouts', 'Slides', 'PDFs', 'Decks', 'Session Slides', 'Session Handouts', 'Session Decks', 'Speaker Materials', 'Speaker Handouts', 'Speaker Slides', 'Presentation Materials', 'Presentation Handouts', 'Presentation Slides', 'Presentation Decks', 'Speaker Decks', 'Powerpoints', 'Power Points', 'Speaker Notes', 'Notes', 'Abstracts', 'Video', 'Recordings', 'Video Recordings', 'Presentations/Slides', 'Content', 'Briefings', 'videotape', 'video tape', 'videotaped', 'live stream', 'live streaming', 'streaming', 'PPT', 'PPTs', 'live streamed', 'slideshare', 'Talk',
    ],
  })

  const agendaEntity = TokenEntityType('agenda', {
    agenda: [
      'Agenda', 'btnAgenda', 'Schedule', 'Sessions', 'Timetable', 'What\'s On', 'Whats On', 'Morning Breakout Sessions', 'Afternoon Breakout Sessions', 'General Sessions', 'Plenary', 'Plenary Sessions', 'Itinerary', 'Talks', 'Keynote', 'Activities', 'Speeches', 'Topics', 'Presentations', 'Breakouts', 'Breakout Sessions', 'Schedules', 'Plan', 'Gameplan', 'game plan', 'Happening', 'Meeting', 'Meetings', 'Activity',
    ],
  })

  const restroomEntity = TokenEntityType('restroom', {
    restroom: [
      'restroom', 'restrooms', 'bathrooms', 'toilets', 'loo', 'bathroom',
    ],
  })



  const wifiIntent = {
    name: 'wifi',
    trainingPhrases: [
      'how much is wifi',
      'how do i get on the wifi',
      'how do i access wifi',
    ]
  }

  const materialsIntent = {
    name: 'materials',
    trainingPhrases: [
      'How to download the {materials}',
      'where are {materials} for download',
      'will the {agenda} be {materials}',
      'how can I get a copy of the {materials}',
      'where can I find {materials} from today\'s {agenda}',
    ],
  }

  const restroomsIntent = {
    name: 'restrooms',
    trainingPhrases: [
      'where is the {restroom}',
      'how do I get to the {restroom}',
      'nearest {restroom}',
      '{restroom}',
      'i need to pee',
      'is there a {restroom}',
      'where are the {restroom}',
      'gotta pee',
    ],
  }

  agent.addEntity(wifiEntity)
  agent.addEntity(materialsEntity)
  agent.addEntity(agendaEntity)
  agent.addEntity(restroomEntity)
  agent.addIntent(wifiIntent)
  agent.addIntent(materialsIntent)
  agent.addIntent(restroomsIntent)

  agent.train()

  const tests = [
    { input: 'How do I get on wifi?', intent: wifiIntent.name },
    { input: 'where can I download the slides?', intent: materialsIntent.name },
    { input: 'where is the bathroom', intent: restroomsIntent.name },
    { input: 'restroom', intent: restroomsIntent.name },
    { input: 'bathroom', intent: restroomsIntent.name },
    { input: 'will the power points be available', intent: materialsIntent.name }
  ]

  tests.forEach(test => {
    const result = agent.detectIntent(test.input)
    const match = result.intent === test.intent
    console.log(match ? 'SUCCESS' : 'FAILED', `expected ${test.intent} recieved ${result.intent}`)
  })
}

