const AWS = require("aws-sdk");
const journeyStore = "journey-store";

if (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test") {  // if an alternate host is defined
    dynamodbHost = "http://localhost:8000";  // set the local ip

    AWS.config.update({
        region: "localhost",
        endpoint: dynamodbHost
    });
}
else {
    dynamodbHost = "get the arn of the aws DynamoDB table (journey-store)";  // if running out of a (Docker) container it will access through this

    AWS.config.update({
        region: "eu-west-1",
        endpoint: dynamodbHost
    });

}

var docClient = new AWS.DynamoDB.DocumentClient(); // defined here allows AWS region to be updated above

module.exports = {
    docClient,
    journeyStore
}