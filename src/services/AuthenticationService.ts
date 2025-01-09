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

export interface LocationPayload {
  uid: string;
  longitude: number;
  latitude: number;
}

class AuthenticationService {
  private subdomain: string = '/user';

  async registerUser(payload: RegisterPayload) {
    return await apiClient.post(this.subdomain, payload);
  }

  async login(payload: LoginPayload) {
    return await apiClient.post('/login', payload);
  }

  async setLocation(uid: string, payload: LocationPayload) {
    return await apiClient.post(`${this.subdomain}/${uid}/address`, payload);
  }
}

export const authenticationService = new AuthenticationService();
