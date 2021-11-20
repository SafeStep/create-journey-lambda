import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Service } from "typedi";
import { Journey } from "./types";

@Service()
export default class JourneyInserter {
    
    private documentClient: DocumentClient;

    constructor(documentClient: DocumentClient) {
        this.documentClient = documentClient
    }

    insert(journey: Journey) {
        
    }
}