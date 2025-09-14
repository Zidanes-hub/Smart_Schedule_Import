
export interface ScheduleEntry {
  courseName: string;
  day: string;
  startTime: string;
  endTime:string;
  location: string;
  lecturer: string;
}

export interface ParsedSchedule {
    schedule: ScheduleEntry[];
}
