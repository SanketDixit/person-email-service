import { SQSEvent, Context } from 'aws-lambda';
import { PersonEvent } from '../../models/PersonEvent';
import { ConversionUtils } from '../../utils/ConversionUtils';

export const WelcomeEmailHandler = async (event: SQSEvent, context: Context): Promise<void> => {

    if (!event.Records || event.Records.length === 0) {
        console.error("No messages to process");
        return; // Early return if there are no messages
    }

    await Promise.all(event.Records.map(async (message) => {
        let eventBody: PersonEvent | null = null;

        try {
            if (!message.body) {
                console.error("Message body is null");
                return;
            }

            // Convert JSON message body to PersonEvent object
            eventBody = ConversionUtils.jsonToObject(message.body, PersonEvent);

            if (!eventBody) {
                console.error(`Message Body is not related to Person Create Event: ${message.body}`);
                return;
            }

            console.info(`Triggering email for Message ID: ${message.messageId}`);
            console.info(`Email is triggered for Email: ${eventBody.email}`);
            console.info(`Email is triggered with Text: Welcome ${eventBody.firstName} ${eventBody.lastName}, Your account is created successfully`);

        } catch (error) {
            console.error(`Error in parsing the message body ${message.body} with error: ${(error as Error).message}`);
        }
    }));
};
