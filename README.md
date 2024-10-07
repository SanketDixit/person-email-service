# Welcome to CDK TypeScript project

This project is a simple SQS queue subscription module designed to listen to messages posted on an SQS queue. 
It processes incoming messages and can be used to trigger an email based on the content of the messages. 
This functionality enables easy integration with other microservices that publish events to the SQS queue, 
making it ideal for scenarios such as sending automated email notifications or alerts.

## Useful commands to execute the project

* `npm run build`     compile typescript to js
* `npm cdk bootstrap` required to run only if you are deploying the stack for the first time
* `npx cdk deploy`    deploy this stack to your default AWS account/region

## Solution Approach & Future Enhancements

### Solution Approach

This project is an attempt on my part to gain hands-on experience with TypeScript, which is not my primary area 
of expertise. The solution implemented here is simple and straightforward.

* In the main project, [person-service](https://github.com/SanketDixit/person-service), an entry is created in DynamoDB, 
and an event is published to an SQS Queue about the creation of the Person.
* This project includes a Lambda function that subscribes to the same SQS Queue to consume the published message for 
further processing.
* Currently, the Lambda function is configured to log the information consumed from the Queue, which can be found in 
CloudWatch Logs.

### Future Enhancements

This project/service can be used for tasks such as triggering a Welcome Email when a new user or person is created 
in our system. As the person-service publishes an event to the SQS queue upon the creation of a new entry in DynamoDB, 
this service listens to that event through a Lambda function, making it suitable for initiating follow-up actions like 
sending welcome emails to newly created users.
