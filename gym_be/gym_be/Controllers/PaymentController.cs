using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using Newtonsoft.Json;
using System.IO;
using System.Threading.Tasks;
using gym_be.Models;
using gym_be.Models.Entities;

namespace gym_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly GymContext _context;
        public PaymentController(GymContext context) { _context = context; }

        [HttpPost("create-checkout-session")]
        public IActionResult CreateCheckoutSession([FromBody] CheckoutSessionRequest request)
        {
            StripeConfiguration.ApiKey = "sk_test_51Rom2g3PJbTWL2KKBiJZVnavBq2U1V1p7xrBWn1WI0Y5UM8xQ56LNXMmWMiY6AQMMk3vmXmdpinjVMQwYC20Logd00LGhiefLH";

            var origin = request.Origin ?? "http://localhost:3000";
            var successUrl = $"{origin}/user/cart?success=true";
            var cancelUrl = $"{origin}/user/cart?canceled=true";

            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = request.Items.Select(item => new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmount = (long)(item.Price), // VND to cents
                        Currency = "vnd",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = item.Name,
                        },
                    },
                    Quantity = 1,
                }).ToList(),
                Mode = "payment",
                SuccessUrl = successUrl,
                CancelUrl = cancelUrl,
                Metadata = new Dictionary<string, string>
                {
                    { "customerid", request.CustomerId ?? "" },
                    { "courses", JsonConvert.SerializeObject(request.Items) }
                }
            };

            var service = new SessionService();
            Session session = service.Create(options);

            return Ok(new { url = session.Url });
        }

        [HttpPost("save")]
        public async Task<IActionResult> SavePayment([FromBody] SavePaymentRequest request)
        {
            var paymentId = Guid.NewGuid();
            var paidAt = DateTime.UtcNow;
            decimal total = request.Items.Sum(i => (decimal)(i.price));

            var payment = new Payment
            {
                PaymentId = paymentId,
                Amount = total,
                CustomerId = Guid.TryParse(request.CustomerId?.ToString(), out var cid) ? cid : (Guid?)null,
                Status = true,
                PaidAt = paidAt,
                Method = true // method = visa
            };
            _context.Payments.Add(payment);

            foreach (var item in request.Items)
            {
                Guid courseGuid = Guid.TryParse(item.id?.ToString(), out var parsedId) ? parsedId : Guid.Empty;
                var detail = new PaymentDetail
                {
                    PaymentDetailId = Guid.NewGuid(),
                    PaymentId = paymentId,
                    CourseId = courseGuid,
                    Price = (decimal)item.price,
                    CustomerId = Guid.TryParse(request.CustomerId?.ToString(), out var cid2) ? cid2 : (Guid?)null
                };
                _context.PaymentDetails.Add(detail);
            }
            await _context.SaveChangesAsync();
            return Ok(new { message = "Payment saved" });
        }

        [HttpGet("my-courses/{customerId}")]
        public IActionResult GetMyCourses(Guid customerId)
        {
            // Lấy các paymentId đã thanh toán thành công của customer
            var paidPaymentIds = _context.Payments
                .Where(p => p.CustomerId == customerId && p.Status == true)
                .Select(p => p.PaymentId)
                .ToList();

            // Lấy các khoá học đã mua
            var courseList = (from pd in _context.PaymentDetails
                              join c in _context.WorkoutCourses on pd.CourseId equals c.CourseId
                              where pd.CustomerId == customerId && paidPaymentIds.Contains(pd.PaymentId)
                              select new {
                                  courseid = c.CourseId,
                                  coursename = c.CourseName,
                                  imageurl = c.ImageUrl,
                                  personaltrainerid = c.PersonalTrainerId,
                                  durationweek = c.DurationWeek,
                                  description = c.Description,
                                  price = c.Price,
                                  serviceid = c.ServiceId,
                                  schedules = c.Schedules
                              }).ToList();

            return Ok(courseList);
        }
    }

    public class CheckoutItem
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
    }

    public class CheckoutSessionRequest
    {
        public List<CheckoutItem> Items { get; set; }
        public string Origin { get; set; }
        public string CustomerId { get; set; } // thêm trường này để truyền customerid
    }

    public class SavePaymentRequest
    {
        public List<SavePaymentItem> Items { get; set; }
        public string CustomerId { get; set; }
    }
    public class SavePaymentItem
    {
        public string id { get; set; }
        public string coursename { get; set; }
        public decimal price { get; set; }
    }
}