// TODO: Fix import path or provide type definitions for LoginCredentials, AuthResponse, User
// import { LoginCredentials, AuthResponse, User } from '../types/auth';

type LoginCredentials = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  // password?: string; // Exclude password from user type if not needed
};

type AuthResponse = {
  user: User;
  token: string;
};

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

export async function register(data: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  type: number;
  phoneNumber: string;
  address: string;
  status: number;
}) {
  const res = await fetch('http://localhost:5231/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Registration failed');
  }
  return res.json();
}