export enum LendingStatus {
  // Current Statuses defined in backend
  READER_CREATED_REQUEST = 'READER_CREATED_REQUEST',
  OWNER_SUGGESTED_MEETING = 'OWNER_SUGGESTED_MEETING',
  READER_ACCEPTED_MEETING = 'READER_ACCEPTED_MEETING',
  READER_CONFIRMED_TRANSFER = 'READER_CONFIRMED_TRANSFER',
  OWNER_CONFIRMED_TRANSFER = 'OWNER_CONFIRMED_TRANSFER',
  BORROWED = 'BORROWED',
  READER_RETURNED_BOOK = 'READER_RETURNED_BOOK',
  OWNER_CONFIRMED_RETURNAL = 'OWNER_CONFIRMED_RETURNAL',
  OWNER_DENIED = 'OWNER_DENIED',
  READER_WITHDREW = 'READER_WITHDREW',
  LENDING_COMPLETED = 'LENDING_COMPLETED',
  LENDING_CANCELLED = 'LENDING_CANCELLED',
  LENDING_DECLINED = 'LENDING_DECLINED',
}
