import React from "react";
import { EventData } from "../../../../../../server/src/types/EventData";
import FlipMove from "react-flip-move";
import { Box } from "@mui/material";
import { formatTime } from "../../../../utils/formatTime";

export type Props = {
  participants: EventData["classes"][0]["participants"];
};

export const ResultsTable: React.FC<Props> = ({ participants }) => {
  const maxSplitPoints = Math.max(
    ...participants.map((x) => x.splits.length),
    0
  );
  const splitPoints = new Array(maxSplitPoints).fill(null).map((_, i) => i + 1);

  return (
    <div className="component-ResultsTable">
      {/*Table header*/}
      <Box display="flex" sx={{ marginBottom: "10px" }}>
        {/*Space for name*/}
        <Box sx={{ width: "200px" }}></Box>
        {/*Space for time behind*/}
        <Box sx={{ width: "200px" }}>Behind first</Box>
        {splitPoints.map((pointIndex) => (
          <Box sx={{ width: "200px" }}>{pointIndex}</Box>
        ))}
      </Box>

      {/*// @ts-ignore*/}
      <FlipMove>
        {participants.map((participant) => (
          <div key={participant.name}>
            <Box display="flex">
              <Box sx={{ width: "200px" }}>{participant.name} </Box>
              <Box sx={{ width: "200px" }}>
                {participant.timeBehind > 0
                  ? ` +${formatTime(participant.timeBehind)}`
                  : ""}
              </Box>
              {participant.splits.map((split) => (
                <Box sx={{ width: "200px" }}>
                  {formatTime(split.time)}
                  {split.timeSinceLastCode > 0
                    ? ` (${formatTime(split.timeSinceLastCode)})`
                    : ""}
                </Box>
              ))}
            </Box>
          </div>
        ))}
      </FlipMove>
    </div>
  );
};
