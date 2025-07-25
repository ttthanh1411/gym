using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;

namespace gym_be.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
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
            };

            var service = new SessionService();
            Session session = service.Create(options);

            return Ok(new { url = session.Url });
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
    }
}