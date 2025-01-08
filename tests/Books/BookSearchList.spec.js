import {mount} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import BookSearchList from "@/components/BookSearchList.vue";


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
      props: {
        books: [
          {
            title: "Book1",
            year: "2020",
            author: "Author1",
            publisher: "Publisher1",
            format: "Paperback",
            language: "EN",
            ISBN: "1234567890",
            owner: "Owner1",
            isAvailable: true,
            isLendable: true,
            isExchangeable: false,
            isGiftable: true,
            status: "Available",
          },
          {
            title: "Book2",
            year: "2021",
            author: "Author2",
            publisher: "Publisher2",
            format: "Hardcover",
            language: "FR",
            ISBN: "0987654321",
            owner: "Owner2",
            isAvailable: false,
            isLendable: false,
            isExchangeable: true,
            isGiftable: false,
            status: "Unavailable",
          },
        ] }
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
    await wrapper.vm.handleSelection({target: {value: "Distance"}});

    expect(wrapper.vm.selectedCategories).toContain("Distance");
    expect(wrapper.vm.books).toBeTruthy();
  });

  it("closes dropdown when clicking outside", async () => {
    wrapper.vm.dropdownSortOpen = true;
    await wrapper.vm.$nextTick();

    const clickEvent = new MouseEvent("click", {bubbles: true});
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
    expect(wrapper.vm.selectedCategories).toHaveLength(0);
    expect(wrapper.vm.categories).toContain("Title");

    const selectElement = wrapper.find("#version-category");
    await selectElement.setValue("Title");
    await selectElement.trigger("change");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedCategories).toContain("Title");
    expect(wrapper.vm.categories).not.toContain("Title");

    const removeButton = wrapper.find("#remove-category");
    expect(removeButton.exists()).toBe(true); // Ensure the button exists

    await removeButton.trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedCategories).not.toContain("Title");
    expect(wrapper.vm.categories).toContain("Title");
  });
});
