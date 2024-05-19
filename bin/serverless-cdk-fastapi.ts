#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ServerlessCdkFastapiStack } from '../lib/serverless-cdk-fastapi-stack';

const app = new cdk.App();
new ServerlessCdkFastapiStack(app, 'ServerlessCdkFastapiStack');
