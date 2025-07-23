namespace gym_be.Models.DTOs
{
    public class AppointmentDto
    {
        public Guid AppointmentId { get; set; }
        public string AppointmentName { get; set; }
        public DateTime AppointmentDate { get; set; }
        public DateTime AppointmentTime { get; set; }
        public decimal Price { get; set; }
        public string CustomerId { get; set; }
        public int Status { get; set; }
        public string ScheduleId { get; set; }
        public string ServiceId { get; set; }
    }
}
