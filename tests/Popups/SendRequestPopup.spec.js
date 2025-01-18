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
          owner: "User1",
          isLendable: true,
          isExchangeable: true,
          isGiftable: false
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
    const closeBtn = wrapper.find('button.popup-close-btn');
    expect(closeBtn.exists()).toBe(true);
    expect(closeBtn.text()).toBe('X');

    const grayBtns = wrapper.findAll('button.btn-primary.btn-gray.rounded-2xl');
    expect(grayBtns.length).toBe(1);
    expect(grayBtns.at(0).text()).toBe('Cancel');

    const greenBtns = wrapper.findAll('button.btn-primary.btn-green.rounded-2xl');
    expect(greenBtns.length).toBe(1);
    expect(greenBtns.at(0).text()).toBe('Request Book');
  });
});