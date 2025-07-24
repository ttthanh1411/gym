using gym_be.Models.DTOs;
using gym_be.Models.Entities;
using gym_be.Repositories.Interfaces;

namespace gym_be.Services
{
    public class WorkoutCourseService : IWorkoutCourseService
    {
        private readonly IWorkoutCourseRepository _workoutCourseRepository;

        public WorkoutCourseService(IWorkoutCourseRepository workoutCourseRepository)
        {
            _workoutCourseRepository = workoutCourseRepository;
        }

        public async Task<List<WorkoutCourseDto>> GetAllWorkoutCoursesAsync()
        {
            var courses = await _workoutCourseRepository.GetAllWorkoutCoursesAsync();
            return courses.Select(course => new WorkoutCourseDto
            {
                CourseId = course.CourseId,
                CourseName = course.CourseName,
                ImageUrl = course.ImageUrl,
                PersonalTrainerId = course.PersonalTrainerId,
                DurationWeek = course.DurationWeek,
                Description = course.Description,
                PersonalTrainerName = course.PersonalTrainer?.Name,
                Schedules = course.Schedules
            }).ToList();
        }

        public async Task<WorkoutCourseDto> GetWorkoutCourseByIdAsync(Guid courseId)
        {
            var course = await _workoutCourseRepository.GetWorkoutCourseByIdAsync(courseId);
            if (course == null)
                return null;

            return new WorkoutCourseDto
            {
                CourseId = course.CourseId,
                CourseName = course.CourseName,
                ImageUrl = course.ImageUrl,
                PersonalTrainerId = course.PersonalTrainerId,
                DurationWeek = course.DurationWeek,
                Description = course.Description,
                PersonalTrainerName = course.PersonalTrainer?.Name,
                Schedules = course.Schedules
            };
        }

        public async Task CreateWorkoutCourseAsync(WorkoutCourseDto workoutCourseDto)
        {
            var workoutCourse = new WorkoutCourse
            {
                CourseId = workoutCourseDto.CourseId,
                CourseName = workoutCourseDto.CourseName,
                ImageUrl = workoutCourseDto.ImageUrl,
                PersonalTrainerId = workoutCourseDto.PersonalTrainerId,
                DurationWeek = workoutCourseDto.DurationWeek,
                Description = workoutCourseDto.Description,
                Schedules = workoutCourseDto.Schedules ?? new List<Guid>()
            };
            await _workoutCourseRepository.CreateWorkoutCourseAsync(workoutCourse);
        }

        public async Task UpdateWorkoutCourseAsync(WorkoutCourseDto workoutCourseDto)
        {
            var workoutCourse = new WorkoutCourse
            {
                CourseId = workoutCourseDto.CourseId,
                CourseName = workoutCourseDto.CourseName,
                ImageUrl = workoutCourseDto.ImageUrl,
                PersonalTrainerId = workoutCourseDto.PersonalTrainerId,
                DurationWeek = workoutCourseDto.DurationWeek,
                Description = workoutCourseDto.Description,
                Schedules = workoutCourseDto.Schedules ?? new List<Guid>()
            };
            await _workoutCourseRepository.UpdateWorkoutCourseAsync(workoutCourse);
        }

        public async Task DeleteWorkoutCourseAsync(Guid courseId)
        {
            await _workoutCourseRepository.DeleteWorkoutCourseAsync(courseId);
        }
    }
}
