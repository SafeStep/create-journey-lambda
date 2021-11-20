import Processor from "../src/processor"
import { v4 } from 'uuid';
import JourneyInserter from "../src/journey-inserter";

const GREEN_ID = "test-green-id"
const JOURNEY_ID = "fake-journey-id"

// setup mocks

jest.mock("../src/journey-inserter");
jest.mock('uuid', () => {
    return {
        v4: jest.fn()
    };
});

describe("Processor class tests", () => {
    beforeEach(() => {
        (JourneyInserter as jest.Mock).mockClear();
      });

    it("Should create a UUID for the user", async () => {
        // given
        const input = getValidInput();

        //@ts-ignore
        v4.mockReturnValueOnce(JOURNEY_ID)

        //@ts-ignore
        const mockInserter = new JourneyInserter();
        
        const sut = new Processor(mockInserter);

        // when
        const result = await sut.process(input)

        // then
        expect(result.journeyId).toBe(JOURNEY_ID);
        expect(result.greenId).toBe(GREEN_ID);
        expect(result.status).toBe("started");
        expect(result.startPoint).toBe(input.startPoint);
        expect(result.endPoint).toBe(input.endPoint);
        const startTimeThreshold = 1000 // 1000ms
        const now = Date.now();
        expect(result.startTime).toBeGreaterThanOrEqual(now-startTimeThreshold)
        expect(result.startTime).toBeLessThan(now+startTimeThreshold)
        expect(result.path).toBe(input.path)
    })

    it("Should insert the record into the journey store", async () => {
        // given
        let input = getValidInput();

        //@ts-ignore
        v4.mockReturnValueOnce(JOURNEY_ID)
        //@ts-ignore
        const mockInserter = new JourneyInserter();
        
        const sut = new Processor(mockInserter);

        // when
        const result = await sut.process(input)

        // then
        expect(mockInserter.insert).toHaveBeenCalledTimes(1)
        const mockInserterParam = (JourneyInserter as jest.Mock).mock.instances[0].insert.mock.calls[0][0]  // get the parameter used when the mock method was called

        expect(mockInserterParam.journeyId).toBe(JOURNEY_ID);
        expect(mockInserterParam.greenId).toBe(GREEN_ID);
        expect(mockInserterParam.status).toBe("started");
        expect(mockInserterParam.startPoint).toBe(input.startPoint);
        expect(mockInserterParam.endPoint).toBe(input.endPoint);
        const startTimeThreshold = 1000 // 1000ms
        const now = Date.now();
        expect(mockInserterParam.startTime).toBeGreaterThanOrEqual(now-startTimeThreshold)
        expect(mockInserterParam.startTime).toBeLessThan(now+startTimeThreshold)
        expect(mockInserterParam.path).toBe(input.path)
    })
});

const getValidInput = () => {
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
        greenId: GREEN_ID,
        startPoint: startPoint,
        endPoint: endPoint,
        path: path
    }
}