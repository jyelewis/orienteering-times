import { config } from "./config";
import { EventData } from "./types/EventData";
import fs from "fs/promises";
import xml2js from "xml2js";
import { computeRecentSplits } from "./computeRecentSplits";

export function watchLiveEventData() {
  // repeatedly poll for event data
  processEventData()
    .then(() => {
      setTimeout(
        () => watchLiveEventData(),
        config.eventDataPollFrequencySeconds * 1000
      );
    })
    .catch((e) => {
      console.error("Error processing event data");
      console.error(e);

      // back off on the fetching
      setTimeout(
        () => watchLiveEventData(),
        config.eventDataPollFrequencySeconds * 10 * 1000
      );
    });
}

let latestEventData: null | EventData = null;

async function processEventData() {
  const xml = await fs.readFile(config.eventDataXMLPath);

  const result = await xml2js.parseStringPromise(xml /*, options */);

  // decode xml into simpler json structure with just the information we need
  const newEventData = {
    name: result.ResultList.Event?.[0]?.Name?.[0] || "Untitled event",
    date: result.ResultList.Event?.[0]?.StartTime?.[0].Date?.[0] || undefined,
    classes:
      result.ResultList.ClassResult?.map((classResult: any) => ({
        name: classResult.Class?.[0]?.Name?.[0],
        course: {
          name: classResult.Course?.[0]?.Name?.[0],
          numberOfControls: parseInt(
            classResult.Course?.[0]?.NumberOfControls?.[0] || 0,
            10
          ),
        },
        participants: classResult.PersonResult?.map((personResult: any) => ({
          name: `${personResult.Person?.[0]?.Name?.[0]?.Given?.[0]} ${personResult.Person?.[0]?.Name?.[0]?.Family?.[0]}`,
          bibNumber: personResult.Result?.[0]?.BibNumber?.[0],
          startTime: personResult.Result?.[0]?.StartTime?.[0],
          finishTime: personResult.Result?.[0]?.FinishTime?.[0],
          time: parseInt(personResult.Result?.[0]?.Time?.[0], 10),
          timeBehind: parseInt(personResult.Result?.[0]?.TimeBehind?.[0], 10),
          position: parseInt(personResult.Result?.[0]?.Position?.[0], 10),
          splits:
            personResult.Result?.[0].SplitTime?.map((splitTime: any) => ({
              controlCode: splitTime.ControlCode?.[0],
              time: parseFloat(splitTime.Time?.[0]) || undefined,
              isAdditional: splitTime.$?.status === "Additional",
            })) || [],
        })),
      })) || [],
    recentSplits: [],
  } as EventData;

  // sort participants by position
  newEventData.classes.forEach((thisClass) =>
    thisClass.participants.sort((a, b) => a.position - b.position)
  );

  // sort splits by time
  newEventData.classes.forEach((thisClass) =>
    thisClass.participants.forEach((participant) =>
      participant.splits.sort(
        (a, b) => (a.time || Infinity) - (b.time || Infinity)
      )
    )
  );

  newEventData.recentSplits = computeRecentSplits(
    latestEventData,
    newEventData
  );

  latestEventData = newEventData;
}

export function getLatestEventData() {
  return latestEventData;
}
