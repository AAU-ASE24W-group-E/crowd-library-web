import { mount } from '@vue/test-utils';
import ResetPasswordComponent from '@/components/ResetPasswordComponent.vue';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { authenticationService } from '@/services/AuthenticationService.ts';
import { useRouter } from 'vue-router';

// Mock Vue Router
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock Snackbar
vi.mock('@/utils/snackbar.ts', () => ({
  Snackbar: {
    showSnackbar: vi.fn(),
  },
}));

// Mock Authentication Service
vi.mock('@/services/AuthenticationService.ts', () => ({
  authenticationService: {
    requestReset: vi.fn(),
  },
}));

describe('ResetPasswordComponent', () => {
  let wrapper;
  let pinia;
  const mockRouter = useRouter();

  beforeEach(() => {
    vi.clearAllMocks();

    pinia = createPinia();
    setActivePinia(pinia);

    wrapper = mount(ResetPasswordComponent, {
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
    expect(wrapper.find('.tw-heading').text()).toBe('Reset Password');
    expect(wrapper.find('form').exists()).toBe(true);
    expect(wrapper.find('input#email').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Send Reset Link');
  });

  it('shows validation errors for empty input after blur', async () => {
    const emailInput = wrapper.find('input#email');

    await emailInput.trigger('blur');

    const errorLabel = wrapper.find('.tw-input-error-label');
    expect(errorLabel.exists()).toBe(true);
    expect(errorLabel.text()).toBe('This field is required');
  });

  it('validates form submission without filling inputs', async () => {
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');

    const errorLabels = wrapper.findAll('.tw-input-error-label');
    expect(errorLabels.length).toBe(1);
    expect(errorLabels[0].text()).toBe('This field is required');
  });

  it('clicks the send reset link button', async () => {
    const button = wrapper.find('button');
    await button.trigger('click');
    expect(button.exists()).toBe(true)

    console.log('Send Reset Link button clicked');
  });

  it('shows an error snackbar if reset request fails', async () => {
    authenticationService.requestReset.mockRejectedValueOnce(new Error('Error sending reset link'));

    await wrapper.find('input#email').setValue('test@example.com');
    await wrapper.find('form').trigger('submit.prevent');

    expect(Snackbar.showSnackbar).toHaveBeenCalledWith(
      'Failed to send password reset link. Please try again.',
      SnackbarType.ERROR
    );
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('handles validation and does not call API if form is invalid', async () => {
    await wrapper.find('form').trigger('submit.prevent');

    expect(authenticationService.requestReset).not.toHaveBeenCalled();

    const errorLabel = wrapper.find('.tw-input-error-label');
    expect(errorLabel.exists()).toBe(true);
    expect(errorLabel.text()).toBe('This field is required');
  });
});
