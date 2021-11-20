import Processor from "../src/processor"
import { v4 } from 'uuid';

jest.mock('uuid', () => {
    return {
        v4: jest.fn()
    };
});

describe("Processor class tests", () => {
    it("Should create a UUID for the user and add it to the journey store", () => {
        // given
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

        const input = {
            greenId: "test-green-id",
            startPoint: startPoint,
            endPoint: endPoint,
            path: path
        }

        //@ts-ignore
        v4.mockReturnValueOnce("fake-journey-id")

        const sut = new Processor();

        // when
        const result = sut.process(input)

        // then
        expect(result.JourneyId).toBe("fake-journey-id");
        expect(result.greenId).toBe("test-green-id");
        expect(result.status).toBe("started");
        expect(result.startPoint).toBe(startPoint);
        expect(result.endPoint).toBe(endPoint);
        expect(result.startTime).toBeCloseTo(Date.now())
        expect(result.path).toBe(path)
    })
});