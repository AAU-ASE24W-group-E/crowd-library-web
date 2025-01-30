import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils';
import EnterTokenView from '@/views/EnterTokenView.vue'
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));
describe('EnterTokenView', () => {
  it('renders the main layout with stubbed child components', () => {
    const wrapper = mount(EnterTokenView, {
      global: {
        stubs: {
          LoginComponent: true,
        },
      },
    });

    expect(wrapper.find('.tw-page-container').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'EnterTokenComponent' }).exists()).toBe(true);
  });
});
