export type EventData = {
  name: string;
  date?: string;
  classes: Array<{
    name: string;
    course: {
      name: string;
      numberOfControls: number;
    };
    participants: Array<{
      name: string;
      bibNumber?: string;
      startTime?: string;
      finishTime?: string;
      time?: number;
      timeBehind?: number;
      position: number;
      splits: Array<{
        controlCode: string;
        time?: number;
        isAdditional: boolean;
      }>;
    }>;
  }>;
  recentSplits: Array<{
    participantName: string;
    controlCode: string;
    secondsFromStart: number;
    secondsFromPrevious: number;
    expiry: number;
  }>;
};
