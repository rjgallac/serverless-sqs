"use strict";

const AWS = require("aws-sdk");
AWS.config.update({region: 'eu-west-2'});

// Create an SQS service object
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = "https://sqs.eu-west-2.amazonaws.com/273521126402/MyQueue";


const fetchMessages = async (event,context) => {
  
  var params = {
    AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
        "All"
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
    };
    let results = [];
    const { Messages } = await sqs.receiveMessage(params, function(err, data) {
      if (err) {
        console.log("Receive Error", err);
      } else if (data.Messages) {
  
       console.log("found messages")
       
      }
    }).promise();
    console.log(Messages)
    results =  Messages.map(m => JSON.parse(m.Body));
    console.log(results)
    return {
      statusCode: 200,
      body: JSON.stringify(results)
    };
 

};

module.exports ={
  handler: fetchMessages
}