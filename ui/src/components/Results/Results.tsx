import React, { useState } from "react";
import { ResultsTable } from "./components/ResultsTable/ResultsTable";
import { ResultsClass } from "./components/ResultsClass/ResultsClass";
import { Search } from "../Search/Search";
import { Box } from "@mui/material";
import { useEventDataWithSearch } from "../../hooks/useEventDataWithSearch";

export const Results: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const isSearching = searchText !== "";

  const eventData = useEventDataWithSearch(searchText);

  return (
    <div>
      <Box sx={{ padding: "10px" }}>
        <Search searchText={searchText} setSearchText={setSearchText} />
      </Box>

      {eventData.classes.map((eventClass) => (
        <ResultsClass
          name={eventClass.name}
          numberOfParticipants={eventClass.participants.length}
          forceOpen={isSearching && eventClass.participants.length > 0}
        >
          <ResultsTable participants={eventClass.participants} />
        </ResultsClass>
      ))}
    </div>
  );
};
