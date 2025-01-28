import { describe, it, vi, beforeEach, expect } from 'vitest';
import { authenticationService } from '@/services/AuthenticationService';
import { userApiService } from '@/services/clients.ts';

vi.mock('@/services/clients.ts', () => ({
  userApiService: {
    post: vi.fn(),
    put: vi.fn(),
  },
}));

describe('AuthenticationService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('requestReset', () => {
    it('calls the API with the correct email and resolves successfully', async () => {
      const mockEmail = 'test@example.com';
      const mockResponse = { message: 'Password reset link sent' };

      userApiService.post.mockResolvedValueOnce({ data: mockResponse });

      const response = await authenticationService.requestReset(mockEmail);

      expect(userApiService.post).toHaveBeenCalledWith('/user/forgot-password', {
        email: mockEmail,
      });
      expect(response.data).toEqual(mockResponse);
    });

    it('handles API failure gracefully', async () => {
      const mockEmail = 'test@example.com';
      const mockError = new Error('API Error');

      userApiService.post.mockRejectedValueOnce(mockError);

      await expect(authenticationService.requestReset(mockEmail)).rejects.toThrow(
        'API Error'
      );
      expect(userApiService.post).toHaveBeenCalledWith('/user/forgot-password', {
        email: mockEmail,
      });
    });
  });

  describe('resetPassword', () => {
    it('calls the API with the correct token and password and resolves successfully', async () => {
      const mockToken = 'mock-token';
      const mockPassword = 'newPassword123';
      const mockResponse = { message: 'Password successfully reset' };

      userApiService.post.mockResolvedValueOnce({ data: mockResponse });

      const response = await authenticationService.resetPassword(mockToken, mockPassword);

      expect(userApiService.post).toHaveBeenCalledWith('/user/reset-password', {
        token: mockToken,
        newPassword: mockPassword,
      });
      expect(response.data).toEqual(mockResponse);
    });

    it('handles API failure gracefully', async () => {
      const mockToken = 'mock-token';
      const mockPassword = 'newPassword123';
      const mockError = new Error('API Error');

      userApiService.post.mockRejectedValueOnce(mockError);

      await expect(authenticationService.resetPassword(mockToken, mockPassword)).rejects.toThrow(
        'API Error'
      );
      expect(userApiService.post).toHaveBeenCalledWith('/user/reset-password', {
        token: mockToken,
        newPassword: mockPassword,
      });
    });
  });
});
