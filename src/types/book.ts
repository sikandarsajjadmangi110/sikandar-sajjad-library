export type Language = "en" | "ur" | "ar" | "multi";

export type VerificationStatus = "pending" | "verified" | "rejected" | "under_review";

export type ScholarReviewStatus = "unreviewed" | "approved" | "flagged";

export interface BadgeType {
  id: number;
  name: string;
  label: string;
  color: string;
}

export interface Author {
  id: string;
  name: string;
  name_ur?: string;
  name_ar?: string;
  slug: string;
  bio?: string;
  language?: string;
  era?: string;
  image_url?: string;
  is_scholar: boolean;
}

export interface Category {
  id: string;
  name: string;
  name_ur?: string;
  name_ar?: string;
  slug: string;
  parent_id?: string;
  icon?: string;
  description?: string;
  sort_order: number;
}

export interface Book {
  id: string;
  title: string;
  title_ur?: string;
  title_ar?: string;
  slug: string;
  author?: Author;
  translator_name?: string;
  description?: string;
  description_ur?: string;
  language: Language;
  category?: Category;
  pdf_url?: string;
  cover_image_url?: string;
  audio_url?: string;
  publication_year?: number;
  publisher?: string;
  edition?: string;
  total_pages?: number;
  source_reference?: string;
  verification_status: VerificationStatus;
  scholar_review_status: ScholarReviewStatus;
  is_classical_text: boolean;
  is_rare_manuscript: boolean;
  is_beginner_friendly: boolean;
  download_allowed: boolean;
  audio_available: boolean;
  pdf_available: boolean;
  marja_related?: string;
  fiqh_sensitive: boolean;
  tags?: string[];
  view_count: number;
  download_count: number;
  featured: boolean;
  badges?: BadgeType[];
  created_at: string;
  updated_at: string;
}

export interface BookFilters {
  language?: Language;
  category_slug?: string;
  author_id?: string;
  verification_status?: VerificationStatus;
  scholar_review_status?: ScholarReviewStatus;
  is_beginner_friendly?: boolean;
  pdf_available?: boolean;
  audio_available?: boolean;
  marja_related?: string;
  search?: string;
}

export interface ReadingProgress {
  user_id: string;
  book_id: string;
  last_page: number;
  percentage: number;
  started_at: string;
  updated_at: string;
  book?: Book;
}

export interface Bookmark {
  id: string;
  user_id: string;
  book_id: string;
  page_number?: number;
  note?: string;
  color: string;
  created_at: string;
  book?: Book;
}
