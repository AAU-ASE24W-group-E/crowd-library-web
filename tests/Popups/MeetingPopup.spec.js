import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MeetingPopup from '@/components/MeetingPopup.vue';

const push = vi.fn();

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
    expect(wrapper.find('h1.title').text()).toBe('Send a Meeting Suggestion to User1');

    // Check buttons and their text
    expect(wrapper.find('button.popup-close-btn').exists()).toBe(true);
    expect(wrapper.find('button.popup-close-btn').text()).toBe('X');
    expect(wrapper.findAll('button.btn-primary.btn-gray.rounded-2xl').length).toBe(1);
    expect(wrapper.find('button.btn-primary.btn-gray.rounded-2xl').text()).toBe('Cancel');
    expect(wrapper.findAll('button.btn-primary.btn-green.rounded-2xl').length).toBe(1);
    expect(wrapper.find('button.btn-primary.btn-green.rounded-2xl').text()).toBe('Send Meeting Request');

    // Check place label and input
    expect(wrapper.find('label[for="place"]').exists()).toBe(true);
    expect(wrapper.find('label[for="place"]').text()).toBe('Place');
    expect(wrapper.find('input[id="place"]').exists()).toBe(true);
    expect(wrapper.find('input[id="place"]').element.type).toBe('text');
    expect(wrapper.find('input[id="place"]').element.placeholder).toBe('Enter place');

    // Check date label and input
    expect(wrapper.find('label[for="date"]').exists()).toBe(true);
    expect(wrapper.find('label[for="date"]').text()).toBe('Date');
    expect(wrapper.find('input[id="date"]').exists()).toBe(true);
    expect(wrapper.find('input[id="date"]').element.type).toBe('date');

    // Check deadline label and input
    expect(wrapper.find('label[for="deadline"]').exists()).toBe(true);
    expect(wrapper.find('label[for="deadline"]').text()).toBe('Deadline');
    expect(wrapper.find('input[id="deadline"]').exists()).toBe(true);
    expect(wrapper.find('input[id="deadline"]').element.type).toBe('date');
  });
});