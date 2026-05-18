"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  BookOpen, Loader2, ChevronLeft, ShieldCheck, CheckCircle, AlertCircle, Save,
} from "lucide-react";
import Link from "next/link";
import { getAdminBookById, updateAdminBook, type AdminBook } from "@/lib/admin/store";
import { CATEGORIES } from "@/lib/constants/categories";
import { MOCK_AUTHORS } from "@/lib/mock/data";

const LANGUAGES = [
  { value: "ur",    label: "🇵🇰 Urdu"    },
  { value: "en",    label: "🇬🇧 English" },
  { value: "ar",    label: "🇸🇦 Arabic"  },
  { value: "multi", label: "🌐 Multi-language" },
];

export default function EditBookPage() {
  const router      = useRouter();
  const params      = useParams();
  const id          = params?.id as string;

  const [form, setForm]       = useState<Omit<AdminBook, "id"|"slug"|"created_at"|"updated_at"> | null>(null);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [tab, setTab]         = useState<"basic"|"details"|"trust"|"files">("basic");

  useEffect(() => {
    if (!id) return;
    const book = getAdminBookById(id);
    if (!book) { setNotFound(true); return; }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, slug: _slug, created_at: _ca, updated_at: _ua, ...rest } = book;
    setForm(rest);
  }, [id]);

  function set(key: string, value: unknown) {
    setForm((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    updateAdminBook(id, form);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const inputCls = "w-full px-3 py-2.5 border border-sand-200 rounded-xl text-sm text-navy-800 placeholder:text-sand-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white";
  const labelCls = "block text-xs font-semibold text-navy-700 mb-1";

  if (notFound) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <p className="text-navy-700 font-semibold mb-2">Book nahi mili</p>
        <p className="text-sand-500 text-sm mb-4">Yeh book localStorage mein nahi hai ya delete ho chuki hai.</p>
        <Link href="/admin/books" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">← All Books</Link>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
      </div>
    );
  }

  const TABS = [
    { key: "basic",   label: "Basic Info" },
    { key: "details", label: "Details"    },
    { key: "trust",   label: "Verification" },
    { key: "files",   label: "Files & URLs" },
  ] as const;

  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">

      {/* Back */}
      <Link href="/admin/books" className="flex items-center gap-1.5 text-sand-500 hover:text-navy-700 text-sm mb-6 transition-colors">
        <ChevronLeft className="w-4 h-4" /> All Books
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Book Edit Karo</h1>
          <p className="text-sand-500 text-sm mt-0.5 truncate max-w-xs">{form.title || "..."}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Saved toast */}
      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 mb-5 flex items-center gap-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <p className="text-emerald-800 text-sm font-medium">Changes save ho gaye (localStorage mein)</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-sand-200 mb-6 gap-1">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors border-b-2 -mb-px ${
              tab === key
                ? "border-emerald-600 text-emerald-700 bg-emerald-50"
                : "border-transparent text-sand-500 hover:text-navy-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-sand-200 rounded-2xl p-6">

        {/* ── Tab 1: Basic ── */}
        {tab === "basic" && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Title (English) *</label>
                <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="e.g. Nahjul Balagha" />
              </div>
              <div>
                <label className={labelCls}>عنوان (اردو)</label>
                <input value={form.title_ur} onChange={(e) => set("title_ur", e.target.value)} className={`${inputCls} text-right`} dir="rtl" placeholder="عنوان اردو میں" />
              </div>
            </div>
            <div>
              <label className={labelCls}>عنوان (عربي)</label>
              <input value={form.title_ar} onChange={(e) => set("title_ar", e.target.value)} className={`${inputCls} text-right`} dir="rtl" placeholder="العنوان بالعربية" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Author Name (English) *</label>
                <input
                  value={form.author_name}
                  onChange={(e) => set("author_name", e.target.value)}
                  list="authors-edit-list"
                  className={inputCls}
                  placeholder="e.g. Imam Ali (as)"
                />
                <datalist id="authors-edit-list">
                  {MOCK_AUTHORS.map((a) => <option key={a.id} value={a.name} />)}
                </datalist>
              </div>
              <div>
                <label className={labelCls}>مصنف کا نام (اردو)</label>
                <input value={form.author_name_ur} onChange={(e) => set("author_name_ur", e.target.value)} className={`${inputCls} text-right`} dir="rtl" placeholder="اردو میں نام" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Language *</label>
                <select value={form.language} onChange={(e) => set("language", e.target.value)} className={inputCls}>
                  {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Category *</label>
                <select value={form.category_slug} onChange={(e) => set("category_slug", e.target.value)} className={inputCls}>
                  <option value="">-- Category chunain --</option>
                  {CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Description (English)</label>
              <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} className={inputCls} placeholder="Brief description of the book..." />
            </div>
            <div>
              <label className={labelCls}>تعارف (اردو)</label>
              <textarea rows={3} value={form.description_ur} onChange={(e) => set("description_ur", e.target.value)} className={`${inputCls} text-right`} dir="rtl" placeholder="کتاب کا مختصر تعارف..." />
            </div>
          </div>
        )}

        {/* ── Tab 2: Details ── */}
        {tab === "details" && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Publisher</label>
                <input value={form.publisher} onChange={(e) => set("publisher", e.target.value)} className={inputCls} placeholder="e.g. Ansariyan Publications" />
              </div>
              <div>
                <label className={labelCls}>Edition</label>
                <input value={form.edition} onChange={(e) => set("edition", e.target.value)} className={inputCls} placeholder="e.g. 3rd Edition" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Publication Year</label>
                <input type="number" value={form.publication_year} onChange={(e) => set("publication_year", e.target.value)} className={inputCls} placeholder="e.g. 1998" />
              </div>
              <div>
                <label className={labelCls}>Total Pages</label>
                <input type="number" value={form.total_pages} onChange={(e) => set("total_pages", e.target.value)} className={inputCls} placeholder="e.g. 450" />
              </div>
            </div>
            <div>
              <label className={labelCls}>Source / Citation Reference</label>
              <input value={form.source_reference} onChange={(e) => set("source_reference", e.target.value)} className={inputCls} placeholder="e.g. Bihar al-Anwar, Vol. 1" />
            </div>
            <div>
              <label className={labelCls}>Tags (comma separated)</label>
              <input value={form.tags} onChange={(e) => set("tags", e.target.value)} className={inputCls} placeholder="e.g. hadith, imam-ali, sermon" />
            </div>
            <div>
              <label className={labelCls}>Marja Related</label>
              <input value={form.marja_related} onChange={(e) => set("marja_related", e.target.value)} className={inputCls} placeholder="e.g. Ayatollah Sistani" />
            </div>
          </div>
        )}

        {/* ── Tab 3: Verification ── */}
        {tab === "trust" && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Verification Status</label>
                <select value={form.verification_status} onChange={(e) => set("verification_status", e.target.value)} className={inputCls}>
                  <option value="pending">Pending</option>
                  <option value="verified">Verified ✓</option>
                  <option value="under_review">Under Review</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Scholar Review Status</label>
                <select value={form.scholar_review_status} onChange={(e) => set("scholar_review_status", e.target.value)} className={inputCls}>
                  <option value="unreviewed">Unreviewed</option>
                  <option value="approved">Approved</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {([
                ["is_classical_text",    "Classical Text"],
                ["is_rare_manuscript",   "Rare Manuscript"],
                ["is_beginner_friendly", "Beginner Friendly"],
                ["download_allowed",     "Download Allowed"],
                ["pdf_available",        "PDF Available"],
                ["audio_available",      "Audio Available"],
                ["fiqh_sensitive",       "Fiqh Sensitive"],
                ["featured",             "Featured"],
              ] as [keyof typeof form, string][]).map(([key, label]) => (
                <label key={key} className="flex items-center gap-3 p-3 border border-sand-200 rounded-xl cursor-pointer hover:bg-sand-50">
                  <input
                    type="checkbox"
                    checked={form[key] as boolean}
                    onChange={(e) => set(key, e.target.checked)}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <span className="text-sm text-navy-700 font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab 4: Files ── */}
        {tab === "files" && (
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Cover Image URL</label>
              <input value={form.cover_image_url} onChange={(e) => set("cover_image_url", e.target.value)} className={inputCls} placeholder="https://..." />
              {form.cover_image_url && (
                <img src={form.cover_image_url} alt="Cover" className="mt-2 h-24 w-auto rounded-lg border border-sand-200 object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
              )}
            </div>
            <div>
              <label className={labelCls}>PDF URL</label>
              <input
                value={form.pdf_url}
                onChange={(e) => {
                  set("pdf_url", e.target.value);
                  set("pdf_available", e.target.value.trim().length > 0);
                }}
                className={inputCls}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className={labelCls}>Audio URL (optional)</label>
              <input
                value={form.audio_url}
                onChange={(e) => {
                  set("audio_url", e.target.value);
                  set("audio_available", e.target.value.trim().length > 0);
                }}
                className={inputCls}
                placeholder="https://..."
              />
            </div>
            {/* Summary */}
            <div className="bg-sand-50 rounded-xl p-4 text-sm">
              <p className="font-semibold text-navy-700 mb-2">Current File Status</p>
              <div className="space-y-1.5">
                {[
                  { label: "Cover Image", active: !!form.cover_image_url },
                  { label: "PDF",         active: form.pdf_available      },
                  { label: "Audio",       active: form.audio_available    },
                ].map(({ label, active }) => (
                  <div key={label} className="flex items-center gap-2 text-xs">
                    <div className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-500" : "bg-sand-300"}`} />
                    <span className={active ? "text-emerald-700" : "text-sand-400"}>{label}: {active ? "Available" : "Not set"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Save */}
      <div className="mt-6 flex items-center justify-between">
        <Link href="/admin/books" className="text-sand-500 hover:text-navy-700 text-sm transition-colors">
          ← Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
