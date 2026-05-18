"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  BookOpen, PlusCircle, Search, Filter, Trash2,
  Edit, Eye, ShieldCheck, AlertCircle, CheckCircle,
} from "lucide-react";
import { getAllAdminBooks, deleteAdminBook, type AdminBook } from "@/lib/admin/store";
import { MOCK_BOOKS } from "@/lib/mock/data";

type CombinedBook = {
  id: string;
  title: string;
  author: string;
  language: string;
  status: string;
  featured: boolean;
  source: "admin" | "mock";
  slug: string;
};

export default function AllBooksPage() {
  const [adminBooks, setAdminBooks] = useState<AdminBook[]>([]);
  const [query, setQuery]           = useState("");
  const [filterStatus, setFilter]   = useState("all");
  const [deleted, setDeleted]       = useState<string[]>([]);

  useEffect(() => {
    setAdminBooks(getAllAdminBooks());
  }, []);

  const combined: CombinedBook[] = useMemo(() => {
    const adminMapped: CombinedBook[] = adminBooks.map((b) => ({
      id:       b.id,
      title:    b.title,
      author:   b.author_name,
      language: b.language,
      status:   b.verification_status,
      featured: b.featured,
      source:   "admin",
      slug:     b.slug,
    }));
    const mockMapped: CombinedBook[] = MOCK_BOOKS.map((b) => ({
      id:       b.id,
      title:    b.title,
      author:   b.author?.name ?? "Unknown",
      language: b.language,
      status:   b.verification_status,
      featured: b.featured ?? false,
      source:   "mock",
      slug:     b.slug,
    }));
    return [...adminMapped, ...mockMapped];
  }, [adminBooks]);

  const filtered = useMemo(() => {
    return combined.filter((b) => {
      const matchQ = query.trim() === "" ||
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase());
      const matchS = filterStatus === "all" || b.status === filterStatus;
      return matchQ && matchS;
    });
  }, [combined, query, filterStatus]);

  function handleDelete(id: string, title: string) {
    if (!confirm(`"${title}" delete karna chahte hain? Yeh sirf localhost se hategi.`)) return;
    deleteAdminBook(id);
    setAdminBooks((prev) => prev.filter((b) => b.id !== id));
    setDeleted((prev) => [...prev, id]);
  }

  const statusBadge = (status: string) => {
    if (status === "verified")    return <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">✓ Verified</span>;
    if (status === "pending")     return <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Pending</span>;
    if (status === "under_review")return <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">Under Review</span>;
    if (status === "rejected")    return <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-medium">Rejected</span>;
    return null;
  };

  return (
    <div className="p-6 lg:p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">All Books</h1>
          <p className="text-sand-500 text-sm mt-0.5">{combined.length} total books</p>
        </div>
        <Link
          href="/admin/books/add"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm shadow-sm"
        >
          <PlusCircle className="w-4 h-4" /> Add Book
        </Link>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total",       value: combined.length,                                             color: "navy"    },
          { label: "Verified",    value: combined.filter((b) => b.status === "verified").length,      color: "emerald" },
          { label: "Pending",     value: combined.filter((b) => b.status === "pending").length,       color: "amber"   },
          { label: "Newly Added", value: adminBooks.length,                                           color: "blue"    },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-sand-200 rounded-xl p-4">
            <p className={`text-xl font-bold ${
              color === "emerald" ? "text-emerald-700" :
              color === "amber"   ? "text-amber-700"   :
              color === "blue"    ? "text-blue-700"    : "text-navy-800"
            }`}>{value}</p>
            <p className="text-sand-500 text-xs mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Title ya author se search karo..."
            className="w-full pl-9 pr-4 py-2.5 border border-sand-200 rounded-xl text-sm text-navy-800 placeholder:text-sand-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 border border-sand-200 rounded-xl text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white appearance-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Admin books notice */}
      {adminBooks.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 mb-5 flex gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 text-xs">
            <span className="font-semibold">{adminBooks.length} nai books</span> sirf is browser mein hain.{" "}
            <Link href="/admin/publish" className="underline font-semibold">Publish Code</Link>{" "}
            se permanently website par lagao.
          </p>
        </div>
      )}

      {/* Books table */}
      <div className="bg-white border border-sand-200 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-10 h-10 text-sand-300 mx-auto mb-3" />
            <p className="text-sand-500 text-sm">Koi book nahi mili</p>
          </div>
        ) : (
          <div className="divide-y divide-sand-100">
            {filtered.map((book) => (
              <div
                key={book.id}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-sand-50 transition-colors group"
              >
                {/* Source dot */}
                <div
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${book.source === "admin" ? "bg-amber-400" : "bg-emerald-500"}`}
                  title={book.source === "admin" ? "Nai — publish honi hai" : "Published"}
                />

                {/* Cover placeholder */}
                <div className="w-9 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                     style={{ background: "linear-gradient(135deg, #022c22, #047857)" }}>
                  <BookOpen className="w-4 h-4 text-white" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-navy-800 text-sm truncate">{book.title}</p>
                  <p className="text-sand-500 text-xs">{book.author} · {book.language.toUpperCase()}</p>
                </div>

                {/* Status */}
                <div className="hidden sm:block">{statusBadge(book.status)}</div>

                {/* Source label */}
                {book.source === "admin" && (
                  <span className="hidden md:inline text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">Nai</span>
                )}

                {/* Actions */}
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {book.source === "mock" && (
                    <Link
                      href={`/book/${book.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-navy-600 transition-colors"
                      title="View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  )}
                  {book.source === "admin" && (
                    <>
                      <Link
                        href={`/admin/books/edit/${book.id}`}
                        className="p-1.5 rounded-lg bg-sand-100 hover:bg-emerald-100 hover:text-emerald-700 text-navy-600 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(book.id, book.title)}
                        className="p-1.5 rounded-lg bg-sand-100 hover:bg-red-100 hover:text-red-600 text-navy-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer count */}
      <p className="text-center text-sand-400 text-xs mt-4">
        {filtered.length} of {combined.length} books dikh rahe hain
      </p>
    </div>
  );
}
