import React from "react";
import { useEventData } from "../../hooks/useEventData";
import { Results } from "../Results/Results";

function App() {
  const { isLoading, eventData } = useEventData();

  if (isLoading) {
    return <div>Loading event data...</div>;
  }

  return (
    <div className="App">
      <Results />
      <pre>{JSON.stringify(eventData, null, 2)}</pre>
    </div>
  );
}

export default App;
