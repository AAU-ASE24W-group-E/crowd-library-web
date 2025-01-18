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
    expect(wrapper.find("label[for=request-purpose]").exists()).toBe(true);
    expect(wrapper.find("label[for=request-purpose]").text()).toBe("I want to request this book for ...");

    // Check the buttons and their text
    expect(wrapper.find('button.popup-close-btn').exists()).toBe(true);
    expect(wrapper.find('button.popup-close-btn').text()).toBe('X');
    expect(wrapper.findAll('button.btn-primary.btn-gray.rounded-2xl').length).toBe(1);
    expect(wrapper.find('button.btn-primary.btn-gray.rounded-2xl').text()).toBe('Cancel');
    expect(wrapper.findAll('button.btn-primary.btn-green.rounded-2xl').length).toBe(1);
    expect(wrapper.find('button.btn-primary.btn-green.rounded-2xl').text()).toBe('Request Book');
  });
});