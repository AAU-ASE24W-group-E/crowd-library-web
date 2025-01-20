import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';

const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('Tabs', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Tabs, {
      global: {
        components: {
          Tab,
        },
      },
      slots: {
        default: `
          <Tab name="mockTab1" title="Mock Tab 1" />
          <Tab name="mockTab2" title="Mock Tab 2" />
        `, // Simulate passing Tab components as children
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  /* Ensure the number of rendered elements is correct; only 2 tabs */
  it('create exactly two tabs', async () => {
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

  it('set activeTab correctly', async () => {
    const tabTitles = wrapper.findAll('.tab-title');
    await tabTitles.at(0).trigger('click');
    expect(wrapper.vm.activeTab).toBe(0);
    await tabTitles.at(1).trigger('click');
    expect(wrapper.vm.activeTab).toBe(1);
  });
});
