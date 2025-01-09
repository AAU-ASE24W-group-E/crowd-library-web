import apiClient from "@/api.ts";
import type {RegisterPayload} from "@/interfaces/RegisterPayload.ts";
import type {LoginPayload} from "@/interfaces/LoginPayload.ts";

class AuthenticationService {
  private subdomain: string = '/user';

  async registerUser(payload: RegisterPayload) {
    return await apiClient.post(this.subdomain, payload);
  }

  async login(payload: LoginPayload) {
    return await apiClient.post('/login', payload);
  }
}

export const authenticationService = new AuthenticationService();
