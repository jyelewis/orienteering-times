import React from "react";
import { ResultsTable } from "./components/ResultsTable/ResultsTable";
import { useEventData } from "../../hooks/useEventData";
import { ResultsClass } from "./components/ResultsClass/ResultsClass";

export const Results: React.FC = () => {
  const { eventData } = useEventData();

  return (
    <div>
      {eventData.classes.map((eventClass) => (
        <ResultsClass
          name={eventClass.name}
          numberOfParticipants={eventClass.participants.length}
        >
          <ResultsTable participants={eventClass.participants} />
        </ResultsClass>
      ))}
    </div>
  );
};
