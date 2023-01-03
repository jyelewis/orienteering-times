import React from "react";
import { EventData } from "../../../../../../server/src/types/EventData";
import FlipMove from "react-flip-move";
import { Box } from "@mui/material";
import { formatTime } from "../../../../utils/formatTime";
import { makeStyles } from "@mui/styles";
import { COLOR_GREY, COLOR_YELLOW } from "../../../../colors";

const TABLE_ROW_HEIGHT = "35px";
const POSITION_WIDTH_PX = 20;

export type Props = {
  participants: EventData["classes"][0]["participants"];
};

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50px", // header height
    // bottom: "50px", // footer height
  },
  tableHeader: {
    position: "sticky",
    top: "50px",
    left: 0,
    zIndex: 99,
    backgroundColor: COLOR_YELLOW,
  },
  tableHeaderCell: {
    height: TABLE_ROW_HEIGHT,
    padding: "5px",
    width: "120px",
    minWidth: "120px",
    backgroundColor: COLOR_YELLOW,
  },
  tableRow: {
    "& *": {
      backgroundColor: "white",
    },
    "&:nth-child(2n)": {
      "& *": {
        backgroundColor: COLOR_GREY,
      },
    },
    "&:last-child": {
      marginBottom: "50px", // footer height
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
          sx={{
            width: `${POSITION_WIDTH_PX}px`,
            minWidth: `${POSITION_WIDTH_PX}px`,
            textAlign: "center",
            padding: "5px",
            height: TABLE_ROW_HEIGHT,
            backgroundColor: COLOR_YELLOW,
          }}
        ></Box>
        {/*Space for name*/}
        <Box
          sx={{ width: "150px", minWidth: "150px" }}
          className={classes.tableHeaderCell}
        ></Box>
        {/*Space for time behind*/}
        <Box className={classes.tableHeaderCell}>Time</Box>
        {splitPoints.map((pointIndex) => (
          <Box className={classes.tableHeaderCell}>{pointIndex}</Box>
        ))}
      </Box>

      {/*// @ts-ignore*/}
      <FlipMove>
        {participants.map((participant) => (
          <div key={participant.name} className={classes.tableRow}>
            <Box display="flex">
              <Box
                sx={{
                  width: "20px",
                  minWidth: "20px",
                  textAlign: "center",
                  padding: "5px",

                  // overflow: "hidden",
                  // whiteSpace: "nowrap",

                  position: "sticky",
                  left: 0,
                }}
              >
                {participant.position}
              </Box>
              <Box
                sx={{
                  width: "150px",
                  minWidth: "150px",
                  position: "sticky",
                  left: POSITION_WIDTH_PX + 10,
                }}
                className={classes.tableCell}
              >
                {participant.name}
              </Box>
              <Box className={classes.tableCell}>
                {participant.status === "OK" ? (
                  <>
                    {participant.startTime &&
                      formatTime(
                        ((participant.finishTime
                          ? new Date(participant.finishTime).getTime()
                          : Date.now()) -
                          new Date(participant.startTime).getTime()) /
                          1000
                      )}
                    <br />
                    {participant.timeBehind > 0
                      ? ` +${formatTime(participant.timeBehind)}`
                      : ""}
                  </>
                ) : (
                  <>{participant.status}</>
                )}
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
