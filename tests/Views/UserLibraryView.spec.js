import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import UserLibraryView from '@/views/UserLibraryView.vue';

describe('UserLibraryView', () => {
  it('renders the main layout with stubbed child components', () => {
    const wrapper = mount(UserLibraryView, {
      global: {
        stubs: {
          Footer: true,
          Navbar: true,
          UserLibrary: true,
        },
      },
    });

    expect(wrapper.find('.tw-page-container').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Navbar' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'UserLibrary' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true);
    expect(wrapper.find('.tw-footer-margin').exists()).toBe(true);
  });
});
