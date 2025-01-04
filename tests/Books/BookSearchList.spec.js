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

  it("adds and then removes a category correctly", async () => {
    // Ensure initial state
    expect(wrapper.vm.selectedCategories).toHaveLength(0);
    expect(wrapper.vm.categories).toContain("Title");

    // Simulate adding a category
    const selectElement = wrapper.find("#version-category");
    await selectElement.setValue("Title");
    await selectElement.trigger("change"); // Trigger the change event

    // Wait for the DOM to update
    await wrapper.vm.$nextTick();

    // Assert that the category has been added to selectedCategories
    expect(wrapper.vm.selectedCategories).toContain("Title");
    expect(wrapper.vm.categories).not.toContain("Title");

    // Find the 'x' icon for the added category
    const removeButton = wrapper.find("#remove-category");
    expect(removeButton.exists()).toBe(true); // Ensure the button exists

    // Trigger the click event to remove the category
    await removeButton.trigger("click");

    // Wait for the DOM to update
    await wrapper.vm.$nextTick();

    // Assert that the category has been removed from selectedCategories
    expect(wrapper.vm.selectedCategories).not.toContain("Title");
    expect(wrapper.vm.categories).toContain("Title");
  });


});
