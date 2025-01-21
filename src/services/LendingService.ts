import { lendingApiService } from '@/services/clients.ts';
import type { LendingStatus } from '@/enums/lendingStatus.ts';

export interface LendingRequestPayload {
  bookId: string,
  readerId: string,
  ownerId: string,
  status: LendingStatus
}

export interface LendingMeetingPayload {
  meetingTime: string,
  meetingLocation: string,
  deadline: string
}

class LendingService {
  readonly subdomain: string = '/lendings';

  async createLending(lendingRequestPayload: LendingRequestPayload) {
    return await lendingApiService.post(this.subdomain, lendingRequestPayload);
  }

  async getLending(lendingId: string) {
    return await lendingApiService.get(this.subdomain + `/${lendingId}`);
  }

  async getLendingsByReaderId(readerId: string) {
    return await lendingApiService.get(this.subdomain + `/readers/${readerId}`);
  }

  async getLendingsByReaderIdAndStatus(readerId: string, status: LendingStatus) {
    return await lendingApiService.get(this.subdomain + `/readers/${readerId}?status=${status}`);
  }

  async getLendingsByOwnerId(ownerId: string) {
    return await lendingApiService.get(this.subdomain + `/owners/${ownerId}`);
  }

  async updateLendingStatus(lendingId: string, status: LendingStatus) {
    return await lendingApiService.patch(this.subdomain + `/${lendingId}?status=${status}`);
  }

  async createLendingMeeting(lendingId: string, lendingMeetingPayload: LendingMeetingPayload) {
    return await lendingApiService.post(this.subdomain + `/${lendingId}/meeting`, lendingMeetingPayload);
  }

  async getLendingHistory(lendingId: string) {
    return await lendingApiService.get(this.subdomain + `/${lendingId}/history`);
  }

}

export const lendingService = new LendingService();
