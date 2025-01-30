import { describe, it, vi, expect, beforeEach } from 'vitest';
import { lendingService } from '@/services/LendingService';
import { lendingApiService } from '@/services/clients.ts';
import { LendingStatus } from '@/enums/lendingStatus.ts';

vi.mock('@/services/clients.ts', () => ({
  lendingApiService: {
    post: vi.fn(),
    patch: vi.fn(),
    get: vi.fn(),
  },
}));

describe('LendingService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockLendingId = 'test-lending-id';
  const mockReaderId = 'test-reader-id';
  const mockOwnerId = 'test-owner-id';
  const mockStatus = LendingStatus.READER_CREATED_REQUEST;
  const mockLendingRequestPayload = {
    bookId: 'test-book-id',
    readerId: mockReaderId,
    ownerId: mockOwnerId,
    status: mockStatus,
  };
  const mockLendingMeetingPayload = {
    meetingTime: '2025-01-30T10:00:00Z',
    meetingLocation: 'Library',
    deadline: '2025-02-10T10:00:00Z',
  };
  const mockLendingResponse = { data: 'mock-lending-data' };
  const mockHistoryResponse = { data: ['history-item-1', 'history-item-2'] };

  it('should call POST /lendings to create a lending', async () => {
    lendingApiService.post.mockResolvedValue(mockLendingResponse);

    const response = await lendingService.createLending(mockLendingRequestPayload);

    expect(lendingApiService.post).toHaveBeenCalledWith(
      '/lendings',
      mockLendingRequestPayload
    );
    expect(response).toEqual(mockLendingResponse);
  });

  it('should call PATCH /lendings/:id with OWNER_DENIED status to decline a lending request', async () => {
    lendingApiService.patch.mockResolvedValue(mockLendingResponse);

    const response = await lendingService.declineLendingRequest(mockLendingId);

    expect(lendingApiService.patch).toHaveBeenCalledWith(
      `/lendings/${mockLendingId}?status=OWNER_DENIED`
    );
    expect(response).toEqual(mockLendingResponse);
  });

  it('should call PATCH /lendings/:id with READER_WITHDREW status to cancel a lending request', async () => {
    lendingApiService.patch.mockResolvedValue(mockLendingResponse);

    const response = await lendingService.cancelLendingRequest(mockLendingId);

    expect(lendingApiService.patch).toHaveBeenCalledWith(
      `/lendings/${mockLendingId}?status=READER_WITHDREW`
    );
    expect(response).toEqual(mockLendingResponse);
  });

  it('should call GET /lendings/:id to retrieve a lending', async () => {
    lendingApiService.get.mockResolvedValue(mockLendingResponse);

    const response = await lendingService.getLending(mockLendingId);

    expect(lendingApiService.get).toHaveBeenCalledWith(`/lendings/${mockLendingId}`);
    expect(response).toEqual(mockLendingResponse);
  });

  it('should call GET /lendings/readers/:id to retrieve lendings by reader ID', async () => {
    lendingApiService.get.mockResolvedValue(mockLendingResponse);

    const response = await lendingService.getLendingsByReaderId(mockReaderId);

    expect(lendingApiService.get).toHaveBeenCalledWith(`/lendings/readers/${mockReaderId}`);
    expect(response).toEqual(mockLendingResponse);
  });

  it('should call GET /lendings/readers/:id with status to retrieve lendings by reader ID and status', async () => {
    lendingApiService.get.mockResolvedValue(mockLendingResponse);

    const response = await lendingService.getLendingsByReaderIdAndStatus(mockReaderId, mockStatus);

    expect(lendingApiService.get).toHaveBeenCalledWith(
      `/lendings/readers/${mockReaderId}?status=${mockStatus}`
    );
    expect(response).toEqual(mockLendingResponse);
  });

  it('should call GET /lendings/owners/:id to retrieve lendings by owner ID', async () => {
    lendingApiService.get.mockResolvedValue(mockLendingResponse);

    const response = await lendingService.getLendingsByOwnerId(mockOwnerId);

    expect(lendingApiService.get).toHaveBeenCalledWith(`/lendings/owners/${mockOwnerId}`);
    expect(response).toEqual(mockLendingResponse);
  });

  it('should call PATCH /lendings/:id to update lending status', async () => {
    lendingApiService.patch.mockResolvedValue(mockLendingResponse);

    const response = await lendingService.updateLendingStatus(mockLendingId, mockStatus);

    expect(lendingApiService.patch).toHaveBeenCalledWith(
      `/lendings/${mockLendingId}?status=${mockStatus}`
    );
    expect(response).toEqual(mockLendingResponse);
  });

  it('should call POST /lendings/:id/meeting to create a lending meeting', async () => {
    lendingApiService.post.mockResolvedValue(mockLendingResponse);

    const response = await lendingService.createLendingMeeting(
      mockLendingId,
      mockLendingMeetingPayload
    );

    expect(lendingApiService.post).toHaveBeenCalledWith(
      `/lendings/${mockLendingId}/meeting`,
      mockLendingMeetingPayload
    );
    expect(response).toEqual(mockLendingResponse);
  });

  it('should call GET /lendings/:id/history to retrieve lending history', async () => {
    lendingApiService.get.mockResolvedValue(mockHistoryResponse);

    const response = await lendingService.getLendingHistory(mockLendingId);

    expect(lendingApiService.get).toHaveBeenCalledWith(`/lendings/${mockLendingId}/history`);
    expect(response).toEqual(mockHistoryResponse);
  });
});
