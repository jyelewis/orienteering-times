import { EventData } from "./types/EventData";
import { computeRecentSplits } from "./computeRecentSplits";

const exampleEventData1: EventData = {
  name: "event",
  classes: [
    {
      name: "class 1",
      course: {
        name: "course 1",
        numberOfControls: 3,
      },
      participants: [
        {
          name: "John Smith",
          position: 1,
          timeBehind: 0,
          splits: [
            {
              time: 10,
              controlCode: "Start",
              isAdditional: false,
              timeSinceLastCode: 0,
            },
          ],
        },
        {
          name: "Jane Doe",
          position: 2,
          timeBehind: 0,
          splits: [
            {
              time: 8,
              controlCode: "Start",
              isAdditional: false,
              timeSinceLastCode: 0,
            },
          ],
        },
      ],
    },
  ],
  recentSplits: [],
};

const exampleEventData2: EventData = {
  name: "event",
  classes: [
    {
      name: "class 1",
      course: {
        name: "course 1",
        numberOfControls: 3,
      },
      participants: [
        {
          name: "John Smith",
          position: 1,
          timeBehind: 0,
          splits: [
            {
              time: 10,
              controlCode: "Start",
              isAdditional: false,
              timeSinceLastCode: 0,
            },
            {
              time: 15,
              controlCode: "First",
              isAdditional: false,
              timeSinceLastCode: 0,
            },
          ],
        },
        {
          name: "Jane Doe",
          position: 2,
          timeBehind: 0,
          splits: [
            {
              time: 8,
              controlCode: "Start",
              isAdditional: false,
              timeSinceLastCode: 0,
            },
            {
              time: 18,
              controlCode: "First",
              isAdditional: false,
              timeSinceLastCode: 0,
            },
          ],
        },
      ],
    },
  ],
  recentSplits: [],
};

describe("computeRecentSplits", () => {
  it("Returns empty array if there is no prev data", () => {
    const recentSplits = computeRecentSplits(null, exampleEventData2);
    expect(recentSplits).toEqual([]);
  });

  it("Provides no new splits if the same data is returned twice", () => {
    const recentSplits = computeRecentSplits(
      exampleEventData1,
      exampleEventData1
    );
    expect(recentSplits).toEqual([]);
  });

  it("Finds new splits", () => {
    const recentSplits = computeRecentSplits(
      exampleEventData1,
      exampleEventData2
    );
    expect(recentSplits).toEqual([
      {
        participantName: "John Smith",
        controlCode: "First",
        secondsFromPrevious: 5,
        secondsFromStart: 15,
        expiry: expect.any(Number),
      },
      {
        participantName: "Jane Doe",
        controlCode: "First",
        secondsFromPrevious: 10,
        secondsFromStart: 18,
        expiry: expect.any(Number),
      },
    ]);
  });

  it("Includes old splits", () => {
    const recentSplits = computeRecentSplits(
      {
        ...exampleEventData1,
        recentSplits: [
          {
            participantName: "Other guy",
            controlCode: "First",
            secondsFromPrevious: 10,
            secondsFromStart: 23,
            expiry: Date.now() + 5000,
          },
        ],
      },
      exampleEventData2
    );
    expect(recentSplits).toEqual([
      {
        participantName: "John Smith",
        controlCode: "First",
        secondsFromPrevious: 5,
        secondsFromStart: 15,
        expiry: expect.any(Number),
      },
      {
        participantName: "Jane Doe",
        controlCode: "First",
        secondsFromPrevious: 10,
        secondsFromStart: 18,
        expiry: expect.any(Number),
      },
      {
        participantName: "Other guy",
        controlCode: "First",
        secondsFromPrevious: 10,
        secondsFromStart: 23,
        expiry: Date.now() + 5000,
      },
    ]);
  });

  it("Filters expires splits", () => {
    const recentSplits = computeRecentSplits(
      {
        ...exampleEventData1,
        recentSplits: [
          {
            participantName: "Other guy",
            controlCode: "First",
            secondsFromPrevious: 10,
            secondsFromStart: 23,
            expiry: Date.now() - 5000,
          },
        ],
      },
      exampleEventData2
    );
    expect(recentSplits).toEqual([
      {
        participantName: "John Smith",
        controlCode: "First",
        secondsFromPrevious: 5,
        secondsFromStart: 15,
        expiry: expect.any(Number),
      },
      {
        participantName: "Jane Doe",
        controlCode: "First",
        secondsFromPrevious: 10,
        secondsFromStart: 18,
        expiry: expect.any(Number),
      },
    ]);
  });
});
