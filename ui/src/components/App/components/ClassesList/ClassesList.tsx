import React from "react";
import { Header } from "../../../Header/Header";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { COLOR_GREY, COLOR_HEADER_BACK_ARROW } from "../../../../colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEventsData } from "../../../../hooks/useEventsData";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const ClassesList: React.FC = () => {
  const { eventSlugName } = useParams();
  const { eventsData } = useEventsData();

  const eventData = eventsData[eventSlugName || ""];
  if (eventData === undefined) {
    return <p>Event not found</p>;
  }

  return (
    <div>
      <Header>
        <>
          <div>
            <Link to="/">
              <ArrowBackIosIcon style={{ color: COLOR_HEADER_BACK_ARROW }} />
            </Link>
          </div>
          <div>{eventData.name}</div>
          <div></div>
        </>
      </Header>
      {eventData.classes.map((eventClass) => (
        <>
          <Link
            to={`/events/${eventData.slugName}/${eventClass.slugName}`}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                backgroundColor: COLOR_GREY,
                borderRadius: "3px",
                padding: "15px",
                margin: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              {eventClass.name}
              <Box sx={{ float: "right" }}>
                <ArrowForwardIosIcon sx={{ fontSize: 12 }} />
              </Box>
            </Box>
          </Link>
        </>
      ))}
    </div>
  );
};
