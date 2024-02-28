interface GuestbookUpdateRequest {
  guestBookId: string;
  writerName: string;
  content: string;
}

interface GuestbookCreateRequest {
  reporterId: number;
  writerKey: string;
  writerName: string;
  content: string;
}

interface Guestbook {
  id: string;
  reporterId: number;
  writerKey: string;
  writerName: string;
  content: string;
  likeCount: number;
  createDt: string;
}
