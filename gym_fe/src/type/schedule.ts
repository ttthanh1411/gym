export interface Schedule {
  scheduleID: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
}

export interface ScheduleFormData {
  dayofweek: string;
  maxparticipants: number;
  starttime: string;
  endtime: string;
}

export interface ScheduleApiResponse {
  items: Schedule[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
}