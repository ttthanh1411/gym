namespace gym_be.Models.DTOs
{
    public class WorkoutCourseDto
    {
        public Guid CourseId { get; set; }
        public string CourseName { get; set; }
        public string ImageUrl { get; set; }
        public Guid PersonalTrainerId { get; set; }
        public int DurationWeek { get; set; }
        public string Description { get; set; }
        public string PersonalTrainerName { get; set; } 
        public List<Guid> Schedules { get; set; } = new List<Guid>();
    }
}
