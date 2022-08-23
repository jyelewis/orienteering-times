import { EventData } from "../../../server/src/types/EventData";
import { useEventData } from "./useEventData";

export function useEventDataWithSearch(searchText: string): EventData {
  const { eventData } = useEventData();

  const loweredSearchText = searchText.toLowerCase();

  return {
    ...eventData,
    classes: eventData.classes.map((thisClass) => ({
      ...thisClass,
      participants: thisClass.participants.filter(
        (x) => x.name.toLowerCase().indexOf(loweredSearchText) !== -1
      ),
    })),
  };
}
