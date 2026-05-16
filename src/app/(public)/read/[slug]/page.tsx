"use client";

import { useState, useCallback } from "react";
import { useParams, notFound } from "next/navigation";
import {
  ChevronLeft, ChevronRight, Bookmark, Sun, Moon,
  ZoomIn, ZoomOut, Maximize2, AlignLeft, Download, X,
} from "lucide-react";
import Link from "next/link";

// NOTE: In production, replace this mock with a real Supabase fetch.
// This page is client-rendered to enable the interactive reader toolbar.

export default function ReaderPage() {
  const params = useParams<{ slug: string }>();

  const [page,       setPage]       = useState(1);
  const [totalPages] = useState(120);   // placeholder — set from book data
  const [fontSize,   setFontSize]   = useState(16);
  const [nightMode,  setNightMode]  = useState(false);
  const [showNotes,  setShowNotes]  = useState(false);
  const [note,       setNote]       = useState("");

  const goTo = useCallback((p: number) => {
    setPage(Math.max(1, Math.min(p, totalPages)));
  }, [totalPages]);

  const progress = Math.round((page / totalPages) * 100);

  return (
    <div className={`min-h-screen flex flex-col ${nightMode ? "bg-gray-950 text-gray-100" : "bg-ivory-100 text-navy-900"}`}>

      {/* Reader Toolbar */}
      <div className={`sticky top-0 z-40 border-b px-4 py-2 flex items-center gap-2 flex-wrap ${
        nightMode ? "bg-gray-900 border-gray-800" : "bg-white border-sand-200"
      }`}>
        <Link href={`/book/${params.slug}`} className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-800 mr-2">
          <ChevronLeft className="w-4 h-4" /> Back
        </Link>

        <div className="h-4 w-px bg-sand-200 mx-1" />

        {/* Font size */}
        <button onClick={() => setFontSize((f) => Math.max(12, f - 2))} className="p-1.5 rounded hover:bg-sand-100">
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="text-xs w-8 text-center">{fontSize}px</span>
        <button onClick={() => setFontSize((f) => Math.min(24, f + 2))} className="p-1.5 rounded hover:bg-sand-100">
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-sand-200 mx-1" />

        {/* Night mode */}
        <button
          onClick={() => setNightMode((n) => !n)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
            nightMode ? "bg-gray-700 text-yellow-300" : "bg-sand-100 text-navy-700"
          }`}
        >
          {nightMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          {nightMode ? "Day" : "Night"}
        </button>

        {/* Bookmark */}
        <button className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 transition-colors">
          <Bookmark className="w-3.5 h-3.5" /> Bookmark
        </button>

        {/* Note */}
        <button
          onClick={() => setShowNotes((n) => !n)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
            showNotes ? "bg-emerald-100 text-emerald-700" : "bg-sand-100 text-navy-700"
          }`}
        >
          <AlignLeft className="w-3.5 h-3.5" /> Notes
        </button>

        {/* Download */}
        <a href="#" className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 transition-colors">
          <Download className="w-3.5 h-3.5" /> PDF
        </a>

        <div className="ml-auto text-xs text-sand-500">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
          <span className="ml-2 text-emerald-600 font-medium">{progress}%</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-sand-200">
        <div className="h-1 bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex flex-1">
        {/* Book content area */}
        <div className={`flex-1 max-w-3xl mx-auto px-6 py-10 transition-all duration-300`}>
          {/* Placeholder content — replace with PDF viewer or HTML content */}
          <div
            className={`prose max-w-none leading-loose ${nightMode ? "prose-invert" : ""}`}
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.9 }}
          >
            <div className={`rounded-2xl border p-8 min-h-[70vh] ${
              nightMode ? "bg-gray-900 border-gray-800" : "bg-white border-sand-200 shadow-sm"
            }`}>
              <p className="text-center text-sm text-sand-500 mb-6">
                — Page {page} —
              </p>
              <div className="flex flex-col items-center justify-center h-96 gap-5">
                <div className="w-20 h-24 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                  <AlignLeft className="w-10 h-10 text-emerald-400" />
                </div>
                <div className="text-center max-w-sm">
                  <p className="font-semibold text-navy-800 text-lg mb-2">PDF Coming Soon</p>
                  <p className={`text-sm leading-relaxed ${nightMode ? "text-gray-400" : "text-sand-500"}`}>
                    This book is being digitized and will be available for online reading shortly.
                    You can download the PDF when available.
                  </p>
                </div>
                <Link
                  href={`/book/${params.slug}`}
                  className="btn-primary text-sm px-6 py-2.5 flex items-center gap-2"
                >
                  <AlignLeft className="w-4 h-4" /> View Book Details
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Notes sidebar */}
        {showNotes && (
          <aside className={`w-72 border-l flex-shrink-0 p-4 ${
            nightMode ? "bg-gray-900 border-gray-800" : "bg-white border-sand-200"
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Notes — Page {page}</h3>
              <button onClick={() => setShowNotes(false)} className="p-1 rounded hover:bg-sand-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your reflection or note here..."
              className={`w-full h-40 text-sm resize-none rounded-xl border p-3 outline-none focus:ring-2 focus:ring-emerald-400 ${
                nightMode
                  ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-600"
                  : "bg-sand-50 border-sand-200 text-navy-800"
              }`}
            />
            <button className="mt-2 btn-primary w-full text-sm py-2">
              Save to Ilm Journal
            </button>
          </aside>
        )}
      </div>

      {/* Page Navigation */}
      <div className={`sticky bottom-0 border-t px-4 py-3 flex items-center justify-center gap-4 ${
        nightMode ? "bg-gray-900 border-gray-800" : "bg-white border-sand-200"
      }`}>
        <button
          onClick={() => goTo(page - 1)}
          disabled={page <= 1}
          className="flex items-center gap-1 text-sm px-4 py-2 rounded-lg bg-sand-100 hover:bg-sand-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-sand-500">Go to:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) => goTo(parseInt(e.target.value, 10))}
            className="w-16 text-center text-sm border border-sand-200 rounded-lg py-1.5 bg-sand-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <button
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages}
          className="flex items-center gap-1 text-sm px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
