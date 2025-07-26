interface Appointment {
  appointmentId: string;
  appointmentName: string;
  appointmentDate: string;
  appointmentTime: string;
  price: number;
  serviceName: string;
  scheduleInfo?: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  };
  status: string;
}

class AppointmentService {
  private baseUrl = 'http://localhost:5231/api/appointment';

  async getMyAppointments(customerId: string): Promise<Appointment[]> {
    const response = await fetch(`${this.baseUrl}/my-appointments/${customerId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get my appointments');
    }

    return response.json();
  }

  async getAllAppointments(): Promise<Appointment[]> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get appointments');
    }

    return response.json();
  }

  async createAppointment(appointmentData: any): Promise<Appointment> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create appointment');
    }

    return response.json();
  }

  async updateAppointment(appointmentId: string, appointmentData: any): Promise<Appointment> {
    const response = await fetch(`${this.baseUrl}/${appointmentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update appointment');
    }

    return response.json();
  }

  async deleteAppointment(appointmentId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/${appointmentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete appointment');
    }
  }
}

export default new AppointmentService(); 