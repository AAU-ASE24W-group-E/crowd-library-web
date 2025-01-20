import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import RegisterView from '@/views/RegisterView.vue';

describe('RegisterView', () => {
  it('renders the main layout with stubbed child components', () => {
    const wrapper = mount(RegisterView, {
      global: {
        stubs: {
          RegisterComponent: true,
        },
      },
    });

    expect(wrapper.find('.tw-page-container').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'RegisterComponent' }).exists()).toBe(true);
  });
});
