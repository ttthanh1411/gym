export interface WorkoutCourse {
  courseid: string;
  coursename: string;
  imageurl: string;
  personaltrainer: string;
  durationweek: number;
  description: string;
  trainername?: string;
}


export interface PersonalTrainer {
  id: string,
  name: string,
  specialization: string,
  experience: number
}