using gym_be.Models.DTOs;
using gym_be.Models.Entities;
using gym_be.Repositories.Interfaces;
using gym_be.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using gym_be.Models.DTOs;

namespace gym_be.Services.Implementations
{
    public class ScheduleService : IScheduleService
    {
        private readonly IScheduleRepository _repository;

        public ScheduleService(IScheduleRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Schedule>> GetAllAsync() => await _repository.GetAllAsync();

        public async Task<Schedule?> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);

        public async Task<Schedule> CreateAsync(Schedule schedule)
        {
            if (schedule.ScheduleID == Guid.Empty)
            {
                schedule.ScheduleID = Guid.NewGuid();
            }
            await _repository.AddAsync(schedule);
            await _repository.SaveChangesAsync();
            return schedule;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return false;
            await _repository.DeleteAsync(id);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<(IEnumerable<Schedule> data, int totalCount)> GetPagedAsync(string? keyword, int page, int pageSize)
        {
            var query = _repository.Query();

            if (!string.IsNullOrWhiteSpace(keyword))
            {
                keyword = keyword.ToLower();
                query = query.Where(s => s.DayOfWeek.ToLower().Contains(keyword));
            }

            var total = await query.CountAsync();

            var data = await query
                .OrderBy(s => s.StartTime)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (data, total);
        }

        public async Task<IEnumerable<ScheduleOptionDto>> GetOptionsAsync()
        {
            return await _repository.Query()
                .Select(s => new ScheduleOptionDto
                {
                    Value = s.ScheduleID,
                    Label = $"{s.DayOfWeek} | {s.StartTime:HH:mm} - {s.EndTime:HH:mm}"
                })
                .ToListAsync();
        }
    }
}
