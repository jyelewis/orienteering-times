import { EventData } from "./types/EventData";
import { config } from "./config";

// takes an old state & new state, finds recently completed splits
export function computeRecentSplits(
  prevEventData: EventData | null,
  newEventData: EventData
): EventData["recentSplits"] {
  if (prevEventData === null) {
    return [];
  }

  let recentSplits: EventData["recentSplits"] = [];
  const now = Date.now();

  // create a list of all participants so we can look up what
  // their previous splits were
  const previousParticipants = new Map<
    String,
    EventData["classes"][0]["participants"][0]
  >();
  prevEventData.classes.forEach((thisClass) =>
    thisClass.participants.forEach((participant) =>
      previousParticipants.set(participant.name, participant)
    )
  );

  // find any newly added splits
  newEventData.classes.map((thisClass) =>
    thisClass.participants.map((participant) => {
      const previousParticipant =
        previousParticipants.get(participant.name) ?? null;

      if (
        previousParticipant !== null &&
        participant.splits.length > 1 &&
        participant.splits.length > previousParticipant.splits.length
      ) {
        const previousSplit =
          participant.splits[participant.splits.length - 2]!;
        const newSplit = participant.splits[participant.splits.length - 1]!;

        // only add if we have all times available
        if (previousSplit.time === undefined || newSplit.time === undefined) {
          return;
        }

        // new split found!
        recentSplits.push({
          participantName: participant.name,
          controlCode: newSplit.controlCode,
          secondsFromPrevious: previousSplit
            ? newSplit.time - previousSplit.time
            : 0,
          secondsFromStart: newSplit.time,
          expiry: now + config.recentSplitsExpirySeconds * 1000,
        });
      }
    })
  );

  // add existing splits from prevEventData
  // filter out any expired splits
  recentSplits = recentSplits.concat(
    prevEventData.recentSplits.filter((x) => x.expiry > now)
  );

  return recentSplits;
}
