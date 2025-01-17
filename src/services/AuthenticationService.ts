import type { User } from '@/interfaces/user.ts';
import { useUserStore } from '@/stores/user.ts'
import { useAuthStore } from '@/stores/auth.ts'
import { userApiService } from '@/services/clients.ts';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
  address?: string | null;
  role: string;
}

class AuthenticationService {
  readonly subdomain: string = '/user';

  async registerUser(payload: RegisterPayload) {
    return await userApiService.post(this.subdomain, payload);
  }

  async login(payload: LoginPayload) {
    const userStore = useUserStore();
    const authStore = useAuthStore();

    const response = await userApiService.post<LoginResponse>(
      `${this.subdomain}/login`,
      payload
    );
    const loginResponse : LoginResponse = response.data;
    const user : User = loginResponse.user;

    userStore.setUser(user);
    authStore.setToken(loginResponse.token);

    return response;
  }

  async setInitialLogin(uid: string) {
    return await userApiService.put(`${this.subdomain}/${uid}/set-initial-login`);
  }
}

export const authenticationService = new AuthenticationService();
