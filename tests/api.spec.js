import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import apiClient from '@/api';
import { mount } from '@vue/test-utils';
import LoginComponent from '@/components/LoginComponent.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
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

    const updatedConfig = await apiClient.interceptors.request.handlers[0].fulfilled(mockRequest);

    expect(updatedConfig.headers.Authorization).toBe('Bearer mock-token');
  });

  it('should not add Authorization header if token does not exist', async () => {
    console.log(authStoreMock);
    authStoreMock.token = null;

    const mockRequest = { headers: {} };
    const updatedConfig = await apiClient.interceptors.request.handlers[0].fulfilled(mockRequest);

    console.log(updatedConfig.headers.Authorization);

    expect(updatedConfig.headers.Authorization).toBeUndefined();
  });

  it('should return response directly if no error occurs', async () => {
    const mockResponse = { data: 'mock-data' };

    const response = await apiClient.interceptors.response.handlers[0].fulfilled(mockResponse);

    expect(response).toEqual(mockResponse);
  });

  it('should pass through errors that are not 401', async () => {
    const mockError = {
      response: {
        status: 500,
      },
    };

    await expect(apiClient.interceptors.response.handlers[0].rejected(mockError)).rejects.toEqual(
      mockError
    );
  });
});
