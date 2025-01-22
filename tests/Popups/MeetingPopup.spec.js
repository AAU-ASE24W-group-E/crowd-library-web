import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MeetingPopup from '@/components/MeetingPopup.vue';

const push = vi.fn();

function checkInputRendering(wrapper, id, labelText, inputType, hasPlaceholder, placeHolderText) {
  expect(wrapper.find(`label[for="${id}"]`).exists()).toBe(true);
  expect(wrapper.find(`label[for="${id}"]`).text()).toBe(labelText);
  expect(wrapper.find(`input[id="${id}"]`).exists()).toBe(true);
  expect(wrapper.find(`input[id="${id}"]`).element.type).toBe(inputType);
  if (hasPlaceholder) {
    expect(wrapper.find(`input[id="${id}"]`).element.placeholder).toBe(placeHolderText);
  }
}

function checkButton(button, text) {
  expect(button.exists()).toBe(true);
  expect(button.text()).toContain(text);
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
          user: {
            data: {
              username: 'User1',
            },
          },
          lending: {
            id: 123,
          },
        },
      },
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
    expect(wrapper.find('h1.popup-title').text()).toBe('Send a Meeting Suggestion to User1?');

    // Check buttons and their text
    checkButton(wrapper.find('#closeBtn'), 'X');
    checkButton(wrapper.find('#cancelBtn'), 'Cancel');
    checkButton(wrapper.find('#sendMeetingReqBtn'), 'Send Meeting Request');

    // Check labels and their input
    checkInputRendering(wrapper, "location", "Location", "text", true, "Enter location");
    checkInputRendering(wrapper, "date", "Date", "date", false, null);
    checkInputRendering(wrapper, "deadline", "Deadline", "date", false, null);
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

  it('validates form and displays errors on blur', async () => {
    await wrapper.vm.show();
    const locationInput = wrapper.find('#location');

    // Trigger blur without entering a value
    await locationInput.trigger('blur');

    // Check if the error message is displayed
    expect(wrapper.find('.tw-input-error-label').exists()).toBe(true);
    expect(wrapper.find('.tw-input-error-label').text()).toBe('This field is required');
  });

  it('displays error message when form validation fails', async () => {
    await wrapper.vm.show();
    const submitButton = wrapper.find('button[type="submit"]');

    // Attempt to submit without filling required fields
    await submitButton.trigger('click');

    // Check if the error message is displayed
    expect(wrapper.find('.tw-input-error-label').exists()).toBe(true);
    expect(wrapper.find('.tw-input-error-label').text()).toBe('This field is required');
  });
});
