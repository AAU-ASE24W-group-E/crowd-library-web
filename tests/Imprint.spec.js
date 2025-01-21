import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Imprint from '@/components/Imprint.vue';

describe('Imprint', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Imprint, {});
  });

  it('renders the Disclaimer section correctly', () => {
    expect(wrapper.text()).toContain('Disclaimer');
    expect(wrapper.text()).toContain('The information provided on this website is for general informational purposes only');
  });

  it('renders the Copyright section correctly', () => {
    expect(wrapper.text()).toContain('Copyright');
    expect(wrapper.text()).toContain('All content on this website, including text, graphics, and logos, is the intellectual property');
  });
});
