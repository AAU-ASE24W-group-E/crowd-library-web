import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import AccountView from '@/views/AccountView.vue';

describe('AccountView', () => {
  it('renders the main layout with stubbed child components', () => {
    const wrapper = mount(AccountView, {
      global: {
        stubs: {
          Footer: true,
          Navbar: true,
          AccountComponent: true,
        },
      },
    });

    expect(wrapper.find('.tw-page-container').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'AccountComponent' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true);
    expect(wrapper.find('.tw-footer-margin').exists()).toBe(true);
  });
});
