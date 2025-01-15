import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import LoginComponent from '@/components/LoginComponent.vue';
import { Snackbar } from '@/utils/snackbar.ts';
import { authenticationService } from '@/services/AuthenticationService.ts';
import { SnackbarType } from '@/enums/snackbar.ts';

const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('LoginComponent', () => {
  let wrapper;

  beforeEach(() => {
    // Using fake timers to control setTimeout in async functions
    vi.useFakeTimers();

    wrapper = mount(LoginComponent, {
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
    expect(wrapper.find('.tw-heading').text()).toBe('Login');
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('shows validation errors for empty inputs after blur', async () => {
    const usernameInput = wrapper.find('input#username-email');
    const passwordInput = wrapper.find('input#password');

    await usernameInput.trigger('blur');
    await passwordInput.trigger('blur');

    expect(wrapper.find('.tw-input-error-label').text());
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

    expect(push).not.toHaveBeenCalled();
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

    expect(push).not.toHaveBeenCalled();
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

    expect(push).not.toHaveBeenCalled();
    expect(wrapper.vm.isLoading).toBe(false);
  });

  async function fillAndSubmitLoginForm(usernameOrEmail = 'someuser', password = 'somepassword') {
    await wrapper.find('#username-email').setValue(usernameOrEmail)
    await wrapper.find('#password').setValue(password)

    await wrapper.find('form').trigger('submit.prevent')
  }
});
