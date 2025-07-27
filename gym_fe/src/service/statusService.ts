export interface AppointmentStatus {
  statusid: string;
  statusname: string;
}

class StatusService {
  private baseUrl = 'http://localhost:5231/api/status';

  async getStatuses(): Promise<AppointmentStatus[]> {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get appointment statuses');
    }

    return response.json();
  }
}

export default new StatusService();
