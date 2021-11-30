import JourneyInserter from "../src/journey-inserter";

import { DocumentClient } from "aws-sdk/clients/dynamodb";

const TEST_JOURNEY_STORE_NAME = "wobble"
const TEST_JOURNEY_ID = "myJourney"
const TEST_GREEN_ID = "afakeuserid"

describe("JourneyInserter class tests", () => {
    it("It should make a call to document client", async () => {
        // given
        
        const mockDocumentClient = {
            put: jest.fn(() => {
                return {
                    promise: jest.fn(() => {new Promise((resolve) => {resolve("")})})
                }
            })
        }
    
        //@ts-ignore
        const sut = new JourneyInserter(mockDocumentClient, TEST_JOURNEY_STORE_NAME);
        const journey = createValidJourney();
        
        // when
        await sut.insert(journey);

        // then
        const expectedParams = {
            TableName: TEST_JOURNEY_STORE_NAME,
            Item: journey
        }
        expect(mockDocumentClient.put).toHaveBeenCalledWith(expectedParams);
    })

    it("It should throw an exception if call to document client fails", async () => {
        // given
        const mockDocumentClient = {
            put: jest.fn(() => {
                return {
                    promise: jest.fn(() => {return new Promise((resolve, reject) => {reject(new Error("test-exception"))})})
                }
            })
        }
    
        //@ts-ignore
        const sut = new JourneyInserter(mockDocumentClient, TEST_JOURNEY_STORE_NAME);
        const journey = createValidJourney();

        // when
        await expect(sut.insert(journey))
        .rejects
        .toThrow("test-exception");
    })
})

const createValidJourney = () => {
    const startPoint =  {
        lat: -1,
        long: 1
    };

    const endPoint = {
        lat: 2,
        long: -2
    };

    const path = [
        {
            lat: 0,
            long: 0
        },
        {
            lat: 1,
            long: -1
        },
    ]

    return  {
        journeyId: TEST_JOURNEY_ID,
        greenId: TEST_GREEN_ID,
        startPoint: startPoint,
        endPoint: endPoint,
        startTime: Date.now(),
        path: path,
        status: "started" as "started" | "off-track" | "finished"
    }
}
