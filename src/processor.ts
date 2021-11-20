import { Service } from "typedi";
import { CreateJourneyRequest, Journey } from "./types";
import { v4 } from "uuid"
import JourneyInserter from "./journey-inserter";

@Service()
export default class Processor {

    private journeyInserter: JourneyInserter;

    constructor(journeyInserter: JourneyInserter) {
        this.journeyInserter = journeyInserter;
    }

    async process(event: CreateJourneyRequest): Promise<Journey> {
        const journeyId = v4();

        const recordToAdd: Journey = {
            ...event,
            journeyId: journeyId,
            status: "started",
            startTime: Date.now()
        }

        this.journeyInserter.insert(recordToAdd);

        return recordToAdd;
    }
}