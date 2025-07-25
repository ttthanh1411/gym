using System.ComponentModel.DataAnnotations;

namespace gym_be.Models.DTOs
{
    public class LoginDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
} 