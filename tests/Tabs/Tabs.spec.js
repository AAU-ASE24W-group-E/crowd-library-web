import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Tabs from '@/components/Tabs.vue';

const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('Tabs', () => {
  let wrapper;
  let mockActivateTab = vi.fn();
  let mockRegisterTab = vi.fn();

  beforeEach(() => {
    wrapper = mount(Tabs, {
      methods: {
        activateTab: mockActivateTab,
        registerTab: mockRegisterTab,
      },
      data() {
        return {
          tabs: [
            { name: 'mockTab1', title: 'Mock Tab 1' },
            { name: 'mockTab2', title: 'Mock Tab 2' },
          ],
        };
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  /* Ensure the number of rendered elements is correct; only 2 tabs */
  it('create exactly two tabs', async () => {
    //await wrapper.vm.$nextTick();
    /* Use for print debugging */
    //console.log(wrapper.html());
    expect(wrapper.find('.tabs').exists()).toBe(true);
    expect(wrapper.findAll('.tabs').length).toBe(1);
    expect(wrapper.find('.tab-titles').exists()).toBe(true);
    expect(wrapper.findAll('.tab-titles').length).toBe(1);
    expect(wrapper.find('.tab-content').exists()).toBe(true);
    expect(wrapper.findAll('.tab-content').length).toBe(1);
    expect(wrapper.findAll('.tab-title').length).toBe(2);
  });

  it('create correct headers for tabs', async () => {
    const tabTitles = wrapper.findAll('.tab-title');
    expect(tabTitles.at(0).text()).toBe('Mock Tab 1');
    expect(tabTitles.at(1).text()).toBe('Mock Tab 2');
  });
});
