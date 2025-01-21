/*
import {mount} from '@vue/test-utils';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import RequestList from "@/components/RequestList.vue";


const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));


describe('RequestEntry', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(RequestList, {
        global: {
          stubs: ['router-link', 'font-awesome-icon'],
        },
        props: {
          requests: [
            {
                from: "User1",
                to: "User2",
                for: "Lending",
                place: "-",
                date: '-',
                book: {
                    title: 'The Forgotten Forest',
                    year: '2015',
                    author: 'Alice Morningstar',
                    publisher: 'Whispering Pines',
                    format: 'Paperback',
                    language: 'EN',
                    ISBN: '1122334455',
                    owner: 'Owner1',
                    lat: 46.617415,
                    long: 14.263625,
                }
            },
            {
                from: "User3",
                to: "User2",
                for: "Lending",
                place: "-",
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
                }
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


    it("closes dropdown when clicking outside", async () => {
      wrapper.vm.dropdownSortOpen = true;
      await wrapper.vm.$nextTick();

      const clickEvent = new MouseEvent("click", {bubbles: true});
      document.dispatchEvent(clickEvent);

      expect(wrapper.vm.dropdownSortOpen).toBe(false);
    });

    it("incoming is false", async () => {
      expect(wrapper.vm.incoming).toBe(false);
    });
  });
  */
