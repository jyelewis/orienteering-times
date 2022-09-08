import React from "react";
import { useEventsData } from "../../hooks/useEventsData";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EventsList } from "./components/EventsList/EventsList";
import { ClassDetail } from "./components/ClassDetail/ClassDetail";
import { Footer } from "../Footer/Footer";
import { ClassesList } from "./components/ClassesList/ClassesList";

function App() {
  const { isLoading } = useEventsData();

  if (isLoading) {
    return <div>Loading event data...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventsList />} />
        <Route path="/events/:eventSlugName" element={<ClassesList />} />
        <Route
          path="/events/:eventSlugName/:classSlugName"
          element={<ClassDetail />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
