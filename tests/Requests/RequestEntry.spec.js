import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import RequestEntry from '@/components/RequestEntry.vue';

const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

const mockRequest = {
  lending: {
    lendingMeeting: {
      deadline: 111,
      meetingLocation: '-',
      meetingTime: 1111,
      status: 'CREATED',
    },
  },
  book: {
    data: {
      coverId: '123',
      format: 'HARDCOVER',
      languages: ['en'],
      publisher: '-',
      title: 'Cool title',
    },
  },
  user: {
    data: {
      username: '11',
    },
  },
};

describe('RequestEntry', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RequestEntry, {
      props: {
        request: mockRequest,
        isWishlist: false,
        incoming: true,
      },
      global: {
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  // Check that all necessary info is rendered
  it('renders the request details correctly', () => {
    expect(wrapper.text()).toContain(`Request by ${mockRequest.user.data.username}`);
  });

  /* max-h-0: when dropdown is closed
     max-h-40: when dropdown is opened */
  it('toggles the dropdown visibility when clicked', async () => {
    // Closed dropdown at first
    expect(wrapper.find('.max-h-0').exists()).toBe(true);
    // Trigger click action
    await wrapper.find('.tw-component-container').trigger('click');
    // Opened dropdown
    expect(wrapper.find('.max-h-40').exists()).toBe(true);
    // Closed after cicking again
    await wrapper.find('.tw-component-container').trigger('click');
    expect(wrapper.find('.max-h-0').exists()).toBe(true);
  });

  it('does not render the withdraw button when dropdown is closed for outgoing requests', async () => {
    await wrapper.setProps({ incoming: false });
    const withdrawBtn = wrapper.find('#withdrawBtn');
    expect(withdrawBtn.isVisible()).toBe(false);
  });

  // Check that buttons are visible on click of dropdown
  it('renders the buttons when dropdown is open for incoming requests', async () => {
    // Trigger click action
    await wrapper.find('.tw-component-container').trigger('click');
    const declineBtn = wrapper.find('#declineBtn');
    const suggestMeetingBtn = wrapper.find('#suggestMeetingBtn');
    expect(declineBtn.exists()).toBe(true);
    expect(declineBtn.text()).toBe('Decline');
    expect(suggestMeetingBtn.exists()).toBe(false);
  });

  it('renders the withdraw button when dropdown is open for outgoing requests', async () => {
    // Trigger click action
    await wrapper.setProps({ incoming: false });
    await wrapper.find('.tw-component-container').trigger('click');
    const declineBtn = wrapper.find('#declineBtn');
    const suggestMeetingBtn = wrapper.find('#suggestMeetingBtn');
    const withdrawBtn = wrapper.find('#withdrawBtn');
    expect(declineBtn.exists()).toBe(false);
    expect(suggestMeetingBtn.exists()).toBe(false);
    expect(withdrawBtn.exists()).toBe(true);
    expect(withdrawBtn.isVisible()).toBe(true);
    expect(withdrawBtn.text()).toBe('Withdraw');
  });
});
