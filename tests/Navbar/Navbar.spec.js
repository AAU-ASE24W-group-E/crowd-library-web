import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import Footer from "@/components/Footer.vue";
import LoginComponent from "@/components/LoginComponent.vue";
import Navbar from "@/components/navbar/Navbar.vue";

const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('Navbar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Navbar, {
      global: {
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders the input field", () => {
    const input = wrapper.find("input");
    expect(input.exists()).toBe(true);
  });

  it("renders other navbar components like buttons", () => {
    const buttons = wrapper.findComponent({ name: "NavbarButtons" });
    expect(buttons.exists()).toBe(true);
  });

  it("triggers search when Enter is pressed", async () => {
    const handleSearchSpy = vi.spyOn(wrapper.vm, "handleSearch");
    const input = wrapper.find("input");

    await input.setValue("Some search query");
    await input.trigger("keyup.enter");

    expect(handleSearchSpy).toHaveBeenCalled();
  });

});
