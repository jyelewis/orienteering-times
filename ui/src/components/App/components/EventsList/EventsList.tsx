import React from "react";
import { useEventsData } from "../../../../hooks/useEventsData";
import { Link } from "react-router-dom";
import { Header } from "../../../Header/Header";
import { Box } from "@mui/material";
import { COLOR_YELLOW } from "../../../../colors";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export const EventsList: React.FC = () => {
  const { eventsData } = useEventsData();

  return (
    <div>
      <Header>
        <>
          <div></div>
          <div>Events</div>
          <div></div>
        </>
      </Header>
      {Object.values(eventsData).map((eventData) => (
        <>
          <Link
            to={`/events/${eventData.slugName}`}
            style={{ textDecoration: "none" }}
          >
            <Box
              sx={{
                backgroundColor: COLOR_YELLOW,
                borderRadius: "3px",
                padding: "15px",
                margin: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              {eventData.name}
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
