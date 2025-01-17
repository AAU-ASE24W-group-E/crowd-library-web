import { mount } from '@vue/test-utils';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LoginComponent from '@/components/LoginComponent.vue';
import { createPinia, setActivePinia } from 'pinia';
import { authenticationService } from '@/services/AuthenticationService';
import { userApiService } from '@/services/clients.js';

// Mock Vue Router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));


const mockUserStore = { setUser: vi.fn() };
vi.mock('@/stores/user', () => ({
  useUserStore: () => mockUserStore,
}));

const mockAuthStore = { setToken: vi.fn() };

vi.mock('@/stores/auth', () => ({
  useAuthStore: vi.fn(() => mockAuthStore),
}));

vi.mock('@/api', () => ({
  default: {
    post: vi.fn(), // Mock für die Methode `post`
  },
}));

describe('LoginComponent', () => {
  let wrapper;
  let pinia;

  beforeEach(() => {
    vi.clearAllMocks();

    pinia = createPinia();
    setActivePinia(pinia);

    wrapper = mount(LoginComponent, {
      global: {
        plugins: [pinia],
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

  it('testing password visibility toggle button', async () => {
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
          password: 'password123',
          address: null,
          role: 'user',
        },
      },
    };

    userApiService.post.mockResolvedValue(mockResponse);

    console.log(mockAuthStore);

    const result = await authenticationService.login(mockPayload);

    expect(userApiService.post).toHaveBeenCalledWith(`${authenticationService.subdomain}/login`, mockPayload);

    expect(mockUserStore.setUser).toHaveBeenCalledWith(mockResponse.data.user);
    expect(mockAuthStore.setToken).toHaveBeenCalledWith(mockResponse.data.token);

    expect(result).toEqual(mockResponse);
  });



  it('shows "This user could not be found" if UserNotFoundException is thrown', async () => {
    vi.spyOn(authenticationService, 'login').mockRejectedValueOnce({
      response: {
        data: { type: 'UserNotFoundException' },
      },
    });

    const snackbarSpy = vi.spyOn(Snackbar, 'showSnackbar');
    await fillAndSubmitLoginForm()

    expect(snackbarSpy).toHaveBeenCalledWith(
      'This user could not be found',
      SnackbarType.ERROR,
    );

    // expect(push).not.toHaveBeenCalled();
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it('shows "Invalid Password" if InvalidPasswordException is thrown', async () => {
    vi.spyOn(authenticationService, 'login').mockRejectedValueOnce({
      response: {
        data: { type: 'InvalidPasswordException' },
      },
    });

    const snackbarSpy = vi.spyOn(Snackbar, 'showSnackbar');
    await fillAndSubmitLoginForm()

    expect(snackbarSpy).toHaveBeenCalledWith(
      'Wrong password, try again',
      SnackbarType.ERROR,
    );

    // expect(push).not.toHaveBeenCalled();
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it('shows "Unexpected Error" if other exception is thrown', async () => {
    vi.spyOn(authenticationService, 'login').mockRejectedValueOnce({
      response: {
        data: { type: 'OtherException' },
      },
    });

    const snackbarSpy = vi.spyOn(Snackbar, 'showSnackbar');
    await fillAndSubmitLoginForm()

    expect(snackbarSpy).toHaveBeenCalledWith(
      'An unexpected error occurred, check console',
      SnackbarType.ERROR,
    );

    // expect(push).not.toHaveBeenCalled();
    expect(wrapper.vm.isLoading).toBe(false);
  });

  async function fillAndSubmitLoginForm(usernameOrEmail = 'someuser', password = 'somepassword') {
    await wrapper.find('#username-email').setValue(usernameOrEmail)
    await wrapper.find('#password').setValue(password)

    await wrapper.find('form').trigger('submit.prevent')
  }
});
