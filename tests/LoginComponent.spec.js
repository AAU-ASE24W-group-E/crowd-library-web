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
});
