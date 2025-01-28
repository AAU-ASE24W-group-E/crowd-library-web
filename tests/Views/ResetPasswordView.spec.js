import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils';
import ResetPasswordView from '@/views/ResetPasswordView.vue';
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));
describe('ResetPasswordView', () => {
  it('renders the main layout with stubbed child components', () => {
    const wrapper = mount(ResetPasswordView, {
      global: {
        stubs: {
          LoginComponent: true,
        },
      },
    });

    expect(wrapper.find('.tw-page-container').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'ResetPasswordComponent' }).exists()).toBe(true);
  });
});
