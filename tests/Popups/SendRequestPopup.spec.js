import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SendRequestPopup from '@/components/SendRequestPopup.vue';

const push = vi.fn();

function checkButton(button, text) {
  expect(button.exists()).toBe(true);
  expect(button.text()).toBe(text);
}

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
          isGiftable: true
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
    expect(wrapper.find('label[for=request-purpose]').exists()).toBe(true);
    expect(wrapper.find('label[for=request-purpose]').text()).toBe("I want to request this book for ...");

    // Check the buttons and their text
    checkButton(wrapper.find('#closeBtn'), 'X');
    checkButton(wrapper.find('#cancelBtn'), 'Cancel');
    checkButton(wrapper.find('#requestBookBtn'), 'Request Book');

    // Check dropdown (select box)
    const selectBox = wrapper.find('#request-purpose');
    expect(selectBox.exists()).toBe(true);
    const options = wrapper.findAll('option');
    expect(options.length).toBe(3);
  });

  it('changes the options based on what is selected', async () => {
    await wrapper.vm.show();
    expect(wrapper.find('option[value=lending]').exists()).toBe(true);
    expect(wrapper.find('option[value=exchanging]').exists()).toBe(true);
    expect(wrapper.find('option[value=gifting]').exists()).toBe(true);

    await wrapper.setProps({
      book: {
        isLendable: false,
        isExchangeable: true,
        isGiftable: false,
      },
    });

    expect(wrapper.find('option[value=lending]').exists()).toBe(false);
    expect(wrapper.find('option[value=exchanging]').exists()).toBe(true);
    expect(wrapper.find('option[value=gifting]').exists()).toBe(false);
  });

  it('hides popup when close button is clicked', async () => {
    const hideSpy = vi.spyOn(wrapper.vm, 'hide');
    await wrapper.vm.show();
    await wrapper.vm.$nextTick();
    const closeBtn = wrapper.find('#closeBtn');
    await closeBtn.trigger('click');
    expect(hideSpy).toHaveBeenCalled();
  });

  it('hides popup when cancel button is clicked', async () => {
    const hideSpy = vi.spyOn(wrapper.vm, 'hide');
    await wrapper.vm.show();
    await wrapper.vm.$nextTick();
    const cancelBtn = wrapper.find('#cancelBtn');
    await cancelBtn.trigger('click');
    expect(hideSpy).toHaveBeenCalled();
  });

  /** THIS IS ALSO ONLY PRELIMINARY* */
  it('hides popup when request book button is clicked', async () => {
    const hideSpy = vi.spyOn(wrapper.vm, 'hide');
    await wrapper.vm.show();
    await wrapper.vm.$nextTick();
    const requestBookBtn = wrapper.find('#requestBookBtn');
    await requestBookBtn.trigger('click');
    expect(hideSpy).toHaveBeenCalled();
  });
});