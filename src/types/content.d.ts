interface Content {
  id?: string;
  contentId?: string;
  reporterId: number;
  title?: string;
  subtitle?: string | null;
  bodyText?: string;
  contentUrl?: string;
  thumbnailUrl?: string;
  keyword?: string[];
  pv: number;
  likeCount: number;
  delete: boolean;
  createDt?: string;
}

interface PageContent<T = any> {
  totalElements?: number;
  totalPages?: number;
  pageable?: PageableObject;
  size?: number;
  content?: T[];
  sort?: SortObject;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
  empty?: boolean;
}

interface PageableObject {
  pageNumber?: number;
  pageSize?: number;
  offset?: number;
  sort?: SortObject;
  paged?: boolean;
  unpaged?: boolean;
}

interface SortObject {
  sorted?: boolean;
  empty?: boolean;
  unsorted?: boolean;
}

interface SearchRequest {
  keyword?: string;
}
