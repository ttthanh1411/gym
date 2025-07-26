export interface DashboardOverview {
    totalCustomers: number;
    todayAppointments: number;
    completedToday: number;
    totalToday: number;
    monthlyRevenue: number;
    revenueChange: string;
    activeCourses: number;
    enrolledStudents: number;
    customerGrowth: string;
    appointmentGrowth: string;
}

export interface RevenueChartData {
    period: string;
    revenue: number;
}

export interface AppointmentTrend {
    date: string;
    count: number;
    completed: number;
}

export interface PopularService {
    serviceName: string;
    bookingCount: number;
    revenue: number;
}

export interface RecentActivity {
    type: string;
    title: string;
    description: string;
    date: string;
    status: string;
}

class DashboardService {
    private baseUrl = 'http://localhost:5231';

    async getOverview(): Promise<DashboardOverview> {
        const response = await fetch(`${this.baseUrl}/api/dashboard/overview`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async getRevenueChart(period: 'month' | 'week' = 'month'): Promise<RevenueChartData[]> {
        const response = await fetch(`${this.baseUrl}/api/dashboard/revenue-chart?period=${period}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async getAppointmentTrends(): Promise<AppointmentTrend[]> {
        const response = await fetch(`${this.baseUrl}/api/dashboard/appointment-trends`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async getPopularServices(): Promise<PopularService[]> {
        const response = await fetch(`${this.baseUrl}/api/dashboard/popular-services`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    async getRecentActivities(): Promise<RecentActivity[]> {
        const response = await fetch(`${this.baseUrl}/api/dashboard/recent-activities`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
}

export default new DashboardService(); 