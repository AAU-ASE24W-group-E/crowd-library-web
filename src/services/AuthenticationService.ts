import apiClient from "@/api.ts";
import type {RegisterPayload} from "@/interfaces/RegisterPayload.ts";
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
}

export const authenticationService = new AuthenticationService();
