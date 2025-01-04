import {mount} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import BookSearchList from "@/components/BookSearchList.vue";
import BookEntry from "@/components/BookEntry.vue";


const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('BookEntry', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(BookSearchList, {
      global: {
        stubs: ['router-link', 'font-awesome-icon'],
      },
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("cleans up event listeners on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("click", expect.any(Function));
  });

  it("filters books based on selected categories", async () => {
    await wrapper.vm.selectedCategories.push("Distance");
    await wrapper.vm.handleSelection({ target: { value: "Distance" } });

    expect(wrapper.vm.selectedCategories).toContain("Distance");
    expect(wrapper.vm.books).toBeTruthy();
  });

  it("closes dropdown when clicking outside", async () => {
    wrapper.vm.dropdownSortOpen = true;
    await wrapper.vm.$nextTick();

    const clickEvent = new MouseEvent("click", { bubbles: true });
    document.dispatchEvent(clickEvent);

    expect(wrapper.vm.dropdownSortOpen).toBe(false);
  });

  it("toggles dropdown when the sort button is clicked", async () => {
    const sortButton = wrapper.find("#sort-button");
    expect(wrapper.vm.dropdownSortOpen).toBe(false);

    await sortButton.trigger("click");
    expect(wrapper.vm.dropdownSortOpen).toBe(true);

    await sortButton.trigger("click");
    expect(wrapper.vm.dropdownSortOpen).toBe(false);
  });
});
