export type EventsData = Record<string, EventData>;

export type EventData = {
  slugName: string;
  name: string;
  date?: string;
  classes: Array<{
    name: string;
    slugName: string;
    course: {
      name: string;
      numberOfControls: number;
    };
    splits: Array<{
      controlCode: string;
    }>;
    participants: Array<{
      name: string;
      bibNumber?: string;
      startTime?: string;
      finishTime?: string;
      time?: number;
      timeBehind: number;
      position: number;
      splits: Array<{
        controlCode: string;
        time: number;
        isAdditional: boolean;
        timeSinceLastCode: number;
      }>;
    }>;
  }>;
};
