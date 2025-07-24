export interface WorkoutCourse {
  courseid: string;
  coursename: string;
  imageUrl: string;
  personaltrainername: string;
  durationWeek: number;
  description: string;
  trainername?: string;
}


export interface PersonalTrainer {
  id: string,
  name: string,
  specialization: string,
  experience: number
}