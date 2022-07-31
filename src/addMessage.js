"use strict";

const AWS = require("aws-sdk");
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const addMessage = async (event) => {

  const newMessage = {"test":"test"};

  const params = {
    "MessageBody": JSON.stringify(newMessage),
    "QueueUrl": "https://sqs.eu-west-2.amazonaws.com/273521126402/MyQueue"
  };

  // By using Callback
  await sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log("There was an Error: ", err);
    } else {
      console.log("Successfully added message to queue", data.MessageId);
    }
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newMessage)
  };
};

module.exports ={
  handler: addMessage
}