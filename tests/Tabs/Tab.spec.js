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
  
  beforeEach(() => {
    wrapper = mount(Tab);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
});
