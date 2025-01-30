import { LendingStatus } from '@/enums/lendingStatus.ts';

export const handleLendingStatus = (status: LendingStatus): string => {
  switch (status) {
    case LendingStatus.READER_CREATED_REQUEST:
      return "Reader created a request, owner has to suggest meeting";
    case LendingStatus.OWNER_SUGGESTED_MEETING:
      return "Owner suggested a meeting, reader needs to confirm meeting";
    case LendingStatus.READER_ACCEPTED_MEETING:
      return "Reader accepted meeting, owner has to confirm transfer";
    case LendingStatus.READER_CONFIRMED_TRANSFER:
      return "Reader confirmed transfer";
    case LendingStatus.OWNER_CONFIRMED_TRANSFER:
      return "Owner confirmed transfer, reader has to confirm transfer";
    case LendingStatus.BORROWED:
      return "Book is currently borrowed";
    case LendingStatus.READER_RETURNED_BOOK:
      return "Reader returned the book";
    case LendingStatus.OWNER_CONFIRMED_RETURNAL:
      return "Owner confirmed returnal";
    case LendingStatus.OWNER_DENIED:
      return "Owner denied the request";
    case LendingStatus.READER_WITHDREW:
      return "Reader withdrew the request";
    case LendingStatus.LENDING_COMPLETED:
      return "Lending process completed";
    default:
      return "Unknown lending status";
  }
};
