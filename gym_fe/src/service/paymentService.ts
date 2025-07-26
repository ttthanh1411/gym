// src/service/paymentService.ts

interface CheckoutItem {
  Name: string;
  Price: number;
}

interface CheckoutSessionRequest {
  Items: CheckoutItem[];
  Origin: string;
  CustomerId: string;
}

interface SavePaymentItem {
  id: string;
  coursename: string;
  price: number;
}

interface SavePaymentRequest {
  Items: SavePaymentItem[];
  CustomerId: string;
}

interface PaymentResponse {
  url?: string;
  message?: string;
}

interface Course {
  courseid: string;
  coursename: string;
  imageurl: string;
  personaltrainerid: string;
  durationweek: number;
  description: string;
  price: number;
  serviceid: string;
  schedules: string[];
}

interface Schedule {
  scheduleid: string;
  dayofWeek: string;
  maxparticipants: number;
  starttime: string;
  endtime: string;
  courseid: string;
  coursename: string;
  teachername: string;
}

interface PaymentHistory {
  paymentId: string;
  courseId: string;
  courseName: string;
  instructor: string;
  amount: number;
  originalAmount: number;
  status: string;
  date: string;
  paymentMethod: string;
  transactionId: string;
  discount: number;
  paidAt: string;
}

class PaymentService {
  private baseUrl = 'http://localhost:5231/api/payment';

  async createCheckoutSession(request: CheckoutSessionRequest): Promise<PaymentResponse> {
    const response = await fetch(`${this.baseUrl}/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create checkout session');
    }

    return response.json();
  }

  async savePayment(request: SavePaymentRequest): Promise<PaymentResponse> {
    const response = await fetch(`${this.baseUrl}/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save payment');
    }

    return response.json();
  }

  async getMyCourses(customerId: string): Promise<Course[]> {
    const response = await fetch(`${this.baseUrl}/my-courses/${customerId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get my courses');
    }

    return response.json();
  }

  async getMySchedules(customerId: string): Promise<Schedule[]> {
    const response = await fetch(`${this.baseUrl}/my-schedules/${customerId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get my schedules');
    }

    return response.json();
  }

  async getPaymentHistory(customerId: string): Promise<PaymentHistory[]> {
    const response = await fetch(`${this.baseUrl}/history/${customerId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get payment history');
    }

    return response.json();
  }
}

export default new PaymentService();
export type { PaymentHistory }; 