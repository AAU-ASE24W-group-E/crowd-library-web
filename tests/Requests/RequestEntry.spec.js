/*
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
  from: 'User3',
  to: 'User2',
  for: 'Lending',
  place: '-',
  date: '-',
  book: {
    title: 'Whispers of the Sea',
    year: '2020',
    author: 'John Saltsworth',
    publisher: 'Ocean Breeze Press',
    format: 'Hardcover',
    language: 'EN',
    ISBN: '2233445566',
    owner: 'Owner2',
    lat: 46.619025,
    long: 14.265755,
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
    expect(wrapper.text()).toContain('Request for Lending (by User3)');
    expect(wrapper.text()).toContain('Publisher: Ocean Breeze Press');
    expect(wrapper.text()).toContain('Format: Hardcover');
    expect(wrapper.text()).toContain('Language: EN');
    expect(wrapper.text()).toContain('ISBN: 2233445566');
    expect(wrapper.text()).toContain('Date: -');
    expect(wrapper.text()).toContain('Place: -');
  });

  /!* max-h-0: when dropdown is closed
     max-h-40: when dropdown is opened *!/
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

  // Check that buttons are not visible when dropdown is closed
  it('does not render the buttons when dropdown is closed for incoming requests', async() => {
    const declineBtn = wrapper.find('#declineBtn');
    const suggestMeetingBtn = wrapper.find('#suggestMeetingBtn');
    expect(declineBtn.isVisible()).toBe(false);
    expect(suggestMeetingBtn.isVisible()).toBe(false);
  });

  it('does not render the withdraw button when dropdown is closed for outgoing requests', async() => {
    await wrapper.setProps({ incoming: false });
    const withdrawBtn = wrapper.find('#withdrawBtn');
    expect(withdrawBtn.isVisible()).toBe(false);
  });

  // Check that buttons are visible on click of dropdown
  it('renders the buttons when dropdown is open for incoming requests', async() => {
    // Trigger click action
    await wrapper.find('.tw-component-container').trigger('click');
    const declineBtn = wrapper.find('#declineBtn');
    const suggestMeetingBtn = wrapper.find('#suggestMeetingBtn');
    const withdrawBtn = wrapper.find('#withdrawBtn');
    expect(declineBtn.exists()).toBe(true);
    expect(declineBtn.text()).toBe("Decline");
    expect(suggestMeetingBtn.exists()).toBe(true);
    expect(suggestMeetingBtn.text()).toBe("Suggest Meeting");
    expect(declineBtn.isVisible()).toBe(true);
    expect(suggestMeetingBtn.isVisible()).toBe(true);
    expect(withdrawBtn.exists()).toBe(false);
  });

  it('renders the withdraw button when dropdown is open for outgoing requests', async() => {
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
    expect(withdrawBtn.text()).toBe("Withdraw");
  });
});
*/
