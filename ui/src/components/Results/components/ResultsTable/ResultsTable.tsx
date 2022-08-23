import React from "react";
import { EventData } from "../../../../../../server/src/types/EventData";
import FlipMove from "react-flip-move";
// import { useEventData } from "../../../../hooks/useEventData";

export type Props = {
  participants: EventData["classes"][0]["participants"];
};

export const ResultsTable: React.FC<Props> = ({ participants }) => {
  // const { eventData } = useEventData();

  return (
    <div className="component-ResultsTable">
      {/*// @ts-ignore*/}
      <FlipMove>
        {participants.map((participant) => (
          <div key={participant.name}>{participant.name}</div>
        ))}
      </FlipMove>
    </div>
  );
};
