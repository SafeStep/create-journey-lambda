import { Time } from "aws-sdk/clients/codedeploy";

interface GeoCoordinate {
    lat: number,
    long: number
}

interface CreateJourneyRequest {
    greenId: string,
    startPoint: GeoCoordinate,
    endPoint: GeoCordinate,
    path: GeoCoordinate[]
}

interface Journey {
    journeyId: string,
    greenId: string,
    startTime: number,
    startPoint: GeoCoordinate,
    endPoint: GeoCoordinate,
    path: GeoCoordinate[],
    status: "started" | "off-track" | "finished"
}
