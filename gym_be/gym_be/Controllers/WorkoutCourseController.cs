using gym_be.Models.DTOs;
using gym_be.Services;
using Microsoft.AspNetCore.Mvc;

namespace gym_be.Controllers
{
    [Route("api/workout-course")]
    [ApiController]
    public class WorkoutCourseController : ControllerBase
    {
        private readonly IWorkoutCourseService _workoutCourseService;

        public WorkoutCourseController(IWorkoutCourseService workoutCourseService)
        {
            _workoutCourseService = workoutCourseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllWorkoutCourses()
        {
            var courses = await _workoutCourseService.GetAllWorkoutCoursesAsync();
            // For each course, include schedules if possible
            // If schedules are not related, return empty array
            var result = courses.Select(c => new {
                // Copy all properties (use lowercase keys)
                courseid = c.CourseId,
                coursename = c.CourseName,
                imageurl = c.ImageUrl,
                personaltrainerid = c.PersonalTrainerId,
                durationweek = c.DurationWeek,
                description = c.Description,
                personaltrainername = c.PersonalTrainerName,
                // Add schedules: [] (empty array or real data if available)
                schedules = c.Schedules
            });
            return Ok(result);
        }

        [HttpGet("{courseId}")]
        public async Task<IActionResult> GetWorkoutCourseById(Guid courseId)
        {
            var course = await _workoutCourseService.GetWorkoutCourseByIdAsync(courseId);
            if (course == null)
                return NotFound();

            return Ok(course);
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkoutCourse([FromBody] WorkoutCourseDto workoutCourseDto)
        {
            await _workoutCourseService.CreateWorkoutCourseAsync(workoutCourseDto);
            return CreatedAtAction(nameof(GetWorkoutCourseById), new { courseId = workoutCourseDto.CourseId }, workoutCourseDto);
        }

        [HttpPut("{courseId}")]
        public async Task<IActionResult> UpdateWorkoutCourse(Guid courseId, [FromBody] WorkoutCourseDto workoutCourseDto)
        {
            if (courseId != workoutCourseDto.CourseId)
                return BadRequest();

            await _workoutCourseService.UpdateWorkoutCourseAsync(workoutCourseDto);
            return NoContent();
        }

        [HttpDelete("{courseId}")]
        public async Task<IActionResult> DeleteWorkoutCourse(Guid courseId)
        {
            await _workoutCourseService.DeleteWorkoutCourseAsync(courseId);
            return NoContent();
        }
    }
}
