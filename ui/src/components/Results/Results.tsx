import React from "react";
import { ResultsTable } from "./components/ResultsTable/ResultsTable";
import { EventData } from "../../../../server/src/types/EventData";

export type Props = {
  eventData: EventData;
  classData: EventData["classes"][0];
};

export const Results: React.FC<Props> = ({ eventData, classData }) => {
  return (
    <div>
      <ResultsTable
        participants={classData.participants}
        classSplits={classData.splits}
      />
    </div>
  );
};
