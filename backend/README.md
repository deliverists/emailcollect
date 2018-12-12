# emailcollect

## lambda service info:

### endpoint:

https://7770we21f0.execute-api.us-east-1.amazonaws.com/dev/emails

### resources:

 * GET: /health
 * GET: /emails
 * POST: /emails body: { site, email }

### tests:

#### unit:

for the data access layer we use aws-sdk-mock to stub out the aws sdk dynamo calls to enable us to test our data access modules in isolation.

#### integration:

note: at the moment for integration tests to pass you must run: `yarn run:local` (which runs `sls offline start` to start up the lambda simulation by serverless as well as local dynamo. in fact currently for these integration tests we aren't using the lambda simulation directly as we are using serverless-jest-plugin, but we do depend on local dynamodb running.)

use serverless-jest-plugin, serverless-dynamodb-local and serverless-offline to simulate executing the serverless function locally and calling dynamodb locally. This means all layers of our code will be run from the serverless-http -> expressjs -> our routes -> our logic layers -> out data access/dynamodb layer -> dynamodb itself.

### reading:

 * to create an authenticated end point: https://medium.freecodecamp.org/how-to-secure-microservices-on-aws-with-cognito-api-gateway-and-lambda-4bfaa7a6583c
 * https://serverless-stack.com
 * good examples of event sources: https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html

### typical problems:

if you get the error:
  
```
Error: spawn java ENOENT
    at Process.ChildProcess._handle.onexit (internal/child_process.js:229:19)
    at onErrorNT (internal/child_process.js:406:16)
    at process._tickCallback (internal/process/next_tick.js:63:19)Error: spawn java ENOENT
    at Process.ChildProcess._handle.onexit (internal/child_process.js:229:19)
    at onErrorNT (internal/child_process.js:406:16)
    at process._tickCallback (internal/process/next_tick.js:63:19)
```

then probably you just need to run: `sls dynamodb install`

### todo:

 * for reading: https://d1.awsstatic.com/whitepapers/architecture/AWS-Serverless-Applications-Lens.pdf
 * understand lambda and api gateway integration options: https://medium.com/@lakshmanLD/lambda-proxy-vs-lambda-integration-in-aws-api-gateway-3a9397af0e6d
 * put dynamic cors option in checking site whitelist
 * add referer/ origin option in checking site whitelist
 * add throttling options??? - how reduce potential cost
 * stop dynamo adds for existing email/site combo??? - any dynamo options here?
 * add prod stage
 * add authentication for /get emails route - cognito?
 * error response currently returns HTML not json error?, repo using: `curl -d {\"key\":\"value\"} -H "Content-Type: application/json" -X POST "http://localhost:3000/emails"`
 * `curl -d {\"email\":\"who.com\"} -H "Content-Type: application/json" -X POST "http://localhost:3000/emails"` creates error about missing key table_name - are the process env variables not set up right in local running?
 * need 2 jest test runs based on matching `.integration.test.js` and `.unit.test.js`

 * tests to add - if invalid body then return a 400 not a 500 because of destructuring
 * add unit tests around files with missing coverage
 * remove massive duplication in emails/sites folders
 * remove duplication in integration tests
 * remove pointless mocking of variables() in integration tests - now at request level they aren't used - remove them along with improving the dynamodb query test methods
 * add unit test coverage for sites
 * add better validation for sites registering

### links

#### cognito

 * https://serverless-stack.com/chapters/create-a-cognito-user-pool.html

 * https://aws.amazon.com/getting-started/projects/build-serverless-web-app-lambda-apigateway-s3-dynamodb-cognito/
 * https://medium.freecodecamp.org/how-to-secure-microservices-on-aws-with-cognito-api-gateway-and-lambda-4bfaa7a6583c
