#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PersonEmailServiceStack } from '../lib/person-email-service-stack';

const app = new cdk.App();
new PersonEmailServiceStack(app, 'PersonEmailServiceStack', {
    env: { account: 'Please enter a valid AWS account', region: 'eu-central-1' }
});
