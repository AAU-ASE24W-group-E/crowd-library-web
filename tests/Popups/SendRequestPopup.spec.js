import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SendRequestPopup from '@/components/SendRequestPopup.vue';

const push = vi.fn();

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('SendRequestPopup', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SendRequestPopup, {
      props: {
        book: {
          title: 'The Forgotten Forest',
          year: '2015',
          author: 'Alice Morningstar',
          publisher: 'Whispering Pines',
          format: 'Paperback',
          language: 'EN',
          ISBN: '1122334455',
          owner: 'User1',
          lat: 46.617415,
          long: 14.263625,
        }
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders popup correctly when visible', async () => {
    // Make the popup visible by calling the show method
    await wrapper.vm.show();

    expect(wrapper.find('.popup-overlay').exists()).toBe(true);
    expect(wrapper.find('.popup-content').exists()).toBe(true);
    expect(wrapper.find('h1.title').text()).toBe('Send a Request to User1');
  });
});