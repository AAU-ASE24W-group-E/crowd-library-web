import {mount} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import RegisterComponent from "@/components/RegisterComponent.vue";

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
});
