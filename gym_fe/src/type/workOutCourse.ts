import { Schedule } from './schedule';

export interface WorkoutCourse {
  courseid: string;
  coursename: string;
  imageurl: string;
  personaltrainername: string;
  durationweek: number;
  description: string;
  schedules: Schedule[] | any;
  trainername?: string;
}


export interface PersonalTrainer {
  id: string,
  name: string,
  specialization: string,
  experience: number
}