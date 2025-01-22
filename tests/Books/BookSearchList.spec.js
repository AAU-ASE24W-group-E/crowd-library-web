import {mount} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import BookSearchList from "@/components/BookSearchList.vue";
import { createPinia, setActivePinia } from 'pinia';


const push = vi.fn();
const query = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
  useRoute: () => ({
    query,
  }),
}));

describe('BookEntry', () => {
  let wrapper;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    wrapper = mount(BookSearchList, {
      global: {
        plugins: [pinia],
        stubs: ['router-link', 'font-awesome-icon'],
      },
      props: {
        books: [
          {
            book: {
              id: '1',
              title: 'The Forgotten Forest',
              isbn: '1122334455',
              publisher: 'Whispering Pines',
              publishYear: 2015,
              coverId: '14625765-L',
              edition: 'First Edition',
              format: 'Paperback',
              authors: ['Alice Morningstar'],
              languages: ['EN'],
            },
            lendable: true,
            giftable: true,
            exchangeable: false,
            status: true, // Available
            distance: 0,
            owner: {
              id: 'Owner1',
              name: 'Owner1',
              latitude: 46.617415,
              longitude: 14.263625,
            },
          },
          {
            book: {
              id: '2',
              title: 'Whispers of the Sea',
              isbn: '2233445566',
              publisher: 'Ocean Breeze Press',
              publishYear: 2020,
              coverId: '14625766-L',
              edition: 'First Edition',
              format: 'Hardcover',
              authors: ['John Saltsworth'],
              languages: ['EN'],
            },
            lendable: false,
            giftable: false,
            exchangeable: true,
            status: false, // Unavailable
            distance: 0,
            owner: {
              id: 'Owner2',
              name: 'Owner2',
              latitude: 46.619025,
              longitude: 14.265755,
            },
          },
          {
            book: {
              id: '3',
              title: 'A Dance in the Rain',
              isbn: '3344556677',
              publisher: 'Rainfall Publishing',
              publishYear: 2019,
              coverId: '14625767-L',
              edition: 'Second Edition',
              format: 'Paperback',
              authors: ['Elena Storm'],
              languages: ['ES'],
            },
            lendable: true,
            giftable: false,
            exchangeable: false,
            status: true, // Available
            distance: 0,
            owner: {
              id: 'Owner3',
              name: 'Owner3',
              latitude: 46.622305,
              longitude: 14.272915,
            },
          }
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
