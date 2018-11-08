import createOrUpdateStack from './lib/cf-create-update'

const executeasync = async () => {
  await createOrUpdateStack()
}

executeasync().catch(e => {
  console.error(e)
  process.exit(42)
})
