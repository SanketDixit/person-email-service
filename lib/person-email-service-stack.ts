import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { SqsEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { IQueue, Queue } from 'aws-cdk-lib/aws-sqs';

export class PersonEmailServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Consume the queue created by the Person Service
    const personCreatedEventQueue: IQueue = Queue.fromQueueArn(this, 'PersonCreatedEventQueue',
        'arn:aws:sqs:eu-central-1:869935063528:PersonCreatedEventQueue');

    // Lambda for processing the Person Created Event
    const processPersonEventLambda = new Function(this, 'ProcessPersonEventLambda', {
      runtime: Runtime.NODEJS_20_X,
      handler: 'functions/consume/WelcomeEmailHandler.WelcomeEmailHandler',
      code: Code.fromAsset('dist'),
      environment: {
        "PersonCreatedEventQueue": personCreatedEventQueue.queueName
      }
    });

    processPersonEventLambda.addEventSource(new SqsEventSource(personCreatedEventQueue));
    personCreatedEventQueue.grantConsumeMessages(processPersonEventLambda);
  }
}
