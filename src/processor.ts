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

        const journey: Journey = {
            greenId: event.greenId,
            startPoint: event.startPoint,
            endPoint: event.endPoint,
            path: event.path,
            journeyId: journeyId,
            status: "started",
            startTime: Date.now()
        }

        try {
            await this.journeyInserter.insert(journey);
        }
        catch (e){
            console.error(e)
            throw new Error("Failed to insert into journey store")
        }

        return journey;
    }
}
