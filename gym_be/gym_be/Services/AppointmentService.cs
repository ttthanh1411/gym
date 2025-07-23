using gym_be.Models.DTOs;
using gym_be.Models;
using gym_be.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using gym_be.Models.Entities;

namespace gym_be.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly GymContext _context;

        public AppointmentService(GymContext context)
        {
            _context = context;
        }

        public async Task<AppointmentDto> GetAppointmentByIdAsync(Guid appointmentId)
        {
            var appointment = await _context.Appointments
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);

            if (appointment == null)
                return null;

            return new AppointmentDto
            {
                AppointmentId = appointment.AppointmentId,
                AppointmentName = appointment.AppointmentName,
                AppointmentDate = appointment.AppointmentDate,
                AppointmentTime = appointment.AppointmentTime,
                Price = appointment.Price,
                CustomerId = appointment.CustomerId,
                Status = appointment.Status,
                ScheduleId = appointment.ScheduleId,
                ServiceId = appointment.ServiceId
            };
        }

        public async Task<IEnumerable<AppointmentDto>> GetAllAppointmentsAsync(int page, int pageSize)
        {
            return await _context.Appointments
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(a => new AppointmentDto
                {
                    AppointmentId = a.AppointmentId,
                    AppointmentName = a.AppointmentName,
                    AppointmentDate = a.AppointmentDate,
                    AppointmentTime = a.AppointmentTime,
                    Price = a.Price,
                    CustomerId = a.CustomerId,
                    Status = a.Status,
                    ScheduleId = a.ScheduleId,
                    ServiceId = a.ServiceId
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<AppointmentDto>> SearchAppointmentsAsync(string searchQuery)
        {
            return await _context.Appointments
                .Where(a => a.AppointmentName.Contains(searchQuery))
                .Select(a => new AppointmentDto
                {
                    AppointmentId = a.AppointmentId,
                    AppointmentName = a.AppointmentName,
                    AppointmentDate = a.AppointmentDate,
                    AppointmentTime = a.AppointmentTime,
                    Price = a.Price,
                    CustomerId = a.CustomerId,
                    Status = a.Status,
                    ScheduleId = a.ScheduleId,
                    ServiceId = a.ServiceId
                })
                .ToListAsync();
        }

        public async Task<AppointmentDto> AddAppointmentAsync(AppointmentDto appointmentDto)
        {
            var appointment = new Appointment
            {
                AppointmentId = Guid.NewGuid(),
                AppointmentName = appointmentDto.AppointmentName,
                AppointmentDate = appointmentDto.AppointmentDate,
                AppointmentTime = appointmentDto.AppointmentTime,
                Price = appointmentDto.Price,
                CustomerId = appointmentDto.CustomerId,
                Status = appointmentDto.Status,
                ScheduleId = appointmentDto.ScheduleId,
                ServiceId = appointmentDto.ServiceId
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync();

            appointmentDto.AppointmentId = appointment.AppointmentId;
            return appointmentDto;
        }

        public async Task<AppointmentDto> UpdateAppointmentAsync(Guid appointmentId, AppointmentDto appointmentDto)
        {
            var appointment = await _context.Appointments
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);

            if (appointment == null)
                return null;

            appointment.AppointmentName = appointmentDto.AppointmentName;
            appointment.AppointmentDate = appointmentDto.AppointmentDate;
            appointment.AppointmentTime = appointmentDto.AppointmentTime;
            appointment.Price = appointmentDto.Price;
            appointment.CustomerId = appointmentDto.CustomerId;
            appointment.Status = appointmentDto.Status;
            appointment.ScheduleId = appointmentDto.ScheduleId;
            appointment.ServiceId = appointmentDto.ServiceId;

            await _context.SaveChangesAsync();

            return appointmentDto;
        }

        public async Task<bool> DeleteAppointmentAsync(Guid appointmentId)
        {
            var appointment = await _context.Appointments
                .FirstOrDefaultAsync(a => a.AppointmentId == appointmentId);

            if (appointment == null)
                return false;

            _context.Appointments.Remove(appointment);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
