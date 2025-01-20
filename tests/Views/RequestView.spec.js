import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import RequestView from '@/views/RequestView.vue';

describe('RequestView', () => {
  it('renders the main layout with stubbed child components', () => {
    const wrapper = mount(RequestView, {
      global: {
        stubs: {
          Footer: true,
          Navbar: true,
          Requests: true,
        },
      },
    });

    expect(wrapper.find('.tw-page-container').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Requests' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true);
    expect(wrapper.find('.tw-footer-margin').exists()).toBe(true);
  });
});
