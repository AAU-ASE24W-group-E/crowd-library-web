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

  beforeEach(() => {
    wrapper = mount(Tabs);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
});
