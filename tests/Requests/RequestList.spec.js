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

const mockRequest = {
  lending: {
    id: '1111',
    lendingMeeting: {
      deadline: 111,
      meetingLocation: '-',
      meetingTime: 1111,
      status: 'CREATED',
    },
  },
  book: {
    data: {
      coverId: '123',
      format: 'HARDCOVER',
      languages: ['en'],
      publisher: '-',
      title: 'Cool title',
    },
  },
  user: {
    data: {
      username: '11',
    },
  },
};



describe('RequestEntry', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(RequestList, {
        global: {
          stubs: ['router-link', 'font-awesome-icon'],
        },
        props: {
          requests: mockRequest
        }
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
