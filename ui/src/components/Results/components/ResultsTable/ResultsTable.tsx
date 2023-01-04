import React from "react";
import { EventData } from "../../../../../../server/src/types/EventData";
import FlipMove from "react-flip-move";
import { Box, Typography } from "@mui/material";
import { formatTime } from "../../../../utils/formatTime";
import { makeStyles } from "@mui/styles";
import { COLOR_GREY, COLOR_YELLOW } from "../../../../colors";

const TABLE_ROW_HEIGHT = "35px";
const POSITION_WIDTH_PX = 20;
const SPLIT_WIDTH_PX = 55;
const NAME_WIDTH_PX = 150;

export type Props = {
  participants: EventData["classes"][0]["participants"];
  classSplits: EventData["classes"][0]["splits"];
};

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: "50px", // header height
    minWidth: "100%",
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
    width: `${SPLIT_WIDTH_PX}px`,
    minWidth: `${SPLIT_WIDTH_PX}px`,
    backgroundColor: COLOR_YELLOW,
    textAlign: "center",
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
    width: `${SPLIT_WIDTH_PX}px`,
    minWidth: `${SPLIT_WIDTH_PX}px`,
    textAlign: "right",
  },
});

export const ResultsTable: React.FC<Props> = ({
  participants,
  classSplits,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/*Table header*/}
      <Box display="flex" className={classes.tableHeader}>
        {/*Space for place*/}
        <Box
          sx={{
            width: `${POSITION_WIDTH_PX}px`,
            minWidth: `${POSITION_WIDTH_PX}px`,
            textAlign: "center",
            padding: "5px",
            height: TABLE_ROW_HEIGHT,
            backgroundColor: COLOR_YELLOW,

            position: "sticky",
            left: 0,
          }}
        ></Box>
        {/*Space for name*/}
        <Box
          sx={{
            width: `${NAME_WIDTH_PX}px !important`,
            minWidth: `${NAME_WIDTH_PX}px`,
            position: "sticky",
            left: POSITION_WIDTH_PX + 10,
            paddingTop: "3px !important", // make a little more room for the name here
          }}
          className={classes.tableHeaderCell}
        >
          <Typography
            fontSize={14}
            fontWeight="bold"
            textAlign="left"
            sx={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis ellipsis",
            }}
          >
            Name
          </Typography>
          <Typography fontSize={12} textAlign="left">
            Club
          </Typography>
        </Box>

        {/*Space for time behind*/}
        <Box className={classes.tableHeaderCell}>
          <Typography fontWeight="bold">Total</Typography>
        </Box>
        {classSplits.map(({ controlCode }, index) => (
          <Box className={classes.tableHeaderCell} key={index}>
            <Typography fontWeight="bold">{controlCode}</Typography>
          </Box>
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
                  paddingTop: "11px",

                  position: "sticky",
                  left: 0,
                }}
              >
                {participant.position}
              </Box>
              <Box
                sx={{
                  width: `${NAME_WIDTH_PX}px !important`,
                  minWidth: `${NAME_WIDTH_PX}px`,
                  position: "sticky",
                  left: POSITION_WIDTH_PX + 10,
                  paddingTop: "3px !important", // make a little more room for the name here
                }}
                className={classes.tableCell}
              >
                <Typography
                  fontSize={14}
                  fontWeight="bold"
                  textAlign="left"
                  sx={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis ellipsis",
                  }}
                >
                  {participant.name}
                </Typography>
                <Typography fontSize={12} textAlign="left">
                  {participant.organization || ""}
                </Typography>
              </Box>
              <Box className={classes.tableCell}>
                {participant.status === "OK" ? (
                  <>
                    <Typography fontSize={14} fontWeight="bold">
                      {participant.startTime &&
                        formatTime(
                          ((participant.finishTime
                            ? new Date(participant.finishTime).getTime()
                            : Date.now()) -
                            new Date(participant.startTime).getTime()) /
                            1000
                        )}
                    </Typography>
                    <Typography fontSize={12} fontWeight="bold">
                      {participant.timeBehind > 0
                        ? ` +${formatTime(participant.timeBehind)}`
                        : ""}
                    </Typography>
                  </>
                ) : (
                  <>{participant.status}</>
                )}
              </Box>
              {participant.splits.map((split, index) => (
                <Box className={classes.tableCell} key={index}>
                  {split.missed ? (
                    <>-</>
                  ) : (
                    <>
                      <Typography fontSize={14}>
                        {formatTime(split.time)}
                      </Typography>
                      <Typography fontSize={12}>
                        {split.timeSinceLastCode > 0
                          ? ` (${formatTime(split.timeSinceLastCode)})`
                          : ""}
                      </Typography>
                    </>
                  )}
                </Box>
              ))}
            </Box>
          </div>
        ))}
      </FlipMove>
    </div>
  );
};
