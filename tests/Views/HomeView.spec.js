import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';

describe('HomeView', () => {
  it('renders the main layout with stubbed child components', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          Footer: true,
          Navbar: true,
          HomeComponent: true,
        },
      },
    });

    expect(wrapper.find('.tw-page-container').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'HomeComponent' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true);
    expect(wrapper.find('.tw-footer-margin').exists()).toBe(true);
  });
});
