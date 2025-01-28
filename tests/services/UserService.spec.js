import { describe, it, vi, expect, beforeEach } from 'vitest';
import { userService } from '@/services/UserService';
import { userApiService } from '@/services/clients.ts';

vi.mock('@/services/clients.ts', () => ({
  userApiService: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUserId = 'test-user-id';
  const mockLocationPayload = {
    longitude: 10.123456,
    latitude: 45.123456,
  };
  const mockUserPayload = {
    email: 'test@example.com',
    username: 'testuser',
  };
  const mockPasswordPayload = {
    oldPassword: 'old-password',
    newPassword: 'new-password',
  };
  const mockResponse = { data: 'mock-response-data' };

  it('should call GET /user/:id to retrieve user by ID', async () => {
    userApiService.get.mockResolvedValue(mockResponse);

    const response = await userService.getUserById(mockUserId);

    expect(userApiService.get).toHaveBeenCalledWith(`/user/${mockUserId}`);
    expect(response).toEqual(mockResponse);
  });

  it('should call POST /user/:id/address to set user location', async () => {
    userApiService.post.mockResolvedValue(mockResponse);

    const response = await userService.setLocation(mockUserId, mockLocationPayload);

    expect(userApiService.post).toHaveBeenCalledWith(
      `/user/${mockUserId}/address`,
      mockLocationPayload
    );
    expect(response).toEqual(mockResponse);
  });

  it('should call PUT /user/:id/address to update user location', async () => {
    userApiService.put.mockResolvedValue(mockResponse);

    const response = await userService.updateLocation(mockUserId, mockLocationPayload);

    expect(userApiService.put).toHaveBeenCalledWith(
      `/user/${mockUserId}/address`,
      mockLocationPayload
    );
    expect(response).toEqual(mockResponse);
  });

  it('should call PUT /user/:id/ to update user info', async () => {
    userApiService.put.mockResolvedValue(mockResponse);

    const response = await userService.updateUserInfo(mockUserId, mockUserPayload);

    expect(userApiService.put).toHaveBeenCalledWith(
      `/user/${mockUserId}/`,
      mockUserPayload
    );
    expect(response).toEqual(mockResponse);
  });

  it('should call PUT /user/:id/password to update user password', async () => {
    userApiService.put.mockResolvedValue(mockResponse);

    const response = await userService.updatePassword(mockUserId, mockPasswordPayload);

    expect(userApiService.put).toHaveBeenCalledWith(
      `/user/${mockUserId}/password`,
      mockPasswordPayload
    );
    expect(response).toEqual(mockResponse);
  });
});
