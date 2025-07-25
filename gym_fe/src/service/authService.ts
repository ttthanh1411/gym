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

  async login(credentials: LoginCredentials & { rememberMe: boolean }): Promise<any> {
    const res = await fetch('http://localhost:5231/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Login failed');
    }
    return res.json();
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