import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginComponent from '@/components/LoginComponent.vue';
import { userApiService } from '@/services/clients.ts';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock('@/utils/snackbar.ts', () => ({
  Snackbar: {
    showSnackbar: vi.fn(),
  },
}));

const authStoreMock = {
  token: 'mock-token',
  clearToken: vi.fn(),
};

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(() => authStoreMock),
}));

describe('API Client - Interceptors', () => {
  let wrapper;

  beforeEach(() => {
    vi.clearAllMocks();

    wrapper = mount(LoginComponent, {
      global: {
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should add Authorization header if token exists', async () => {
    const mockRequest = { headers: {} };

    const updatedConfig = await userApiService.interceptors.request.handlers[0].fulfilled(mockRequest);

    expect(updatedConfig.headers.Authorization).toBe('Bearer mock-token');
  });

  it('should not add Authorization header if token does not exist', async () => {
    console.log(authStoreMock);
    authStoreMock.token = null;

    const mockRequest = { headers: {} };
    const updatedConfig = await userApiService.interceptors.request.handlers[0].fulfilled(mockRequest);

    console.log(updatedConfig.headers.Authorization);

    expect(updatedConfig.headers.Authorization).toBeUndefined();
  });

  it('should return response directly if no error occurs', async () => {
    const mockResponse = { data: 'mock-data' };

    const response = await userApiService.interceptors.response.handlers[0].fulfilled(mockResponse);

    expect(response).toEqual(mockResponse);
  });

  it('should pass through errors that are not in api', async () => {
    const mockError = {
      response: {
        status: 500,
      },
    };

    await expect(userApiService.interceptors.response.handlers[0].rejected(mockError)).rejects.toEqual(
      mockError
    );
  });


  it('should handle 401 error by clearing token and redirecting to login', async () => {
    const mockError = {
      response: {
        status: 401,
      },
    };

    await expect(userApiService.interceptors.response.handlers[0].rejected(mockError)).rejects.toEqual(
      mockError
    );

    expect(authStoreMock.clearToken).toHaveBeenCalled();
  });

  it('should handle 404 error by showing a warning snackbar', async () => {
    const mockError = {
      response: {
        status: 404,
      },
    };

    await expect(userApiService.interceptors.response.handlers[0].rejected(mockError)).rejects.toEqual(
      mockError
    );

    expect(Snackbar.showSnackbar).toHaveBeenCalledWith('Not found...', SnackbarType.WARN, 15);
  });

  it('should handle 400 error by showing a user error snackbar', async () => {
    const mockError = {
      response: {
        status: 400,
        data: {
          message: 'Bad Request',
        },
      },
    };

    await expect(userApiService.interceptors.response.handlers[0].rejected(mockError)).rejects.toEqual(
      mockError
    );

    expect(Snackbar.showSnackbar).toHaveBeenCalledWith('User error - Bad Request', SnackbarType.WARN, 15);
  });

});
