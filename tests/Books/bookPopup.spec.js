import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getPopupHTML } from '@/utils/bookPopup.ts';

const push = vi.fn();
    vi.mock('vue-router', () => ({
      useRouter: () => ({
        push,
      }),
    }));

describe('bookPopup', () => {
  let valid_book = 
  {
    book: {
        title: "Sample Book",
        year: 2021,
        authors: ["John Doe"],
        publisher: "Sample Publisher",
        format: "Hardcover",
        languages: ["English"],
        ISBN: "123-4567890123",
    },
    owner: {
      name: "Library",
      latitude: 46.617415,
      longitude: 14.263625,
      id: 'Owner1'
    },
    status: "AVAILABLE",
    lendable: true,
    exchangeable: false,
    giftable: true
  };

  it('returns popup with title for valid book', () => {
    const html = getPopupHTML(valid_book)
    expect(html).toContain(valid_book.title)
   });

   it('returns popup with author for valid book', () => {
    const html = getPopupHTML(valid_book)
    expect(html).toContain(valid_book.author)
   });

   it('returns popup with status for valid book', () => {
    const html = getPopupHTML(valid_book)
    const expectedValue = valid_book.status == "AVAILABLE" ? "Available" : "Unavailable";
    expect(html).toContain(expectedValue)
   });

   it('returns popup with status correct color for valid book', () => {
    const html = getPopupHTML(valid_book)
    expect(html).toContain("text-green")
   });

   it('does not return popup with status wrong color for valid book', () => {
    const html = getPopupHTML(valid_book)
    expect(html).not.toContain("text-red")
   });

   it('returns popup with owner for valid book', () => {
    const html = getPopupHTML(valid_book)
    expect(html).toContain(valid_book.owner.name)
   });

   it('returns popup with format for valid book', () => {
    const html = getPopupHTML(valid_book)
    expect(html).toContain(valid_book.format)
   });

   it('returns popup with correct color for valid book (unavailable)', () => {
    let unavailable_book = { ...valid_book, status: 'UNAVAILABLE' };
    const html = getPopupHTML(unavailable_book)
    expect(html).toContain("text-red")
   });
   
});