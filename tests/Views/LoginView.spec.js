import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import LoginView from '@/views/LoginView.vue';

describe('LoginView', () => {
  it('renders the main layout with stubbed child components', () => {
    const wrapper = mount(LoginView, {
      global: {
        stubs: {
          LoginComponent: true,
        },
      },
    });

    expect(wrapper.find('.tw-page-container').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'LoginComponent' }).exists()).toBe(true);
  });
});
