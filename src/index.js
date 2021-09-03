const { docClient, tableName} = require("../src/awsinfo");
const { v4: uuidv4 } = require('uuid');
const { resolve } = require("path/posix");
const { rejects } = require("assert");

var time = new Date();

exports.handler = async function(e, ctx, callback) {
    
    result = await addJourney(e.journey);
    return;
}

// function to be called to add a journey to the journey-store table.
// takes the journey object as the parameter
const addJourney = (journey) => {
    return new Promise(async (resolve, reject) => {
        let journeyToAdd = { ...journey }
        journeyToAdd.journeyID = uuidv4();  // generates a uuid for the journey id
        journeyToAdd.startTime = time.getHours() + ":" + time.getMinutes();  // generates the start time for the journey

        const params = {
            TableName: tableName,
            Item: journey  // specifies the journey object to add
        };

        try {
            await docClient.put(params).promise();  // appends the journey to the journey-store table
            resolve(journey.result);
        } catch (error){
            reject(error);
        }
    })
}