import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import LoginComponent from '@/components/LoginComponent.vue'

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

  // TODO just a test case
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
});
