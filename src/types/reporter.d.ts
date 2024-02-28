interface Reporter {
  id: number;
  name: string;
  description?: string;
  profileImageUrl?: string;
  backgroundImageUrl?: string;
  useInsight: boolean;
  useComment: boolean;
  favoriteCount: number;
}

interface ReporterUpdateRequest {
  name?: string;
  description?: string;
  profileImageUrl?: string;
  backgroundImageUrl?: string;
  useInsight?: boolean;
  useComment?: boolean;
}
