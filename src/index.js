const { docClient, journeyStore} = require("../src/awsinfo");

exports.handler = async function(e, ctx, callback) {

    var params = {
        Item: {
            JID: e.journeyID,
            UID: e.userID,
            time: e.startTime,
            start: e.startPoint,
            end: e.endPoint,
            status: e.status
        },

        TableName: "journey-store"
    };

    docClient.put(params, function(error, data){
        if(error){
            callback(error, null);
        }
        else{
            callback(null, data);
        }
    });
}