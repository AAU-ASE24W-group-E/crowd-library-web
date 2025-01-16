import type { Book } from '@/interfaces/book.ts';
import type { Owner } from '@/interfaces/owner.ts';

export interface OwnBook {
  book: Book;
  lendable: boolean;
  giftable: boolean;
  exchangeable: boolean;
  status: boolean;
  distance: number;
  owner: Owner;
}
