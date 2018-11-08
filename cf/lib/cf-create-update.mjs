import util from 'util'
import process from 'child_process'
import Aws from 'aws-sdk'
import {
  getStream,
  readJsonFile,
  readTextFile,
  writeObjectToJsonFile,
  deleteFile,
} from './read-local-file'
import {
  filenameRelativeToInfrastructure,
  filenameRelativeToProjectRoot,
} from './dir-name'

const exec = util.promisify(process.exec)

////// project specific values /////////////
const region = 'us-east-1'
const infrastructureBucketName = 'emailcollect-infrastructure'
const templateName = 'cf-template.json'
const stackName = 'emailcollect'
const getParameters = () => []
////// project specific values /////////////

const infrastructureBucketUrl = `https://${infrastructureBucketName}.s3.amazonaws.com/`
const localTemplateFile = `./cf/${templateName}`
const templateUrl = `${infrastructureBucketUrl}${templateName}`

Aws.config.update({ region })
const s3 = new Aws.S3({ params: { Bucket: infrastructureBucketName } })
const cloudformation = new Aws.CloudFormation()

const created = async () => {
  const list = await cloudformation
    .listStacks({
      StackStatusFilter: [
        'CREATE_IN_PROGRESS',
        'CREATE_FAILED',
        'CREATE_COMPLETE',
        'UPDATE_IN_PROGRESS',
        'UPDATE_COMPLETE_CLEANUP_IN_PROGRESS',
        'UPDATE_COMPLETE',
        'UPDATE_ROLLBACK_IN_PROGRESS',
        'UPDATE_ROLLBACK_FAILED',
        'UPDATE_ROLLBACK_COMPLETE_CLEANUP_IN_PROGRESS',
        'UPDATE_ROLLBACK_COMPLETE',
        'REVIEW_IN_PROGRESS',
      ],
    })
    .promise()

  return list.StackSummaries.some(stack => stack.StackName === stackName)
}

const syncTemplates = async () => {
  console.log('syncing templates...')
  console.log(
    await s3
      .upload({
        Key: templateName,
        Body: getStream(localTemplateFile),
      })
      .promise(),
  )
}

const validateTemplate = async () => {
  console.log('validating template...')
  console.log(`template url: ${templateUrl}`)
  await cloudformation
    .validateTemplate({
      TemplateURL: templateUrl,
    })
    .promise()
}

const waitFor = (type, describeMethod) => async params => {
  console.log(`wait for ${type}...`)
  await cloudformation.waitFor(type, params).promise()

  console.log('wait over!')
  const description = await cloudformation[describeMethod](params).promise()

  console.log(description)
}

const waitForStackCreateCompletion = waitFor(
  'stackCreateComplete',
  'listStackResources',
)
const waitForStackUpdateCompletion = waitFor(
  'stackUpdateComplete',
  'listStackResources',
)
const waitForChangesetCompletion = waitFor(
  'changeSetCreateComplete',
  'describeChangeSet',
)

const createStack = async () => {
  console.log('creating stack...')
  const stack = await cloudformation
    .createStack({
      StackName: stackName,
      TemplateURL: templateUrl,
      OnFailure: 'ROLLBACK',
      Parameters: getParameters(),
      ResourceTypes: ['AWS::*'],
    })
    .promise()
  console.log(stack)
  await waitForStackCreateCompletion({
    StackName: stack.StackId,
  })
  return stack
}

const getStackId = async () => {
  const stack = await cloudformation
    .describeStacks({
      StackName: stackName,
    })
    .promise()
  const stackId = stack.Stacks[0].StackId
  console.log(`stack id: ${stackId}`)
  return stackId
}

const createChangeSet = async StackName => {
  console.log('creating changeset...')
  const timestamp = Number(new Date())
  const changeSet = await cloudformation
    .createChangeSet({
      StackName,
      ChangeSetName: `${stackName}-changeset-${timestamp}`,
      TemplateURL: templateUrl,
      ChangeSetType: 'UPDATE',
      Parameters: getParameters(),
      Capabilities: ['CAPABILITY_NAMED_IAM'],
    })
    .promise()

  const changeSetDescription = await cloudformation
    .describeChangeSet({
      StackName,
      ChangeSetName: changeSet.Id,
    })
    .promise()

  console.log(changeSetDescription)

  try {
    await waitForChangesetCompletion({
      StackName,
      ChangeSetName: changeSet.Id,
    })
  } catch (e) {
    console.warn('wait for changeset complete failed', e)
  }

  if (changeSetDescription.Status === 'FAILED') {
    if (changeSetDescription.StatusReason.includes("didn't contain changes")) {
      console.log('changeset had no changes...')
      return null
    }
    throw new Error(changeSetDescription.StatusReason)
  }

  return changeSet.Id
}

const executeChangeSet = async (StackName, ChangeSetName) => {
  console.log('executing changeset...')
  await cloudformation
    .executeChangeSet({
      StackName,
      ChangeSetName,
    })
    .promise()
  await waitForStackUpdateCompletion({
    StackName,
  })
}

const create = async () => {
  if (await created()) throw new Error('stack already created')

  await validateTemplate()

  await createStack()
}

const update = async () => {
  const isCreated = await created()
  if (!isCreated) throw new Error('stack not created yet')

  const StackName = await getStackId()
  const ChangeSetId = await createChangeSet(StackName)
  if (ChangeSetId) await executeChangeSet(StackName, ChangeSetId)
}

const createOrUpdate = async () => {
  console.log('## create or update stack ##')
  await syncTemplates()
  if (await created()) await update()
  else await create()
}

const getStackResourceInfo = async () => {
  const StackName = await getStackId()

  console.log('getting stack resource info...')
  const resources = await cloudformation
    .listStackResources({
      StackName,
    })
    .promise()

  console.log(resources)
  return resources
}

export const getResourceId = async resourceName => {
  await init()
  const resources = await getStackResourceInfo()
  return resources.StackResourceSummaries.find(
    r => r.LogicalResourceId === resourceName,
  ).PhysicalResourceId
}

export default createOrUpdate
