using gym_be.Models.DTOs;
using gym_be.Services;
using Microsoft.AspNetCore.Mvc;

namespace gym_be.Controllers
{
    [Route("api/[controller]")]
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
            return Ok(courses);
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
