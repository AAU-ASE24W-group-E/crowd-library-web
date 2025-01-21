import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it } from 'vitest';
import HomeComponent from '@/components/HomeComponent.vue';

describe('HomeComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HomeComponent, {});
  });

  it('renders the Welcome section correctly', () => {
    expect(wrapper.text()).toContain('Welcome to Crowd Library!');
    expect(wrapper.text()).toContain('Your community-powered resource for sharing knowledge and ideas.');
  });

  it('renders the About section correctly', () => {
    expect(wrapper.text()).toContain('About Us');
    expect(wrapper.text()).toContain('Crowd Library is a collaborative platform where individuals can contribute, share, and explore a wide variety of resources.');
  });
});
