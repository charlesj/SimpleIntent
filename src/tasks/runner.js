process.on('unhandledRejection', r => {
  console.log('Unhandled Promise Rejection', r)
  process.exit(1)
})

const main = async () => {
  const { taskMap } = require('./taskMap')
  const [, , taskName, ...rest] = process.argv
  const task = taskMap[taskName]

  if (!task) {
    console.error(`Unknown Task ${taskName}`)
    console.log('\tKnown tasks')
    Object.keys(taskMap).forEach(key => console.log('\t', key))
    process.exit(1)
  }
  await task(...rest)
}

main().then(() => {
  process.exit(0)
}).catch((err) => {
  console.log('error', err)
  process.exit(1)
})
