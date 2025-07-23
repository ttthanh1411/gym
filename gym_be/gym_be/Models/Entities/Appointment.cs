using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace gym_be.Models.Entities
{
    [Table("appointment")]
    public class Appointment
    {
        [Key]
        [Column("appointmentid")]
        public Guid AppointmentId { get; set; }

        [Column("appointmentname")]
        public string AppointmentName { get; set; }

        [Column("appointmentdate")]
        public DateTime AppointmentDate { get; set; }

        [Column("appointmenttime")]
        public DateTime AppointmentTime { get; set; }

        [Column("price")]
        public decimal Price { get; set; }

        [Column("customerid")]
        public string CustomerId { get; set; }

        [Column("scheduleid")]
        public string ScheduleId { get; set; }

        [Column("serviceid")]
        public string ServiceId { get; set; }

        public Customer Customer { get; set; }

        public Schedule Schedule { get; set; }

        public Service Service { get; set; }

        [Column("status")]
        public int Status { get; set; }
    }
}
