import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class ServerlessCdkFastapiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, 'ApiLayer', {
      code: lambda.Code.fromAsset('layer.zip'),
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_10],
    });

    const apiFunction = new lambda.Function(this, 'ApiFunction', {
      runtime: lambda.Runtime.PYTHON_3_10,
      handler: 'app.handler',
      code: lambda.Code.fromAsset('api'),
      environment: {
        "ROOT_PATH": "/prod/",
      },
      layers: [layer],
    });

    new apigw.LambdaRestApi(this, 'FastApi', {
      handler: apiFunction,
      binaryMediaTypes: ["*/*"],
    });
  }
}
