# aws-sam-express-using-localstack
This demo shows you how to run Express App in AWS SAM using LocalStack

## Requirements
* Docker (verify by running `docker --version`)
* Python 2.7 or 3.6 (verify by running `python --version` or `python3 --version`)
* LocalStack (verify by running `localstack --version`)

## Step 1
Run Docker (install it if you haven't already got it from [here](https://www.docker.com/get-started))

## Step 2
Open Terminal

## Step 3
Create a folder in your desired location

## Step 4
Create a AWS SAM app in that folder by running `sam init`. 
*   For **Choice** enter `1`
*   For **Package Type** enter `1`
*   For **Runtime** enter `7`
*   Give your application a name
*   For **Template Selection**, enter `1`
*   Open the folder in VS Code or any of your favourite text editor.

## Step 5
Create a file in the root and name it `docker-compose.yaml`

## Step 6
Paste the below code in that file

```
version: '3'
services:
  localstack:
    container_name: ${LOCALSTACK_DOCKER_NAME-localstack_express_demo}
    image: localstack/localstack
    network_mode: bridge
    ports:
      - "4566:4566"
    environment:
      - SERVICES=dynamodb
      - DEFAULT_REGION=ap-southeast-2
      - LAMBDA_EXECUTOR=local
      - DATA_DIR=/tmp/localstack/data
    volumes:
      - "./tmp/localstack:/tmp/localstack"
      - "./tmp/localstack/run/docker.sock:/var/run/docker.sock"
```

## Step 7
Open Terminal in VS Code (**Terminal** > **New Terminal**)

## Step 8
Run `docker-compose up` to start the entire app and open a new tab to run remaining commands

## Step 9
Navigate to the sam application folder and install `express` and `aws-serverless-express` by running:
```
npm install express
```
```
npm install aws-serverless-express
```

## Step 10
Create a file in sam application folder, name it `lambda.js` and add the below code in it:

```
const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);

```

## Step 11
In `app.js` replace the existing content with the below:

```
const express = require('express');
const app = express();
app.get('/app', (req, res) => {
    res.send('Hello From Express');
});
app.listen(3000);

module.exports = app;

```

## Step 12
Navigate to `template.yaml` and 
*   Replace `app.lambdaHandler` with `lambda.handler`
*   Replace `Path: /hello` to `Path: /{proxy+}`

## Step 13
Save all the changes and run the below command in the terminal to build the sam application

```
sam build
```

## Step 14
Once build has completed successfully, run the below command in the folder where `template.yaml` is located to start the application

```
sam local start-api
```

## Step 15
Click on the one of the links provided, the browser will open. 

## Step 16
Replace the contents after the last `/` with `app` and it should show **Hello From Express**




