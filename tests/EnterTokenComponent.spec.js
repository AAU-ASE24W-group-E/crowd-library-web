import { mount } from '@vue/test-utils';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import EnterTokenComponent from '@/components/EnterTokenComponent.vue';
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
vi.spyOn(Snackbar, 'showSnackbar');

// Mock Authentication Service
vi.mock('@/services/AuthenticationService.ts', () => ({
  authenticationService: {
    resetPassword: vi.fn(),
  },
}));

describe('EnterTokenComponent', () => {
  let wrapper;
  let pinia;
  const mockRouter = useRouter();

  beforeEach(() => {
    vi.clearAllMocks();

    pinia = createPinia();
    setActivePinia(pinia);

    wrapper = mount(EnterTokenComponent, {
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
  });

  it('shows validation errors for empty inputs after blur', async () => {
    const tokenInput = wrapper.find('input#token');
    const passwordInput = wrapper.find('input#password');

    await tokenInput.trigger('blur');
    await passwordInput.trigger('blur');

    const errors = wrapper.findAll('.tw-input-error-label');
    expect(errors.length).toBe(2);
    expect(errors[0].text()).toBe('This field is required');
    expect(errors[1].text()).toBe('This field is required');
  });

  it('validates form submission without filling inputs', async () => {
    const form = wrapper.find('form');
    await form.trigger('submit.prevent');

    const errors = wrapper.findAll('.tw-input-error-label');
    expect(errors.length).toBe(2);
  });
  it('clicks the reset button', async () => {
    const button = wrapper.find('button');
    await button.trigger('click');

    console.log('Reset button clicked');
  });
});
