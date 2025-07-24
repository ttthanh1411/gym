using gym_be.Models.DTOs;
using gym_be.Models.Entities;
using gym_be.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace gym_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public AuthController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!dto.AgreeToTerms)
                return BadRequest(new { message = "You must agree to the terms." });

            if (dto.Password != dto.ConfirmPassword)
                return BadRequest(new { message = "Passwords do not match." });

            // Check if email exists
            var existing = await _customerService.GetByEmailAsync(dto.Email);
            if (existing != null)
                return BadRequest(new { message = "Email already registered." });

            // Store password as plain text (not recommended for production)
            var passwordHash = dto.Password;

            var customer = new Customer
            {
                CustomerID = Guid.NewGuid(),
                Name = dto.FullName,
                Email = dto.Email,
                Password = passwordHash,
                Type = 1, // 1 = user, 0 = admin
                Status = 1,
                PhoneNumber = $"09{new Random().Next(10000000, 99999999)}",
                Address = "No address"
            };

            await _customerService.CreateAsync(customer);

            return Ok(new { message = "Registration successful" });
        }
    }
} 