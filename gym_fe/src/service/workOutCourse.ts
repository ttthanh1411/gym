import { WorkoutCourse, PersonalTrainer } from '../type/workOutCourse';

export const mockTrainers: PersonalTrainer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialization: 'Strength Training',
    experience: 5
  },
  {
    id: '2', 
    name: 'Mike Chen',
    specialization: 'Cardio & HIIT',
    experience: 7
  },
  {
    id: '3',
    name: 'Emma Williams',
    specialization: 'Yoga & Flexibility',
    experience: 4
  },
  {
    id: '4',
    name: 'David Rodriguez',
    specialization: 'CrossFit',
    experience: 6
  }
];

export const mockWorkoutCourses: WorkoutCourse[] = [
  {
    courseid: '1',
    coursename: 'Beginner Strength Training',
    imageurl: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=500',
    personaltrainer: '1',
    durationweek: 8,
    description: 'Perfect for beginners looking to build muscle and improve strength with basic exercises and proper form.',
    trainername: 'Sarah Johnson'
  },
  {
    courseid: '2',
    coursename: 'High-Intensity Cardio Blast',
    imageurl: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=500',
    personaltrainer: '2',
    durationweek: 6,
    description: 'Burn calories fast with this intense cardio program designed to boost your metabolism and endurance.',
    trainername: 'Mike Chen'
  },
  {
    courseid: '3',
    coursename: 'Mindful Yoga Flow',
    imageurl: 'https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg?auto=compress&cs=tinysrgb&w=500',
    personaltrainer: '3',
    durationweek: 12,
    description: 'Find inner peace and improve flexibility through guided yoga sessions suitable for all levels.',
    trainername: 'Emma Williams'
  },
  {
    courseid: '4',
    coursename: 'CrossFit Fundamentals',
    imageurl: 'https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=500',
    personaltrainer: '4',
    durationweek: 10,
    description: 'Master the basics of CrossFit with functional movements that will transform your fitness journey.',
    trainername: 'David Rodriguez'
  },
  {
    courseid: '5',
    coursename: 'Advanced Powerlifting',
    imageurl: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=500',
    personaltrainer: '1',
    durationweek: 16,
    description: 'Take your strength to the next level with advanced powerlifting techniques and progressive overload.',
    trainername: 'Sarah Johnson'
  },
  {
    courseid: '6',
    coursename: 'HIIT for Fat Loss',
    imageurl: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=500',
    personaltrainer: '2',
    durationweek: 8,
    description: 'Maximize fat burning with scientifically-designed HIIT workouts that fit into your busy schedule.',
    trainername: 'Mike Chen'
  }
];