import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Tab from '@/components/Tab.vue';

const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('Tab', () => {
  let wrapper;
  let mockTabsComponent;

  beforeEach(() => {
    // Mock parent (=Tabs) component 
    mockTabsComponent = {
      activeTab: 0, // Initially the first tab should be active
      tabs: [],
      registerTab(tab) {
        this.tabs.push(tab);
      },
      activateTab(index) {
        this.activeTab = index;
        console.log("Activate called");
      }
    };

    wrapper = mount(Tab, {
      props: {
        name: 'mockTab1',
        title: 'Mock Tab 1'
      },
      global: {
        provide: {
          $parent: mockTabsComponent
        }
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should activate the first tab by default', async () => {
    expect(mockTabsComponent.activeTab).toBe(0); // Ensure the first tab is active initially
    console.log(wrapper.html());
  });
});
