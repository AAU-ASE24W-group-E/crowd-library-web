import apiClient from "@/api.ts";
import type {RegisterPayload} from "@/interfaces/RegisterPayload.ts";
import type {LoginPayload} from "@/interfaces/LoginPayload.ts";

class AuthenticationService {
  private subdomain: string = '/user';

  async registerUser(payload: RegisterPayload) {
    try {
      return await apiClient.post(this.subdomain, payload);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'An error occurred during registration'
      );
    }
  }

  async login(payload: LoginPayload) {
    try {
      return await apiClient.post('/login', payload);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || 'An error occurred during login'
      );
    }
  }
}

export const authenticationService = new AuthenticationService();
