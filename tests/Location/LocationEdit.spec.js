import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import { Snackbar } from '@/utils/snackbar.ts';
import { SnackbarType } from '@/enums/snackbar.ts';
import { userService } from '@/services/UserService.ts';
import router from '@/router/index.ts';
import LocationEdit from '@/components/LocationEdit.vue';

vi.mock('@/services/UserService.ts', () => ({
  userService: {
    updateLocation: vi.fn(),
  },
}));

vi.mock('@/router/index.ts', () => ({
  default: {
    push: vi.fn(),
  },
}));

vi.mock('@/utils/snackbar.ts', () => ({
  Snackbar: {
    showSnackbar: vi.fn(),
  },
}));

describe('LocationEdit.vue', () => {
  let wrapper;

  const createComponent = () => {
    wrapper = mount(LocationEdit, {
      global: {
        stubs: {
          LocationSelectionMap: {
            template: '<div class="test-map" />',
          },
        },
      },
    });
  };

  beforeEach(() => {
    createComponent();
  });

  afterEach(() => {
    vi.clearAllMocks();
    wrapper.unmount();
  });

  it('renders the component properly', () => {
    expect(wrapper.find('.tw-heading').text()).toBe('Edit Location');
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('disables the "Apply" button if no location is selected', async () => {
    const applyButton = wrapper.find('#apply-button');
    expect(applyButton.attributes('disabled')).toBeDefined();

    wrapper.vm.selectedLocation = { lat: 12, lng: 34 };
    await wrapper.vm.$nextTick();

    expect(applyButton.attributes('disabled')).toBeUndefined();
  });

  it('calls cancelLocationSetting when "Cancel" is clicked', async () => {
    const cancelButton = wrapper.find('#cancel-button');
    await cancelButton.trigger('click');

    expect(router.push).toHaveBeenCalledWith('/');
  });

  it('expects that update location is not called when not entering location', async () => {
    const applyButton = wrapper.find('#apply-button');
    await applyButton.trigger('click');

    expect(userService.updateLocation).not.toHaveBeenCalled();
  });

  it('handles location edit successfully with a valid location', async () => {
    wrapper.vm.selectedLocation = { lat: 12, lng: 34 };
    await wrapper.vm.$nextTick();

    const applyButton = wrapper.find('#apply-button');
    await applyButton.trigger('click');

    expect(userService.updateLocation).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith('/login');
  });
});
