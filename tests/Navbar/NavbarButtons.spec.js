import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import NavbarButtons from '@/components/navbar/NavbarButtons.vue';

const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('Navbar', () => {
  let wrapper;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    wrapper = mount(NavbarButtons, {
      global: {
        plugins: [pinia],
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('toggles account dropdown on button click', async () => {
    const accountButton = wrapper.find('#account-button');
    await accountButton.trigger('click');

    expect(wrapper.vm.accountDropdownOpen).toBe(true);

    await accountButton.trigger('click');
    expect(wrapper.vm.accountDropdownOpen).toBe(false);
  });

  it('toggles theme dropdown on button click', async () => {
    const themeButton = wrapper.find('#theme-button');
    await themeButton.trigger('click');

    expect(wrapper.vm.themeDropdownOpen).toBe(true);

    await themeButton.trigger('click');
    expect(wrapper.vm.themeDropdownOpen).toBe(false);
  });

  it('closes dropdowns when clicking outside', async () => {
    wrapper.vm.accountDropdownOpen = true;
    wrapper.vm.themeDropdownOpen = true;
    await wrapper.vm.$nextTick();

    const clickEvent = new MouseEvent('click', { bubbles: true });
    document.dispatchEvent(clickEvent);

    expect(wrapper.vm.accountDropdownOpen).toBe(false);
    expect(wrapper.vm.themeDropdownOpen).toBe(false);
  });

  it('applies selected theme when a theme option is clicked', async () => {
    const themeButton = wrapper.find('#theme-button');
    await themeButton.trigger('click');

    const lightThemeOption = wrapper.find('#light-option');
    await lightThemeOption.trigger('click');

    expect(wrapper.vm.selectedTheme).toBe('light');
    expect(window.localStorage.getItem('SELECTED_THEME')).toBe('light');
    expect(document.body.classList.contains('dark')).toBe(false);

    await themeButton.trigger('click');
    const darkThemeOption = wrapper.find('#dark-option');
    await darkThemeOption.trigger('click');

    expect(wrapper.vm.selectedTheme).toBe('dark');
    expect(window.localStorage.getItem('SELECTED_THEME')).toBe('dark');
    expect(document.body.classList.contains('dark')).toBe(true);
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
  });
});
