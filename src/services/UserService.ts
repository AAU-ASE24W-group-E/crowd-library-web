import apiClient from '@/api.ts';

export interface LocationPayload {
  longitude: number;
  latitude: number;
}

class UserService {
  private subdomain: string = '/user';

  async setLocation(uid: string, payload: LocationPayload) {
    return await apiClient.post(`${this.subdomain}/${uid}/address`, payload);
  }

  async updateLocation(uid: string, payload: LocationPayload) {
    return await apiClient.put(`${this.subdomain}/${uid}/address`, payload);
  }
}

export const userService = new UserService();
