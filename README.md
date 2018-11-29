# emailcollect

## lambda service info:

### endpoint:

https://778qo5mxx9.execute-api.us-east-1.amazonaws.com/latest

### resources:

 * GET: /health
 * GET: /emails
 * POST: /emails body: { site, email }


### tests:

#### unit:

for the data access layer we use aws-sdk-mock to stub out the aws sdk dynamo calls to enable us to test our data access modules in isolation.

#### integration:

use serverless-jest-plugin, serverless-dynamodb-local and serverless-offline to simulate executing the serverless function locally and calling dynamodb locally. This means all layers of our code will be run from the serverless-http -> expressjs -> our routes -> our logic layers -> out data access/dynamodb layer -> dynamodb itself.

### reading:

 * to create an authenticated end point: https://medium.freecodecamp.org/how-to-secure-microservices-on-aws-with-cognito-api-gateway-and-lambda-4bfaa7a6583c
 * https://serverless-stack.com
 * good examples of event sources: https://docs.aws.amazon.com/lambda/latest/dg/eventsources.html

### todo:

 * move over to serverless
 * add dynamodb + lambda + api gateway (with limiting) into serverless setup
 * then add cognito authentication in
