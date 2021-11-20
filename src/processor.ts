import { Service } from "typedi";
import { CreateJourneyRequest, Journey } from "./types";

@Service()
export default class Processor {
    process(event: CreateJourneyRequest): any {
        return;
    }
}