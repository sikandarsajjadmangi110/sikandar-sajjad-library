import type { Book, BookFilters, Author } from "@/types/book";
import { MOCK_BOOKS, MOCK_AUTHORS } from "@/lib/mock/data";

// ── Supabase availability check ───────────────────────────────
function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return url.length > 0 && !url.includes("YOUR_PROJECT");
}

// ── Mock query helpers ────────────────────────────────────────
function filterMock(filters: BookFilters): Book[] {
  let books = [...MOCK_BOOKS];

  if (filters.language)
    books = books.filter((b) => b.language === filters.language);

  if (filters.category_slug)
    books = books.filter((b) => b.category?.slug === filters.category_slug);

  if (filters.verification_status)
    books = books.filter((b) => b.verification_status === filters.verification_status);

  if (filters.scholar_review_status)
    books = books.filter((b) => b.scholar_review_status === filters.scholar_review_status);

  if (filters.is_beginner_friendly !== undefined)
    books = books.filter((b) => b.is_beginner_friendly === filters.is_beginner_friendly);

  if (filters.pdf_available !== undefined)
    books = books.filter((b) => b.pdf_available === filters.pdf_available);

  if (filters.audio_available !== undefined)
    books = books.filter((b) => b.audio_available === filters.audio_available);

  if (filters.marja_related)
    books = books.filter((b) => b.marja_related === filters.marja_related);

  if (filters.search) {
    const q = filters.search.toLowerCase();
    books = books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.title_ur?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q) ||
        b.author?.name.toLowerCase().includes(q) ||
        b.tags?.some((t) => t.includes(q))
    );
  }

  return books;
}

// ── Public API ────────────────────────────────────────────────

export async function getBooks(
  filters: BookFilters = {},
  limit = 20,
  offset = 0
): Promise<{ books: Book[]; total: number }> {
  if (!isSupabaseConfigured()) {
    const filtered = filterMock(filters);
    return {
      books: filtered.slice(offset, offset + limit),
      total: filtered.length,
    };
  }

  // Live Supabase path
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = createClient();
  const SELECT = `*, author:authors(*), category:categories(*), badges:book_badges(badge:badge_types(*))`;

  let query = supabase
    .from("books")
    .select(SELECT, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (filters.language)             query = query.eq("language", filters.language);
  if (filters.verification_status)  query = query.eq("verification_status", filters.verification_status);
  if (filters.scholar_review_status)query = query.eq("scholar_review_status", filters.scholar_review_status);
  if (filters.is_beginner_friendly !== undefined) query = query.eq("is_beginner_friendly", filters.is_beginner_friendly);
  if (filters.pdf_available !== undefined)        query = query.eq("pdf_available", filters.pdf_available);
  if (filters.audio_available !== undefined)      query = query.eq("audio_available", filters.audio_available);
  if (filters.marja_related)        query = query.eq("marja_related", filters.marja_related);
  if (filters.search)               query = query.textSearch("title", filters.search, { type: "websearch" });

  const { data, error, count } = await query;
  if (error) throw error;
  return { books: data as Book[], total: count ?? 0 };
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_BOOKS.find((b) => b.slug === slug) ?? null;
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = createClient();
  const { data } = await supabase
    .from("books")
    .select(`*, author:authors(*), category:categories(*), badges:book_badges(badge:badge_types(*))`)
    .eq("slug", slug)
    .single();
  return data as Book | null;
}

export async function getFeaturedBooks(limit = 6): Promise<Book[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_BOOKS.filter((b) => b.featured).slice(0, limit);
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = createClient();
  const { data } = await supabase
    .from("books")
    .select(`*, author:authors(*), category:categories(*), badges:book_badges(badge:badge_types(*))`)
    .eq("featured", true)
    .eq("verification_status", "verified")
    .limit(limit);
  return (data ?? []) as Book[];
}

export async function getRecentBooks(limit = 12): Promise<Book[]> {
  if (!isSupabaseConfigured()) {
    return [...MOCK_BOOKS]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = createClient();
  const { data } = await supabase
    .from("books")
    .select(`*, author:authors(*), category:categories(*), badges:book_badges(badge:badge_types(*))`)
    .eq("verification_status", "verified")
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as Book[];
}

export async function getRelatedBooks(book: Book, limit = 4): Promise<Book[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_BOOKS.filter(
      (b) => b.id !== book.id && b.category?.slug === book.category?.slug
    ).slice(0, limit);
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = createClient();
  const { data } = await supabase
    .from("books")
    .select(`*, author:authors(*), category:categories(*)`)
    .eq("category_id", book.category?.id ?? "")
    .neq("id", book.id)
    .limit(limit);
  return (data ?? []) as Book[];
}

export async function incrementBookView(bookId: string) {
  if (!isSupabaseConfigured()) return;
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = createClient();
  await supabase.rpc("increment_view_count", { book_id: bookId });
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  if (!isSupabaseConfigured()) {
    return MOCK_AUTHORS.find((a) => a.slug === slug) ?? null;
  }
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = createClient();
  const { data } = await supabase.from("authors").select("*").eq("slug", slug).single();
  return data as Author | null;
}

export async function getBooksByAuthor(authorSlug: string): Promise<Book[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_BOOKS.filter((b) => b.author?.slug === authorSlug);
  }
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = createClient();
  const { data: author } = await supabase.from("authors").select("id").eq("slug", authorSlug).single();
  if (!author) return [];
  const { data } = await supabase
    .from("books")
    .select(`*, author:authors(*), category:categories(*), badges:book_badges(badge:badge_types(*))`)
    .eq("author_id", author.id)
    .order("created_at", { ascending: false });
  return (data ?? []) as Book[];
}

export async function getAllAuthors(): Promise<Author[]> {
  if (!isSupabaseConfigured()) return MOCK_AUTHORS;
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = createClient();
  const { data } = await supabase.from("authors").select("*").order("name");
  return (data ?? []) as Author[];
}
