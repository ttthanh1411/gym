using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using Newtonsoft.Json;
using gym_be.Models;
using gym_be.Models.Entities;
using gym_be.Services.Interfaces;
using System.Globalization;
using System.Text.RegularExpressions;
using System;

namespace gym_be.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly GymContext _context;

        public PaymentService(GymContext context)
        {
            _context = context;
        }

        public async Task<object> CreateCheckoutSessionAsync(CheckoutSessionRequest request)
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
                        UnitAmount = (long)(item.Price),
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

            return new { url = session.Url };
        }

        public async Task<object> SavePaymentAsync(SavePaymentRequest request)
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
                Method = true
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
            return new { message = "Payment saved" };
        }

        public async Task<IEnumerable<object>> GetMyCoursesAsync(Guid customerId)
        {
            var payments = await _context.Payments
                .Where(p => p.CustomerId == customerId && p.Status == true)
                .ToListAsync();

            var paymentIds = payments.Select(p => p.PaymentId).ToList();

            var courseDetails = await _context.PaymentDetails
                .Where(pd => paymentIds.Contains(pd.PaymentId))
                .Join(_context.WorkoutCourses,
                    pd => pd.CourseId,
                    wc => wc.CourseId,
                    (pd, wc) => new
                    {
                        CourseId = wc.CourseId,
                        CourseName = wc.CourseName,
                        CourseDescription = wc.CourseDescription,
                        Price = pd.Price,
                        PaidAt = payments.FirstOrDefault(p => p.PaymentId == pd.PaymentId)?.PaidAt
                    })
                .ToListAsync();

            return courseDetails.Select(cd => new
            {
                courseId = cd.CourseId,
                courseName = cd.CourseName,
                courseDescription = cd.CourseDescription,
                price = cd.Price,
                paidAt = cd.PaidAt
            });
        }

        public async Task<IEnumerable<object>> GetMySchedulesAsync(Guid customerId)
        {
            var appointments = await _context.Appointments
                .Where(a => a.CustomerId == customerId)
                .Join(_context.WorkoutCourses,
                    a => a.CourseId,
                    wc => wc.CourseId,
                    (a, wc) => new
                    {
                        AppointmentId = a.AppointmentId,
                        CourseName = wc.CourseName,
                        AppointmentDate = a.AppointmentDate,
                        AppointmentTime = a.AppointmentTime,
                        Price = a.Price
                    })
                .ToListAsync();

            return appointments.Select(a => new
            {
                appointmentId = a.AppointmentId,
                courseName = a.CourseName,
                appointmentDate = a.AppointmentDate,
                appointmentTime = a.AppointmentTime,
                price = a.Price
            });
        }

        public async Task<IEnumerable<object>> GetPaymentHistoryAsync(Guid customerId)
        {
            var payments = await _context.Payments
                .Where(p => p.CustomerId == customerId)
                .OrderByDescending(p => p.PaidAt)
                .ToListAsync();

            var paymentDetails = await _context.PaymentDetails
                .Where(pd => payments.Select(p => p.PaymentId).Contains(pd.PaymentId))
                .Join(_context.WorkoutCourses,
                    pd => pd.CourseId,
                    wc => wc.CourseId,
                    (pd, wc) => new
                    {
                        PaymentId = pd.PaymentId,
                        CourseName = wc.CourseName,
                        Price = pd.Price
                    })
                .ToListAsync();

            var result = payments.Select(p => new
            {
                paymentId = p.PaymentId,
                amount = p.Amount,
                paidAt = p.PaidAt,
                method = p.Method ? "Card" : "Cash",
                status = p.Status ? "Completed" : "Pending",
                courses = paymentDetails
                    .Where(pd => pd.PaymentId == p.PaymentId)
                    .Select(pd => new
                    {
                        courseName = pd.CourseName,
                        price = pd.Price
                    })
            });

            return result;
        }
    }
} 