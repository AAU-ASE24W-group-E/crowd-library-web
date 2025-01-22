import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SendRequestPopup from '@/components/SendRequestPopup.vue';
import { createPinia, setActivePinia } from 'pinia';

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
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    wrapper = mount(SendRequestPopup, {
      plugins: [pinia],
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
    expect(wrapper.find('h1.popup-title').text()).toBe('Send a request to the owner?');
    expect(wrapper.find('span.dark\\:text-dark-mode-text').text()).toBe(
      'Are you sure that you want to send a request to get this book?'
    );

    // Check the buttons and their text
    checkButton(wrapper.find('#closeBtn'), 'X');
    checkButton(wrapper.find('#cancelBtn'), 'Cancel');
    checkButton(wrapper.find('button[type="submit"]'), 'Request Book');
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

  it('displays loading animation when submitting', async () => {
    await wrapper.vm.show();

    wrapper.vm.isLoading = true;
    await wrapper.vm.$nextTick();

    const submitButton = wrapper.find('button[type="submit"]');
    expect(submitButton.find('.tw-loading-animation').exists()).toBe(true);
  });

});
