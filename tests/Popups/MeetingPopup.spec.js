import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MeetingPopup from '@/components/MeetingPopup.vue';

const push = vi.fn();

function checkInputRendering(wrapper, id, labelText, inputType, hasPlaceholder, placeHolderText) {
  expect(wrapper.find(`label[for="${id}"]`).exists()).toBe(true);
  expect(wrapper.find(`label[for="${id}"]`).text()).toBe(labelText);
  expect(wrapper.find(`input[id="${id}"]`).exists()).toBe(true);
  expect(wrapper.find(`input[id="${id}"]`).element.type).toBe(inputType);
  if(hasPlaceholder){
    expect(wrapper.find(`input[id="${id}"]`).element.placeholder).toBe(placeHolderText);
  }
}


vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('MeetingPopup', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MeetingPopup, {
      props: {
        request: {
          from: 'User1',
        }
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders popup correctly', async () => {
    // Make the popup visible by calling the show method
    await wrapper.vm.show();

    expect(wrapper.find('.popup-overlay').exists()).toBe(true);
    expect(wrapper.find('.popup-content').exists()).toBe(true);
    expect(wrapper.find('h1.title').text()).toBe('Send a Meeting Suggestion to User1');

    // Check buttons and their text
    const closeBtn = wrapper.find('button.popup-close-btn');
    expect(closeBtn.exists()).toBe(true);
    expect(closeBtn.text()).toBe('X');

    const grayBtns = wrapper.findAll('button.btn-primary.btn-gray.rounded-2xl');
    expect(grayBtns.length).toBe(1);
    expect(grayBtns.at(0).text()).toBe('Cancel');

    const greenBtns = wrapper.findAll('button.btn-primary.btn-green.rounded-2xl');
    expect(greenBtns.length).toBe(1);
    expect(greenBtns.at(0).text()).toBe('Send Meeting Request');

    // Check place label and input
    checkInputRendering(wrapper, "place", "Place", "text", true, "Enter place");

    // Check date label and input
    checkInputRendering(wrapper, "date", "Date", "date", false, null);

    // Check deadline label and input
    checkInputRendering(wrapper, "deadline", "Deadline", "date", false, null);
  });
});