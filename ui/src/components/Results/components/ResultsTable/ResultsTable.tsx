import React from "react";
import { EventData } from "../../../../../../server/src/types/EventData";
import FlipMove from "react-flip-move";
import { Box } from "@mui/material";
import { formatTime } from "../../../../utils/formatTime";
import { makeStyles } from "@mui/styles";
import { COLOR_GREY, COLOR_YELLOW } from "../../../../colors";

const TABLE_ROW_HEIGHT = "35px";

export type Props = {
  participants: EventData["classes"][0]["participants"];
};

const useStyles = makeStyles({
  root: {},
  tableHeader: {
    position: "sticky",
    top: "50px",
    left: 0,
    zIndex: 99,
  },
  tableHeaderCell: {
    height: TABLE_ROW_HEIGHT,
    padding: "5px",
    width: "120px",
    minWidth: "120px",
    backgroundColor: COLOR_YELLOW,
  },
  tableRow: {
    "&:nth-child(2n)": {
      "& *": {
        backgroundColor: COLOR_GREY,
      },
    },
  },
  tableCell: {
    height: TABLE_ROW_HEIGHT,
    padding: "5px",
    width: "120px",
    minWidth: "120px",
  },
});

export const ResultsTable: React.FC<Props> = ({ participants }) => {
  const classes = useStyles();

  const maxSplitPoints = Math.max(
    ...participants.map((x) => x.splits.length),
    0
  );
  const splitPoints = new Array(maxSplitPoints).fill(null).map((_, i) => i + 1);

  return (
    <div className={classes.root}>
      {/*Table header*/}
      <Box
        display="flex"
        sx={{ marginBottom: "10px" }}
        className={classes.tableHeader}
      >
        {/*Space for place*/}
        <Box
          sx={{ width: "20px", minWidth: "20px" }}
          className={classes.tableHeaderCell}
        ></Box>
        {/*Space for name*/}
        <Box
          sx={{ width: "150px", minWidth: "150px" }}
          className={classes.tableHeaderCell}
        ></Box>
        {/*Space for time behind*/}
        <Box className={classes.tableHeaderCell}>Behind first</Box>
        {splitPoints.map((pointIndex) => (
          <Box className={classes.tableHeaderCell}>{pointIndex}</Box>
        ))}
      </Box>

      {/*// @ts-ignore*/}
      <FlipMove>
        {participants.map((participant) => (
          <div key={participant.name} className={classes.tableRow}>
            <Box display="flex">
              {/*Space for place*/}
              <Box
                sx={{ width: "20px", minWidth: "20px", textAlign: "center" }}
                className={classes.tableCell}
              >
                {participant.position}
              </Box>
              <Box
                sx={{ width: "150px", minWidth: "150px" }}
                className={classes.tableCell}
              >
                {participant.name}
              </Box>
              <Box className={classes.tableCell}>
                {participant.timeBehind > 0
                  ? ` +${formatTime(participant.timeBehind)}`
                  : ""}
              </Box>
              {participant.splits.map((split) => (
                <Box className={classes.tableCell}>
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

export const ResultsTableOld: React.FC<Props> = ({ participants }) => {
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
