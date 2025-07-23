using gym_be.Models.DTOs;
using gym_be.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace gym_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _appointmentService;

        public AppointmentController(IAppointmentService appointmentService)
        {
            _appointmentService = appointmentService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppointmentDto>> GetAppointmentById(Guid id)
        {
            var appointment = await _appointmentService.GetAppointmentByIdAsync(id);
            if (appointment == null)
                return NotFound();

            return Ok(appointment);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> GetAllAppointments(int page = 1, int pageSize = 10)
        {
            var appointments = await _appointmentService.GetAllAppointmentsAsync(page, pageSize);
            return Ok(appointments);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<AppointmentDto>>> SearchAppointments(string query)
        {
            var appointments = await _appointmentService.SearchAppointmentsAsync(query);
            return Ok(appointments);
        }

        [HttpPost]
        public async Task<ActionResult<AppointmentDto>> AddAppointment(AppointmentDto appointmentDto)
        {
            var appointment = await _appointmentService.AddAppointmentAsync(appointmentDto);
            return CreatedAtAction(nameof(GetAppointmentById), new { id = appointment.AppointmentId }, appointment);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AppointmentDto>> UpdateAppointment(Guid id, AppointmentDto appointmentDto)
        {
            var updatedAppointment = await _appointmentService.UpdateAppointmentAsync(id, appointmentDto);
            if (updatedAppointment == null)
                return NotFound();

            return Ok(updatedAppointment);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAppointment(Guid id)
        {
            var success = await _appointmentService.DeleteAppointmentAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
