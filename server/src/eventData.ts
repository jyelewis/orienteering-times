import { config } from "./config";
import { EventData, EventsData } from "./types/EventData";
import fs from "fs/promises";
import xml2js from "xml2js";
import glob from "glob-promise";

export function watchLiveEventData() {
  // repeatedly poll for event data
  processEventsData()
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

let latestEventsData: null | EventsData = null;

async function processEventsData() {
  const xmlFiles = await glob(config.eventDataXMLFolderPath);

  const newEventData: EventsData = {};
  (
    await Promise.all(
      xmlFiles.map(async (file) => {
        try {
          return await processEventData(file);
        } catch (e) {
          console.error(`Failed to parse ${file}`, e);
        }
      })
    )
  ).forEach((x) => {
    if (x !== undefined) {
      newEventData[x.slugName] = x;
    }
  });

  latestEventsData = newEventData;
}

async function processEventData(xmlPath: string) {
  const xml = await fs.readFile(xmlPath);

  const result = await xml2js.parseStringPromise(xml /*, options */);

  function removeDuplicateSplits(
    splits: EventData["classes"][0]["participants"][0]["splits"]
  ): EventData["classes"][0]["participants"][0]["splits"] {
    for (let i = 1; i < splits.length; i++) {
      const prevSplit = splits[i - 1];
      if (splits[i].time === prevSplit.time) {
        // duplicate split found, drop the second one
        splits.splice(i, 1);
      }
    }

    return splits;
  }

  // please don't tell anyone how I live

  // decode xml into simpler json structure with just the information we need
  const eventName = result.ResultList.Event?.[0]?.Name?.[0] || "Untitled event";
  let newEventData = {
    name: eventName,
    slugName: eventName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    date: result.ResultList.Event?.[0]?.StartTime?.[0].Date?.[0] || undefined,
    classes:
      result.ResultList.ClassResult?.map((classResult: any) => ({
        name: classResult.Class?.[0]?.Name?.[0],
        slugName: classResult.Class?.[0]?.Name?.[0]
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, ""),
        course: {
          name: classResult.Course?.[0]?.Name?.[0],
          numberOfControls: parseInt(
            classResult.Course?.[0]?.NumberOfControls?.[0] || 0,
            10
          ),
        },
        splits: [],
        participants: classResult.PersonResult?.map((personResult: any) => ({
          name: `${personResult.Person?.[0]?.Name?.[0]?.Given?.[0]} ${personResult.Person?.[0]?.Name?.[0]?.Family?.[0]}`,
          bibNumber: personResult.Result?.[0]?.BibNumber?.[0],
          startTime: personResult.Result?.[0]?.StartTime?.[0],
          finishTime: personResult.Result?.[0]?.FinishTime?.[0],
          status: personResult.Result?.[0]?.Status?.[0] || "OK",
          time: parseInt(personResult.Result?.[0]?.Time?.[0], 10),
          timeBehind: parseInt(personResult.Result?.[0]?.TimeBehind?.[0], 10),
          position: parseInt(personResult.Result?.[0]?.Position?.[0], 10),
          splits: removeDuplicateSplits(
            (
              personResult.Result?.[0].SplitTime?.map((splitTime: any) => ({
                controlCode: splitTime.ControlCode?.[0],
                time: parseFloat(splitTime.Time?.[0]) || 0,
                isAdditional: splitTime.$?.status === "Additional",
                timeSinceLastCode: 0,
              })) || []
            ).filter(
              (split: any) =>
                // filter out times before the start or CLR controls
                split.controlCode !== "CLR" && split.time > 0
            ) as any
          ),
        })),
      })) || [],
  } as EventData;

  // filter out events with no participants
  newEventData.classes = newEventData.classes.filter(
    (x) => Array.isArray(x.participants) && x.participants.length > 0
  );

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

  // compute timeSinceLastCode for each split
  newEventData.classes.forEach((thisClass) =>
    thisClass.participants.forEach((participant) =>
      participant.splits.forEach((split, i) =>
        i >= 1
          ? (split.timeSinceLastCode =
              split.time - participant.splits[i - 1].time)
          : 0
      )
    )
  );

  return newEventData;
}

export function getLatestEventsData() {
  return latestEventsData;
}
