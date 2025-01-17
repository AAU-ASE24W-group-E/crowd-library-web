import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import MeetingPopup from "@/components/MeetingPopup.vue";


const push = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}));


describe('MeetingPopup', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MeetingPopup, {
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
          }
        ]
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
});
