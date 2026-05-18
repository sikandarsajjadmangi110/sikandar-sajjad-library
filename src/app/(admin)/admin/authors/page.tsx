"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Users, Search, BookOpen, ExternalLink } from "lucide-react";
import { MOCK_AUTHORS, MOCK_BOOKS } from "@/lib/mock/data";

export default function AuthorsPage() {
  const [query, setQuery] = useState("");

  const authorsWithCount = useMemo(() => {
    return MOCK_AUTHORS.map((a) => ({
      ...a,
      bookCount: MOCK_BOOKS.filter((b) => b.author?.id === a.id).length,
    })).sort((a, b) => b.bookCount - a.bookCount);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return authorsWithCount;
    const q = query.toLowerCase();
    return authorsWithCount.filter(
      (a) => a.name.toLowerCase().includes(q) || a.name_ur?.includes(query)
    );
  }, [authorsWithCount, query]);

  return (
    <div className="p-6 lg:p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Authors</h1>
          <p className="text-sand-500 text-sm mt-0.5">{MOCK_AUTHORS.length} scholars & authors</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-white border border-sand-200 rounded-xl p-4">
          <p className="text-xl font-bold text-navy-800">{MOCK_AUTHORS.length}</p>
          <p className="text-sand-500 text-xs mt-0.5">Total Authors</p>
        </div>
        <div className="bg-white border border-sand-200 rounded-xl p-4">
          <p className="text-xl font-bold text-emerald-700">{MOCK_AUTHORS.filter((a) => a.is_scholar).length}</p>
          <p className="text-sand-500 text-xs mt-0.5">Scholars</p>
        </div>
        <div className="bg-white border border-sand-200 rounded-xl p-4">
          <p className="text-xl font-bold text-navy-800">{MOCK_BOOKS.length}</p>
          <p className="text-sand-500 text-xs mt-0.5">Total Books</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Author name se search karo..."
          className="w-full pl-9 pr-4 py-2.5 border border-sand-200 rounded-xl text-sm text-navy-800 placeholder:text-sand-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
        />
      </div>

      {/* Authors grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((author) => {
          const books = MOCK_BOOKS.filter((b) => b.author?.id === author.id);
          return (
            <div key={author.id} className="bg-white border border-sand-200 rounded-2xl p-5 hover:border-emerald-300 hover:shadow-sm transition-all duration-200 group">
              {/* Avatar */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-emerald-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-navy-800 text-sm leading-tight group-hover:text-emerald-700 transition-colors">{author.name}</p>
                  {author.name_ur && (
                    <p className="text-sand-500 text-xs mt-0.5" style={{ fontFamily: "Noto Nastaliq Urdu, serif", direction: "rtl", lineHeight: "1.8" }}>
                      {author.name_ur}
                    </p>
                  )}
                  {author.era && (
                    <span className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-sand-100 text-sand-600 font-medium mt-1">{author.era}</span>
                  )}
                </div>
              </div>

              {/* Bio */}
              {author.bio && (
                <p className="text-sand-500 text-xs leading-relaxed mb-4 line-clamp-2">{author.bio}</p>
              )}

              {/* Books count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-navy-700">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold">{author.bookCount}</span>
                  <span className="text-sand-500">book{author.bookCount !== 1 ? "s" : ""}</span>
                </div>
                {author.slug && (
                  <Link
                    href={`/author/${author.slug}`}
                    target="_blank"
                    className="flex items-center gap-1 text-[10px] text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    View Page <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {/* Books preview */}
              {books.length > 0 && (
                <div className="mt-3 pt-3 border-t border-sand-100 space-y-1">
                  {books.slice(0, 2).map((b) => (
                    <div key={b.id} className="flex items-center gap-2">
                      <div className="w-4 h-5 rounded flex-shrink-0" style={{ background: "linear-gradient(135deg, #022c22, #047857)" }} />
                      <p className="text-[11px] text-sand-600 truncate">{b.title}</p>
                    </div>
                  ))}
                  {books.length > 2 && (
                    <p className="text-[10px] text-sand-400 pl-6">+{books.length - 2} more books</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white border border-sand-200 rounded-2xl p-12 text-center">
          <Users className="w-10 h-10 text-sand-300 mx-auto mb-3" />
          <p className="text-sand-500 text-sm">Koi author nahi mila</p>
        </div>
      )}

      {/* Note */}
      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-amber-800 text-xs font-medium mb-1">Note: Authors Kaise Add Karo?</p>
        <p className="text-amber-700 text-xs leading-relaxed">
          Abhi authors sirf <code className="bg-amber-100 px-1 rounded">src/lib/mock/data.ts</code> se aate hain.
          Naya author add karne ke liye usi file mein <code className="bg-amber-100 px-1 rounded">MOCK_AUTHORS</code> array mein entry add karo aur git push karo.
        </p>
      </div>
    </div>
  );
}
