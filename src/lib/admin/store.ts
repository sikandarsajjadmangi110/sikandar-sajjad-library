"use client";

// ── Admin Book Store ──────────────────────────────────────────────────────────
// In demo mode: reads/writes from localStorage so books persist in the browser.
// In Supabase mode: all operations go to the database.
//
// localStorage key: "ss_library_books"
// Books added via admin are stored as AdminBook objects.

import type { Language } from "@/types/book";

export interface AdminBook {
  id:                    string;
  slug:                  string;
  title:                 string;
  title_ur:              string;
  title_ar:              string;
  author_name:           string;
  author_name_ur:        string;
  language:              Language;
  category_slug:         string;
  description:           string;
  description_ur:        string;
  publication_year:      string;
  publisher:             string;
  edition:               string;
  total_pages:           string;
  source_reference:      string;
  pdf_url:               string;
  cover_image_url:       string;
  audio_url:             string;
  marja_related:         string;
  tags:                  string;       // comma-separated
  verification_status:   "pending" | "verified" | "under_review" | "rejected";
  scholar_review_status: "unreviewed" | "approved" | "flagged";
  is_classical_text:     boolean;
  is_rare_manuscript:    boolean;
  is_beginner_friendly:  boolean;
  download_allowed:      boolean;
  pdf_available:         boolean;
  audio_available:       boolean;
  fiqh_sensitive:        boolean;
  featured:              boolean;
  created_at:            string;
  updated_at:            string;
}

const STORAGE_KEY = "ss_library_books";

function load(): AdminBook[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function save(books: AdminBook[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

export function getAllAdminBooks(): AdminBook[] {
  return load();
}

export function getAdminBookById(id: string): AdminBook | undefined {
  return load().find((b) => b.id === id);
}

export function addAdminBook(book: Omit<AdminBook, "id" | "slug" | "created_at" | "updated_at">): AdminBook {
  const slug = book.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const now = new Date().toISOString();
  const newBook: AdminBook = {
    ...book,
    id:         `admin_${Date.now()}`,
    slug:       slug || `book-${Date.now()}`,
    created_at: now,
    updated_at: now,
  };

  const books = load();
  books.unshift(newBook);
  save(books);
  return newBook;
}

export function updateAdminBook(id: string, updates: Partial<AdminBook>): AdminBook | null {
  const books = load();
  const idx   = books.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  books[idx] = { ...books[idx], ...updates, updated_at: new Date().toISOString() };
  save(books);
  return books[idx];
}

export function deleteAdminBook(id: string): boolean {
  const books = load();
  const filtered = books.filter((b) => b.id !== id);
  if (filtered.length === books.length) return false;
  save(filtered);
  return true;
}

export function exportBookAsCode(book: AdminBook): string {
  const tagsArray = book.tags
    ? book.tags.split(",").map((t) => `"${t.trim()}"`).join(", ")
    : "";

  return `  {
    id: "${book.id.replace("admin_", "b_")}",
    slug: "${book.slug}",
    title: "${book.title}",
    title_ur: "${book.title_ur}",
    title_ar: "${book.title_ar}",
    language: "${book.language}",
    author: { id: "custom", name: "${book.author_name}", slug: "${book.author_name.toLowerCase().replace(/\s+/g, "-")}", is_scholar: true },
    description: "${book.description.replace(/"/g, '\\"')}",
    description_ur: "${book.description_ur}",
    publication_year: ${book.publication_year ? Number(book.publication_year) : "undefined"},
    publisher: "${book.publisher}",
    edition: "${book.edition}",
    total_pages: ${book.total_pages ? Number(book.total_pages) : "undefined"},
    source_reference: "${book.source_reference.replace(/"/g, '\\"')}",
    pdf_url: ${book.pdf_url ? `"${book.pdf_url}"` : "undefined"},
    cover_image_url: ${book.cover_image_url ? `"${book.cover_image_url}"` : "undefined"},
    audio_url: ${book.audio_url ? `"${book.audio_url}"` : "undefined"},
    pdf_available: ${book.pdf_available},
    audio_available: ${book.audio_available},
    download_allowed: ${book.download_allowed},
    verification_status: "${book.verification_status}",
    scholar_review_status: "${book.scholar_review_status}",
    is_classical_text: ${book.is_classical_text},
    is_rare_manuscript: ${book.is_rare_manuscript},
    is_beginner_friendly: ${book.is_beginner_friendly},
    fiqh_sensitive: ${book.fiqh_sensitive},
    marja_related: ${book.marja_related ? `"${book.marja_related}"` : "undefined"},
    featured: ${book.featured},
    view_count: 0,
    download_count: 0,
    tags: [${tagsArray}],
    badges: [],
    created_at: "${book.created_at}",
    updated_at: "${book.updated_at}",
  },`;
}
