import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import LoginComponent from '@/components/LoginComponent.vue';
import apiClient from '@/api';
import { authenticationService } from '@/services/AuthenticationService';

// Mock Vue Router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

const mockUserStore = { setUser: vi.fn() };
vi.mock('@/stores/user', () => ({
  useUserStore: vi.fn(() => mockUserStore),
}));

const mockAuthStore = { setToken: vi.fn() };
vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(() => mockAuthStore),
}));

vi.mock('@/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('LoginComponent', () => {
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
    vi.resetAllMocks();
  });

  it('renders the component properly', () => {
    expect(wrapper.find('.tw-heading').text()).toBe('Login');
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('shows validation errors for empty inputs after blur', async () => {
    const usernameInput = wrapper.find('input#username-email');
    const passwordInput = wrapper.find('input#password');

    await usernameInput.trigger('blur');
    await passwordInput.trigger('blur');

    expect(wrapper.find('.tw-input-error-label').exists()).toBe(true);
  });

  it('validates form submission without filling inputs', async () => {
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');

    const errors = wrapper.findAll('.tw-input-error-label');
    expect(errors.length).toBe(2);
  });

  it('tests password visibility toggle button', async () => {
    const passwordInput = wrapper.find('input#password');
    const toggleButton = wrapper.find('#toggle-password-visibility');

    expect(passwordInput.attributes('type')).toBe('password');

    await toggleButton.trigger('click');
    expect(passwordInput.attributes('type')).toBe('text');

    await toggleButton.trigger('click');
    expect(passwordInput.attributes('type')).toBe('password');
  });

  it('calls the API and stores user and token on success', async () => {
    const mockPayload = { username: 'testuser', password: 'password123' };
    const mockResponse = {
      data: {
        token: 'mock-token',
        user: {
          id: '123',
          email: 'test@example.com',
          username: 'testuser',
          address: null,
          role: 'user',
        },
      },
    };

    apiClient.post.mockResolvedValue(mockResponse);

    const result = await authenticationService.login(mockPayload);

    expect(apiClient.post).toHaveBeenCalledWith('/user/login', mockPayload);

    expect(mockUserStore.setUser).toHaveBeenCalledWith(mockResponse.data.user);
    expect(mockAuthStore.setToken).toHaveBeenCalledWith(mockResponse.data.token);

    expect(result).toEqual(mockResponse);
  });

});
