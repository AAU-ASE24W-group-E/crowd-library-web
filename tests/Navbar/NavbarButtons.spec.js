import {mount} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import NavbarButtons from "@/components/navbar/NavbarButtons.vue";

const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('Navbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(NavbarButtons, {
      global: {
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("toggles account dropdown on button click", async () => {
    const accountButton = wrapper.find("#account-button");
    await accountButton.trigger("click");

    expect(wrapper.vm.dropdownAccountOpen).toBe(true);

    await accountButton.trigger("click");
    expect(wrapper.vm.dropdownAccountOpen).toBe(false);
  });

  it("closes dropdown when clicking outside", async () => {
    wrapper.vm.dropdownAccountOpen = true;
    await wrapper.vm.$nextTick();

    const clickEvent = new MouseEvent("click", { bubbles: true });
    document.dispatchEvent(clickEvent);

    expect(wrapper.vm.dropdownAccountOpen).toBe(false);
  });
});
