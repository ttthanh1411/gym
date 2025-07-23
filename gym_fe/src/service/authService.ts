import { LoginCredentials, AuthResponse, User } from '../types/auth';

class AuthService {
  private baseUrl = '/api/auth';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Mock authentication - replace with real API call
    const mockUsers = [
      {
        id: '1',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin' as const,
        password: 'admin123'
      },
      {
        id: '2',
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user' as const,
        password: 'user123'
      }
    ];

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          const { ...userWithoutPassword } = user;
          resolve({
            user: userWithoutPassword,
            token: `mock-token-${user.id}`
          });
        } else {
          reject(new Error('Email hoặc mật khẩu không đúng'));
        }
      }, 1000);
    });
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    
    if (token && userData) {
      return JSON.parse(userData);
    }
    
    return null;
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  }
}

export default new AuthService();