import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Inject, Service } from "typedi";
import { Journey } from "./types";
import { config } from "aws-sdk"

@Service()
export default class JourneyInserter {
    
    private documentClient: DocumentClient;
    private readonly journeyStoreName: string;

    constructor(
        documentClient: DocumentClient,
        @Inject("journey_store_name") journeyStoreName: string
        ) {
        this.documentClient = documentClient;
        this.journeyStoreName = journeyStoreName;
    }

    async insert(journey: Journey) {
        const params: DocumentClient.PutItemInput = {
            TableName: this.journeyStoreName,
            Item: journey
        }
        try {
            await this.documentClient.put(params).promise()
        }
        catch (err) {
            throw err
        }
    }
}
