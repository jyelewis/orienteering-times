import { useQuery } from "@tanstack/react-query";
import { EventsData } from "../../../server/src/types/EventData";

export function useEventsData() {
  const { isLoading, error, data } = useQuery(
    ["events"],
    () => fetch("/api/events").then((res) => res.json()),
    {
      refetchInterval: 1000,
    }
  );

  const eventsData = data as EventsData;

  return {
    isLoading,
    error,
    eventsData,
  };
}
