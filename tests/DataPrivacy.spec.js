import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import DataPrivacy from '@/components/DataPrivacy.vue';

describe('DataPrivacy', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(DataPrivacy, {});
  });

  it('renders the data privacy question correctly', () => {
    expect(wrapper.text()).toContain('What Information Do We Collect?');
  });
});
