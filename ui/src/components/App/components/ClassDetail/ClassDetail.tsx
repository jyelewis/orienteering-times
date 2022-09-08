import React from "react";
import { useEventsData } from "../../../../hooks/useEventsData";
import { Link, useParams } from "react-router-dom";
import { Results } from "../../../Results/Results";
import { Header } from "../../../Header/Header";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { COLOR_HEADER_BACK_ARROW } from "../../../../colors";

export const ClassDetail: React.FC = () => {
  const { eventSlugName, classSlugName } = useParams();
  const { eventsData } = useEventsData();

  const eventData = eventsData[eventSlugName || ""];
  if (eventData === undefined) {
    return <p>Event not found</p>;
  }

  const classData = eventData.classes.find((x) => x.slugName === classSlugName);
  if (classData === undefined) {
    return <p>Class not found</p>;
  }

  return (
    <div>
      <Header>
        <>
          <div>
            <Link to={`/events/${eventData.slugName}`}>
              <ArrowBackIosIcon style={{ color: COLOR_HEADER_BACK_ARROW }} />
            </Link>
          </div>
          <div>
            {eventData.name} - {classData.name}
          </div>
          <div></div>
        </>
      </Header>
      <Results eventData={eventData} classData={classData} />
    </div>
  );
};
