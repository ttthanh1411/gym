import React from 'react';

import {
  Clock,
  Info,
  User,
} from 'lucide-react';

import { WorkoutCourse } from '../../type/workOutCourse';

interface CourseCardProps {
  course: WorkoutCourse;
  onViewDetails: (course: WorkoutCourse) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onViewDetails }) => {

  console.log(course)
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <img
          src={course.imageUrl}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700">
          {course.durationWeek + ' weeks'}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
          {course.coursename}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        <div className="flex flex-col gap-1 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{course.personalTrainerName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.durationWeek} weeks</span>
          </div>
        </div>
        <button
          onClick={() => onViewDetails(course)}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Info className="w-4 h-4" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default CourseCard;