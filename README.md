# emailcollect

## lambda service info:

### endpoint:

https://778qo5mxx9.execute-api.us-east-1.amazonaws.com/latest

### resources:

 * GET: /health
 * GET: /emails
 * POST: /emails body: { site, email }

### reading:

 * to create an authenticated end point: https://medium.freecodecamp.org/how-to-secure-microservices-on-aws-with-cognito-api-gateway-and-lambda-4bfaa7a6583c
 * https://serverless-stack.com

### todo:

 * move over to serverless
 * add dynamodb + lambda + api gateway (with limiting) into serverless setup
 * then add cognito authentication in
