import { userApiService } from '@/services/clients.ts';

export interface LocationPayload {
  longitude: number;
  latitude: number;
}

export interface UserPayload {
  email: string;
  username: string;
}

export interface PasswordPayload {
  oldPassword: string;
  newPassword: string;
}

class UserService {
  readonly subdomain: string = '/user';

  async getUserById(uid: string) {
    return await userApiService.get(`${this.subdomain}/${uid}`);
  }

  async setLocation(uid: string, payload: LocationPayload) {
    return await userApiService.post(`${this.subdomain}/${uid}/address`, payload);
  }

  async updateLocation(uid: string, payload: LocationPayload) {
    return await userApiService.put(`${this.subdomain}/${uid}/address`, payload);
  }

  async updateUserInfo(uid: string, payload: UserPayload) {
    console.log('Send update user request', payload);
    return await userApiService.put(`${this.subdomain}/${uid}/`, payload);

  }

  async updatePassword(uid: string, payload: PasswordPayload) {
    console.log('Send update password request');
    return await userApiService.put(`${this.subdomain}/${uid}/password`, payload);
  }
}

export const userService = new UserService();
