import apiClient from '@/api.ts';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  address?: string | null;
  role: string;
}

class AuthenticationService {
  private subdomain: string = '/user';

  async registerUser(payload: RegisterPayload) {
    return await apiClient.post(this.subdomain, payload);
  }

  async login(payload: LoginPayload) {
    return await apiClient.post('/login', payload);
  }

  async setLocation(payload: LoginPayload) {
    return await apiClient.post('/login', payload);
  }
}

export const authenticationService = new AuthenticationService();