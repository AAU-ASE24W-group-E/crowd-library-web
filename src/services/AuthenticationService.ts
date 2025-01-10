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
  longitude: number;
  latitude: number;
}

export interface LoginStatePayload {
  initialLoginPending: boolean;
}

class AuthenticationService {
  private subdomain: string = '/user';

  async registerUser(payload: RegisterPayload) {
    return await apiClient.post(this.subdomain, payload);
  }

  async login(payload: LoginPayload) {
    return await apiClient.post(`${this.subdomain}/login`, payload);
  }

  async setLocation(uid: string, payload: LocationPayload) {
    return await apiClient.post(`${this.subdomain}/${uid}/address`, payload);
  }

  async updateLocation(uid: string, payload: LocationPayload) {
    return await apiClient.put(`${this.subdomain}/${uid}/address`, payload);
  }

  async setInitialLogin(uid: string) {
    return await apiClient.put(`${this.subdomain}/${uid}/set-initial-login`);
  }
}

export const authenticationService = new AuthenticationService();
