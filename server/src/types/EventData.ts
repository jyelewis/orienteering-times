export type EventsData = Record<string, EventData>;

export type Split = {
  missed: boolean;
  controlCode: string;
  time: number;
  isAdditional: boolean;
  timeSinceLastCode: number;
};

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
    splits: Split[];
    participants: Array<{
      name: string;
      organization?: string;
      bibNumber?: string;
      startTime?: string;
      finishTime?: string;
      status: string;
      time?: number;
      timeBehind: number;
      position: number;
      rawSplits: Split[];
      splits: Split[];
    }>;
  }>;
};
