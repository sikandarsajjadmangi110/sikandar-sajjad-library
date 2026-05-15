import { Suspense }                    from "react";
import { Search }                       from "lucide-react";
import { BookCard, BookCardSkeleton }   from "@/components/books/BookCard";
import { getBooks }                     from "@/lib/queries/books";
import type { Metadata }                from "next";

export const metadata: Metadata = { title: "Search" };

interface Props { searchParams: { q?: string } }

async function Results({ q }: { q: string }) {
  if (!q.trim()) return null;
  const { books, total } = await getBooks({ search: q }, 24);

  if (!books.length) {
    return (
      <div className="text-center py-16">
        <p className="text-4xl mb-4">🔍</p>
        <p className="font-semibold text-navy-800 text-lg">No results for "{q}"</p>
        <p className="text-sand-500 text-sm mt-1">Try a different keyword or browse by category.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sand-500 text-sm mb-5">
        Found <strong className="text-navy-800">{total}</strong> results for{" "}
        <strong className="text-emerald-700">"{q}"</strong>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((b) => <BookCard key={b.id} book={b} />)}
      </div>
    </div>
  );
}

export default function SearchPage({ searchParams }: Props) {
  const q = searchParams.q ?? "";

  return (
    <div className="bg-ivory-100 min-h-screen">
      <div className="bg-emerald-gradient py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl font-bold text-white mb-4">Search the Library</h1>
          <form method="GET">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400" />
                <input
                  name="q"
                  defaultValue={q}
                  type="text"
                  placeholder="Search books, authors, topics, duas..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-navy-900 placeholder-sand-400 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm"
                  autoFocus
                />
              </div>
              <button type="submit" className="px-6 bg-gold-600 hover:bg-gold-700 text-white font-semibold rounded-xl transition-colors">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {q ? (
          <Suspense fallback={
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} />)}
            </div>
          }>
            <Results q={q} />
          </Suspense>
        ) : (
          <div className="text-center py-16 text-sand-500">
            <Search className="w-12 h-12 mx-auto mb-4 text-sand-300" />
            <p>Enter a keyword to search the library</p>
          </div>
        )}
      </div>
    </div>
  );
}
