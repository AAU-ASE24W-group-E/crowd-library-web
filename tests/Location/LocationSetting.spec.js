import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { userService } from '@/services/UserService.ts';
import router from '@/router/index.ts';
import LocationSetting from '@/components/LocationSetting.vue';
import { createPinia, setActivePinia } from 'pinia'

vi.mock('@/services/AuthenticationService.ts', () => ({
  authenticationService: {
    setInitialLogin: vi.fn(),
  },
}));

vi.mock('@/services/UserService.ts', () => ({
  userService: {
    setLocation: vi.fn(),
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

describe('LocationSetting.vue', () => {
  let wrapper;
  let pinia;

  const createComponent = () => {
    wrapper = mount(LocationSetting, {
      global: {
        plugins: [pinia],
        stubs: {
          LocationSelectionMap: {
            template: '<div class="test-map" />',
          },
        },
      },
    });
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    createComponent();

  });

  afterEach(() => {
    vi.clearAllMocks();
    wrapper.unmount();
  });

  it('renders the component properly', () => {
    expect(wrapper.find('.tw-heading').text()).toBe('Your Location');
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('disables the "Finish" button if no location is selected', async () => {
    const finishButton = wrapper.find('#finish-button');
    expect(finishButton.attributes('disabled')).toBeDefined();

    wrapper.vm.selectedLocation = { lat: 12, lng: 34 };
    await wrapper.vm.$nextTick();

    expect(finishButton.attributes('disabled')).toBeUndefined();
  });


  it('calls skipLocationSetting when "Skip" is clicked', async () => {
    const skipButton = wrapper.find('#skip-button');
    await skipButton.trigger('click');

    expect(router.push).toHaveBeenCalledWith('/');
  });

  it('ensures no location is set when "Finish" is clicked without data', async () => {
    const finishButton = wrapper.find('#finish-button');
    await finishButton.trigger('click');

    expect(userService.setLocation).not.toHaveBeenCalled();
  });

  it('handles location setting successfully with a valid location', async () => {
    wrapper.vm.selectedLocation = { lat: 12, lng: 34 };
    await wrapper.vm.$nextTick();

    const finishButton = wrapper.find('#finish-button');
    await finishButton.trigger('click');

    expect(userService.setLocation).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith('/');
  });
});
