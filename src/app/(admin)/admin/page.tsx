"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen, PlusCircle, ShieldCheck, Eye,
  TrendingUp, Users, ScrollText, Star, AlertCircle,
} from "lucide-react";
import { getAllAdminBooks } from "@/lib/admin/store";
import { MOCK_BOOKS, MOCK_AUTHORS } from "@/lib/mock/data";

export default function AdminDashboard() {
  const [adminBooks, setAdminBooks] = useState<ReturnType<typeof getAllAdminBooks>>([]);

  useEffect(() => {
    setAdminBooks(getAllAdminBooks());
  }, []);

  const allBooks     = [...adminBooks, ...MOCK_BOOKS];
  const totalBooks   = allBooks.length;
  const verified     = allBooks.filter((b) => b.verification_status === "verified").length;
  const pending      = allBooks.filter((b) => b.verification_status === "pending").length;
  const featured     = allBooks.filter((b) => b.featured).length;
  const newlyAdded   = adminBooks.length;

  return (
    <div className="p-6 lg:p-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Admin Dashboard</h1>
          <p className="text-sand-500 text-sm mt-0.5">
            Ahlulbayt Knowledge Universe — Book Management
          </p>
        </div>
        <Link
          href="/admin/books/add"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700
                     text-white font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          Add New Book
        </Link>
      </div>

      {/* Demo mode notice */}
      {newlyAdded > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-800 font-semibold text-sm">
              {newlyAdded} nai book{newlyAdded > 1 ? "en" : ""} add ki hain (sirf is browser mein)
            </p>
            <p className="text-amber-700 text-xs mt-0.5">
              In books ko permanently website par publish karne ke liye{" "}
              <Link href="/admin/publish" className="underline font-semibold">
                Publish Code
              </Link>{" "}
              page par jayein.
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Books",    value: totalBooks,  icon: BookOpen,   color: "emerald", href: "/admin/books" },
          { label: "Verified",       value: verified,    icon: ShieldCheck,color: "green",   href: "/admin/books?status=verified" },
          { label: "Pending Review", value: pending,     icon: Eye,        color: "amber",   href: "/admin/books?status=pending" },
          { label: "Featured",       value: featured,    icon: Star,       color: "gold",    href: "/admin/books?featured=true" },
        ].map(({ label, value, icon: Icon, color, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-white border border-sand-200 rounded-2xl p-5 hover:border-emerald-300
                       hover:shadow-sm transition-all duration-200 group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
              color === "emerald" ? "bg-emerald-100" :
              color === "green"   ? "bg-green-100"   :
              color === "amber"   ? "bg-amber-100"   : "bg-gold-100"
            }`}>
              <Icon className={`w-5 h-5 ${
                color === "emerald" ? "text-emerald-700" :
                color === "green"   ? "text-green-700"   :
                color === "amber"   ? "text-amber-700"   : "text-gold-700"
              }`} />
            </div>
            <p className="text-2xl font-bold text-navy-900 group-hover:text-emerald-700 transition-colors">
              {value}
            </p>
            <p className="text-sand-500 text-sm mt-0.5">{label}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Nai Book Add Karo",
            desc:  "Form bharkar library mein book add karo",
            href:  "/admin/books/add",
            icon:  PlusCircle,
            primary: true,
          },
          {
            label: "Sari Books Dekhein",
            desc:  "Books manage, edit aur delete karo",
            href:  "/admin/books",
            icon:  BookOpen,
            primary: false,
          },
          {
            label: "Code Publish Karo",
            desc:  "Nai books ko website par permanently lagao",
            href:  "/admin/publish",
            icon:  ScrollText,
            primary: false,
          },
        ].map(({ label, desc, href, icon: Icon, primary }) => (
          <Link
            key={href}
            href={href}
            className={`rounded-2xl p-5 border transition-all duration-200 group ${
              primary
                ? "bg-emerald-600 border-emerald-700 hover:bg-emerald-700 text-white"
                : "bg-white border-sand-200 hover:border-emerald-300 hover:shadow-sm"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
              primary ? "bg-white/20" : "bg-emerald-50"
            }`}>
              <Icon className={`w-5 h-5 ${primary ? "text-white" : "text-emerald-700"}`} />
            </div>
            <p className={`font-semibold text-sm ${primary ? "text-white" : "text-navy-800 group-hover:text-emerald-700 transition-colors"}`}>
              {label}
            </p>
            <p className={`text-xs mt-1 ${primary ? "text-white/80" : "text-sand-500"}`}>{desc}</p>
          </Link>
        ))}
      </div>

      {/* Recently added books */}
      <div className="bg-white border border-sand-200 rounded-2xl">
        <div className="p-5 border-b border-sand-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-navy-800">Sari Books</h2>
            <p className="text-sand-500 text-xs mt-0.5">{totalBooks} total books</p>
          </div>
          <Link href="/admin/books/add"
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white
                       text-xs font-semibold px-3 py-2 rounded-xl transition-colors">
            <PlusCircle className="w-3.5 h-3.5" /> Add Book
          </Link>
        </div>

        <div className="divide-y divide-sand-100 max-h-[400px] overflow-y-auto">
          {adminBooks.map((book) => (
            <div key={book.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-emerald-50/50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" title="Nai — publish honi hai" />
              <div className="w-9 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                   style={{ background: "linear-gradient(135deg, #022c22, #047857)" }}>
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-navy-800 text-sm truncate">{book.title}</p>
                <p className="text-sand-500 text-xs">{book.author_name} · {book.language.toUpperCase()}</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium flex-shrink-0">
                Nai
              </span>
              <div className="flex gap-1.5">
                <Link href={`/admin/books/edit/${book.id}`}
                  className="text-xs px-2.5 py-1.5 rounded-lg bg-sand-100 hover:bg-emerald-100
                             hover:text-emerald-700 text-navy-700 transition-colors">
                  Edit
                </Link>
              </div>
            </div>
          ))}
          {MOCK_BOOKS.slice(0, 10).map((book) => (
            <div key={book.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-sand-50 transition-colors">
              <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" title="Published" />
              <div className="w-9 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                   style={{ background: "linear-gradient(135deg, #022c22, #047857)" }}>
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-navy-800 text-sm truncate">{book.title}</p>
                <p className="text-sand-500 text-xs">
                  {book.author?.name ?? "Unknown"} · {book.language.toUpperCase()}
                </p>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                book.verification_status === "verified"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {book.verification_status === "verified" ? "✓ Verified" : "Pending"}
              </span>
              <Link href={`/book/${book.slug}`} target="_blank"
                className="text-xs px-2.5 py-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-navy-700 transition-colors">
                View
              </Link>
            </div>
          ))}
        </div>

        {MOCK_BOOKS.length > 10 && (
          <div className="p-4 border-t border-sand-100 text-center">
            <Link href="/admin/books" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              Sari {MOCK_BOOKS.length} books dekhein →
            </Link>
          </div>
        )}
      </div>

      {/* Authors summary */}
      <div className="mt-6 bg-white border border-sand-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-navy-800 flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" /> Authors
          </h2>
          <Link href="/admin/authors" className="text-emerald-600 text-xs font-medium hover:text-emerald-700">
            Manage →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {MOCK_AUTHORS.map((a) => (
            <div key={a.id} className="flex items-center gap-2 p-2.5 bg-sand-50 rounded-xl">
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-3.5 h-3.5 text-emerald-700" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-navy-800 truncate">{a.name}</p>
                <p className="text-[10px] text-sand-500">
                  {MOCK_BOOKS.filter((b) => b.author?.id === a.id).length} books
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
