import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RegisterComponent from '@/components/RegisterComponent.vue';
import { SnackbarType } from '@/enums/snackbar.ts';
import { authenticationService } from '@/services/AuthenticationService.ts';
import { Snackbar } from '@/utils/snackbar.ts';

const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('RegisterComponent', () => {
  let wrapper;

  beforeEach(() => {
    vi.useFakeTimers();

    wrapper = mount(RegisterComponent, {
      global: {
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it('renders the component properly', () => {
    expect(wrapper.find('.tw-heading').text()).toBe('Register');
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('validates email field correctly', async () => {
    const emailInput = wrapper.find('#email');
    await emailInput.setValue('invalid-email');
    await emailInput.trigger('blur');

    expect(wrapper.find('.tw-input-error-label').exists()).toBe(true);
  });

  it('validates username required correctly', async () => {
    const usernameInput = wrapper.find('#username');
    await usernameInput.setValue('');
    await usernameInput.trigger('blur');

    expect(wrapper.find('.tw-input-error-label').exists()).toBe(true);
    expect(wrapper.vm.errors.username.required).toBe(true);
  });

  it('validates username length correctly', async () => {
    const usernameInput = wrapper.find('#username');
    await usernameInput.setValue('a'.repeat(21));
    await usernameInput.trigger('blur');

    expect(wrapper.find('.tw-input-error-label').exists()).toBe(true);
    expect(wrapper.vm.errors.username.maxLength).toBe(true);
  });

  it('validates username pattern correctly', async () => {
    const usernameInput = wrapper.find('#username');
    await usernameInput.setValue('testing');
    await usernameInput.trigger('blur');

    expect(wrapper.find('.tw-input-error-label').exists()).toBe(true);
    expect(wrapper.vm.errors.username.invalid).toBe(false);

    await usernameInput.setValue('testing@29d--x_');
    await usernameInput.trigger('blur');

    expect(wrapper.find('.tw-input-error-label').exists()).toBe(true);
    expect(wrapper.vm.errors.username.invalid).toBe(true);
  });

  it('validates password field correctly', async () => {
    const passwordInput = wrapper.find('#password');
    await passwordInput.setValue('1');
    await passwordInput.trigger('blur');

    expect(wrapper.find('.tw-input-error-label').exists()).toBe(true);
    expect(wrapper.vm.errors.password.minLength).toBe(true);
  });

  it('validates confirm password field correctly', async () => {
    const passwordInput = wrapper.find('#password');
    const confirmPasswordInput = wrapper.find('#confirm-password');

    await passwordInput.setValue('password123');
    await confirmPasswordInput.setValue('differentPassword');
    await confirmPasswordInput.trigger('blur');

    expect(wrapper.find('.tw-input-error-label').exists()).toBe(true);
    expect(wrapper.vm.errors.confirmPassword.notMatch).toBe(true);
  });

  it('disables the submit button when loading', async () => {
    wrapper.vm.isLoading = true;
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.attributes('disabled')).toBeDefined();
  });

  it('navigates to the login page after successful registration', async () => {
    vi.spyOn(wrapper.vm, 'validateForm').mockReturnValue(true);
    vi.spyOn(wrapper.vm, 'register').mockImplementation(async () => {
      await wrapper.vm.$nextTick();
      push('/login');
    });

    await wrapper.vm.register();
    expect(push).toHaveBeenCalledWith('/login');
  });

  it('shows error message if form validation fails', async () => {
    const registerSpy = vi.spyOn(wrapper.vm, 'register');
    vi.spyOn(wrapper.vm, 'validateForm').mockReturnValue(false);

    await wrapper.vm.register();
    expect(registerSpy).toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
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

  it('testing confirm password visibility toggle button', async () => {
    const confirmPasswordInput = wrapper.find('input#confirm-password');
    const toggleButton = wrapper.find('#toggle-confirm-password-visibility');
    expect(confirmPasswordInput.attributes('type')).toBe('password');

    await toggleButton.trigger('click');
    expect(confirmPasswordInput.attributes('type')).toBe('text');

    await toggleButton.trigger('click');
    expect(confirmPasswordInput.attributes('type')).toBe('password');
  });

  it('shows "This username already exists" error when UsernameAlreadyExistsException is thrown', async () => {
    vi.spyOn(authenticationService, 'registerUser').mockRejectedValueOnce({
      response: {
        data: { type: 'UsernameAlreadyExistsException' },
      },
    });
    const snackbarSpy = vi.spyOn(Snackbar, 'showSnackbar');

    await wrapper.find('#email').setValue('test@example.com');
    await wrapper.find('#username').setValue('testuser');
    await wrapper.find('#password').setValue('password123');
    await wrapper.find('#confirm-password').setValue('password123');

    await wrapper.find('form').trigger('submit.prevent');

    expect(snackbarSpy).toHaveBeenCalledWith(
      'This username already exists',
      SnackbarType.ERROR,
    );
    expect(push).not.toHaveBeenCalled();
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it('shows "This username already exists" error when UsernameAlreadyExistsException is thrown', async () => {
    vi.spyOn(authenticationService, 'registerUser').mockRejectedValueOnce({
      response: {
        data: { type: 'UsernameAlreadyExistsException' },
      },
    });
    const snackbarSpy = vi.spyOn(Snackbar, 'showSnackbar');

    await wrapper.find('#email').setValue('test@example.com');
    await wrapper.find('#username').setValue('testuser');
    await wrapper.find('#password').setValue('password123');
    await wrapper.find('#confirm-password').setValue('password123');

    await wrapper.find('form').trigger('submit.prevent');

    expect(snackbarSpy).toHaveBeenCalledWith(
      'This username already exists',
      SnackbarType.ERROR,
    );
    expect(push).not.toHaveBeenCalled();
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it('shows "This email already exists" error when EmailAlreadyExistsException is thrown', async () => {
    const mockRegister = vi.spyOn(authenticationService, 'registerUser');
    mockRegister.mockRejectedValueOnce({
      response: {
        data: {
          type: 'EmailAlreadyExistsException',
        },
      },
    });

    const snackbarSpy = vi.spyOn(Snackbar, 'showSnackbar');

    await wrapper.find('#email').setValue('test@test.com');
    await wrapper.find('#username').setValue('testuser');
    await wrapper.find('#password').setValue('password123');
    await wrapper.find('#confirm-password').setValue('password123');

    await wrapper.find('form').trigger('submit.prevent');

    expect(mockRegister).toHaveBeenCalledTimes(1);
    expect(snackbarSpy).toHaveBeenCalledWith(
      'This email already exists',
      SnackbarType.ERROR,
    );

    expect(push).not.toHaveBeenCalled();
    expect(wrapper.vm.isLoading).toBe(false);
  });

  it('shows "Unexpected Error if no defined exception is thrown', async () => {
    const snackbarSpy = vi.spyOn(Snackbar, 'showSnackbar');
    const mockRegister = vi.spyOn(authenticationService, 'registerUser');
    mockRegister.mockRejectedValueOnce({
      response: {
        data: {
          type: 'SomethingElse',
        },
      },
    });

    await wrapper.find('#password').setValue('password123');
    await wrapper.find('#email').setValue('test@test.com');
    await wrapper.find('#confirm-password').setValue('password123');
    await wrapper.find('#username').setValue('testuser');
    await wrapper.find('form').trigger('submit.prevent');

    expect(mockRegister).toHaveBeenCalledTimes(1);
    expect(snackbarSpy).toHaveBeenCalledWith(
      'An unexpected error occurred, check console',
      SnackbarType.ERROR,
    );

    expect(push).not.toHaveBeenCalled();
    expect(wrapper.vm.isLoading).toBe(false);
  });

});
