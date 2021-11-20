import 'reflect-metadata';
import { Container } from "typedi"
import Injector from './injector';
import { SQSEvent } from "aws-lambda";
import Processor from "./processor";

export const handler = async (event: SQSEvent) => {
    await Injector.init();
    const processor = Container.get(Processor);
    for (const record of event.Records) {
        await processor.process(record);
    }
}