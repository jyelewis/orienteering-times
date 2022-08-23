import { useQuery } from "@tanstack/react-query";
import { EventData } from "../../../server/src/types/EventData";

export function useEventData() {
  const { isLoading, error, data } = useQuery(
    ["event-data"],
    () => fetch("/api/event-data").then((res) => res.json()),
    {
      refetchInterval: 1000,
    }
  );

  const eventData = data as EventData;

  return {
    isLoading,
    error,
    eventData,
  };
}
