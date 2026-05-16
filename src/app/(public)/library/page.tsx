import { Suspense } from "react";
import { BookCard, BookCardSkeleton } from "@/components/books/BookCard";
import { BookFilters }               from "@/components/books/BookFilters";
import { getBooks }                  from "@/lib/queries/books";
import type { BookFilters as IFilters, Language } from "@/types/book";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library",
  description: "Browse thousands of verified Shia Islamic books, hadith, fiqh, duas, manuscripts and more.",
};

interface PageProps {
  searchParams: {
    language?: string;
    category?: string;
    marja?:    string;
    verified?: string;
    pdf?:      string;
    audio?:    string;
    level?:    string;
    q?:        string;
    page?:     string;
  };
}

const PAGE_SIZE = 24;

async function BookGrid({ searchParams }: PageProps) {
  const page = Math.max(1, parseInt(searchParams.page ?? "1", 10));
  const offset = (page - 1) * PAGE_SIZE;

  const filters: IFilters = {
    language:              searchParams.language as Language | undefined,
    category_slug:         searchParams.category,
    marja_related:         searchParams.marja,
    verification_status:   searchParams.verified ? "verified" : undefined,
    pdf_available:         searchParams.pdf  ? true : undefined,
    audio_available:       searchParams.audio ? true : undefined,
    is_beginner_friendly:  searchParams.level === "beginner" ? true : undefined,
    search:                searchParams.q,
  };

  const { books, total } = await getBooks(filters, PAGE_SIZE, offset);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (!books.length) {
    return (
      <div className="text-center py-20">
        <p className="text-4xl mb-4">📚</p>
        <p className="text-navy-800 font-semibold text-lg">No books found</p>
        <p className="text-sand-500 text-sm mt-1">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sand-500 text-sm mb-4">
        Showing <strong className="text-navy-800">{total}</strong> books
        {searchParams.q && <> for "<strong className="text-emerald-700">{searchParams.q}</strong>"</>}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
              className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm transition-colors ${
                p === page
                  ? "bg-emerald-600 text-white font-semibold"
                  : "bg-white border border-sand-200 text-navy-700 hover:border-emerald-300"
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LibraryPage({ searchParams }: PageProps) {
  return (
    <div className="bg-ivory-100 min-h-screen">
      {/* Header */}
      <div className="bg-emerald-gradient py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            The Library
          </h1>
          <p className="text-emerald-200">
            Explore thousands of verified Ahlulbayt<sup>ؑ</sup> knowledge resources
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6 items-start">
          {/* Sidebar filters */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <Suspense fallback={<div className="bg-white rounded-2xl border border-sand-200 p-5 h-96 animate-pulse" />}>
              <BookFilters />
            </Suspense>
          </aside>

          {/* Book grid */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-4">
              <Suspense fallback={null}>
                <BookFilters />
              </Suspense>
            </div>

            <Suspense fallback={
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, i) => <BookCardSkeleton key={i} />)}
              </div>
            }>
              <BookGrid searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
