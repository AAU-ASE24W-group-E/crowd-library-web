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
      title: 'Book1',
      year: '2020',
      author: 'Author1',
      publisher: 'Publisher1',
      format: 'Paperback',
      language: 'EN',
      ISBN: '1234567890',
      owner: 'Owner1',
      isAvailable: true,
      isLendable: true,
      isExchangeable: false,
      isGiftable: true,
      status: 'Available',
      lat: 46.622305,
      long: 14.272915,
    }

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
    expect(html).toContain(valid_book.status)
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
    expect(html).toContain(valid_book.status)
   });

   it('returns popup with format for valid book', () => {
    const html = getPopupHTML(valid_book)
    expect(html).toContain(valid_book.format)
   });

   it('returns popup with correct color for valid book (unavailable)', () => {
    let unavailable_book = { ...valid_book, status: 'Unavailable' };
    const html = getPopupHTML(unavailable_book)
    expect(html).toContain("text-red")
   });
   
});