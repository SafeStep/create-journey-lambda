import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Inject, Service } from "typedi";
import { Journey } from "./types";
import { config } from "aws-sdk"

@Service()
export default class JourneyInserter {
    
    private documentClient: DocumentClient;
    private readonly awsRegion: string;
    private readonly journeyStoreName: string;

    constructor(
        documentClient: DocumentClient,
        @Inject("aws_region") awsRegion: string,
        @Inject("journey_store_name") journeyStoreName: string
        ) {
        this.documentClient = documentClient
        this.awsRegion = awsRegion;
        this.journeyStoreName = journeyStoreName;
    }

    insert(journey: Journey) {
        config.update({
            region: this.awsRegion
        })
    }
}