import 'reflect-metadata';
import { Container } from "typedi"
import Injector from './injector';
import Processor from "./processor";
import { CreateJourneyRequest } from './types';

export const handler = async (event: CreateJourneyRequest) => {
    await Injector.init();
    const processor = Container.get(Processor);
    processor.process(event);
}