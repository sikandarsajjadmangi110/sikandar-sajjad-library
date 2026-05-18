"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload, BookOpen, Loader2, ChevronLeft,
  ShieldCheck, CheckCircle, AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { addAdminBook, type AdminBook } from "@/lib/admin/store";
import { CATEGORIES } from "@/lib/constants/categories";
import { MOCK_AUTHORS } from "@/lib/mock/data";

const LANGUAGES = [
  { value: "ur",    label: "🇵🇰 Urdu"    },
  { value: "en",    label: "🇬🇧 English" },
  { value: "ar",    label: "🇸🇦 Arabic"  },
  { value: "multi", label: "🌐 Multi-language" },
];

const EMPTY_FORM = {
  title:                "",
  title_ur:             "",
  title_ar:             "",
  author_name:          "",
  author_name_ur:       "",
  language:             "ur" as const,
  category_slug:        "",
  description:          "",
  description_ur:       "",
  publication_year:     "",
  publisher:            "",
  edition:              "",
  total_pages:          "",
  source_reference:     "",
  pdf_url:              "",
  cover_image_url:      "",
  audio_url:            "",
  marja_related:        "",
  tags:                 "",
  verification_status:  "pending" as AdminBook["verification_status"],
  scholar_review_status:"unreviewed" as AdminBook["scholar_review_status"],
  is_classical_text:    false,
  is_rare_manuscript:   false,
  is_beginner_friendly: false,
  download_allowed:     true,
  pdf_available:        false,
  audio_available:      false,
  fiqh_sensitive:       false,
  featured:             false,
};

export default function AddBookPage() {
  const router  = useRouter();
  const [form,  setForm]    = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [done,   setDone]   = useState<string | null>(null);
  const [tab,    setTab]    = useState<"basic" | "details" | "trust" | "files">("basic");

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return alert("Book ka title zaroor bharein!");
    if (!form.author_name.trim()) return alert("Author ka naam zaroor bharein!");

    setSaving(true);
    setTimeout(() => {
      const book = addAdminBook(form as Omit<AdminBook, "id" | "slug" | "created_at" | "updated_at">);
      setSaving(false);
      setDone(book.id);
    }, 600);
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
        <div className="bg-white rounded-3xl border border-sand-200 shadow-sm p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-navy-900 mb-2">Book Add Ho Gayi!</h2>
          <p className="text-sand-500 text-sm mb-6 leading-relaxed">
            Book is browser mein save ho gayi hai. Is page par dekhein ya website par
            permanently publish karne ke liye Code page par jayein.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/admin/publish"
              className="btn-primary flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" /> Permanently Publish Karo
            </Link>
            <button
              onClick={() => { setDone(null); setForm(EMPTY_FORM); setTab("basic"); }}
              className="btn-outline"
            >
              Ek Aur Book Add Karo
            </button>
            <Link href="/admin/books" className="text-sand-500 hover:text-navy-700 text-sm transition-colors">
              Back to All Books
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const TABS = [
    { id: "basic",   label: "Basic Info" },
    { id: "details", label: "Details" },
    { id: "trust",   label: "Verification" },
    { id: "files",   label: "Files/Links" },
  ] as const;

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Top bar */}
      <div className="bg-white border-b border-sand-200 px-6 py-4 flex items-center gap-3 sticky top-0 z-10">
        <Link href="/admin/books"
          className="flex items-center gap-1 text-sand-500 hover:text-navy-700 text-sm transition-colors">
          <ChevronLeft className="w-4 h-4" /> Books
        </Link>
        <span className="text-sand-300">/</span>
        <span className="text-navy-700 text-sm font-semibold">Nai Book Add Karo</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="text-amber-600 text-xs font-medium">Demo Mode</span>
        </div>
      </div>

      {/* Demo notice */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex gap-2 items-center">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <p className="text-amber-800 text-xs">
          <strong>Demo Mode:</strong> Abhi book sirf is browser mein save hogi.
          Permanently website par lagane ke liye "Publish Code" button use karein.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* Tab navigation */}
        <div className="flex gap-1 bg-white border border-sand-200 rounded-2xl p-1.5 mb-6">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`flex-1 py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                tab === id
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-sand-600 hover:text-navy-700 hover:bg-sand-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>

          {/* ── Tab: Basic Info ── */}
          {tab === "basic" && (
            <div className="space-y-5">
              <Card title="Book Ka Title" icon={BookOpen}>
                <div className="space-y-4">
                  <Field label="Title (English / Roman Urdu)" required>
                    <input type="text" required value={form.title}
                      onChange={(e) => set("title", e.target.value)}
                      placeholder="Nahj al-Balagha ya Falsafa-e-Imamat"
                      className="form-input w-full" />
                  </Field>
                  <Field label="Title — Urdu (اردو)">
                    <input type="text" value={form.title_ur} dir="rtl"
                      onChange={(e) => set("title_ur", e.target.value)}
                      placeholder="نہج البلاغہ"
                      className="form-input w-full urdu-text" />
                  </Field>
                  <Field label="Title — Arabic (عربی)">
                    <input type="text" value={form.title_ar} dir="rtl"
                      onChange={(e) => set("title_ar", e.target.value)}
                      placeholder="نهج البلاغة"
                      className="form-input w-full" />
                  </Field>
                </div>
              </Card>

              <Card title="Author">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Author Name (English)" required>
                    <input type="text" required value={form.author_name}
                      onChange={(e) => set("author_name", e.target.value)}
                      placeholder="Allama Dr. Zameer Akhtar Naqvi"
                      className="form-input w-full" />
                    {/* Suggestion: existing authors */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <span className="text-[10px] text-sand-400">Existing:</span>
                      {MOCK_AUTHORS.slice(0, 4).map((a) => (
                        <button key={a.id} type="button"
                          onClick={() => { set("author_name", a.name); set("author_name_ur", a.name_ur ?? ""); }}
                          className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full hover:bg-emerald-100 transition-colors">
                          {a.name}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Author Name (Urdu)">
                    <input type="text" value={form.author_name_ur} dir="rtl"
                      onChange={(e) => set("author_name_ur", e.target.value)}
                      placeholder="علامہ ڈاکٹر ضمیر اختر نقوی"
                      className="form-input w-full urdu-text" />
                  </Field>
                </div>
              </Card>

              <Card title="Classification">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Language">
                    <select value={form.language} onChange={(e) => set("language", e.target.value)}
                      className="form-input w-full">
                      {LANGUAGES.map((l) => (
                        <option key={l.value} value={l.value}>{l.label}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Category">
                    <select value={form.category_slug}
                      onChange={(e) => set("category_slug", e.target.value)}
                      className="form-input w-full">
                      <option value="">Category chunein...</option>
                      {CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                      ))}
                    </select>
                  </Field>
                </div>
              </Card>

              <Card title="Description">
                <div className="space-y-4">
                  <Field label="English Description">
                    <textarea value={form.description} rows={4}
                      onChange={(e) => set("description", e.target.value)}
                      placeholder="Book ka mukhtasar taruf English mein..."
                      className="form-input w-full resize-none" />
                  </Field>
                  <Field label="Urdu Description">
                    <textarea value={form.description_ur} rows={3} dir="rtl"
                      onChange={(e) => set("description_ur", e.target.value)}
                      placeholder="کتاب کا مختصر تعارف اردو میں..."
                      className="form-input w-full resize-none urdu-text" />
                  </Field>
                </div>
              </Card>

              <div className="flex gap-3">
                <button type="button" onClick={() => setTab("details")}
                  className="btn-primary flex-1">
                  Agla Step: Details →
                </button>
              </div>
            </div>
          )}

          {/* ── Tab: Details ── */}
          {tab === "details" && (
            <div className="space-y-5">
              <Card title="Publication Details">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Publisher">
                    <input type="text" value={form.publisher}
                      onChange={(e) => set("publisher", e.target.value)}
                      placeholder="Imamia Mission Pakistan"
                      className="form-input w-full" />
                  </Field>
                  <Field label="Edition">
                    <input type="text" value={form.edition}
                      onChange={(e) => set("edition", e.target.value)}
                      placeholder="3rd Edition"
                      className="form-input w-full" />
                  </Field>
                  <Field label="Publication Year">
                    <input type="number" value={form.publication_year}
                      onChange={(e) => set("publication_year", e.target.value)}
                      placeholder="2019"
                      className="form-input w-full" />
                  </Field>
                  <Field label="Total Pages">
                    <input type="number" value={form.total_pages}
                      onChange={(e) => set("total_pages", e.target.value)}
                      placeholder="350"
                      className="form-input w-full" />
                  </Field>
                </div>
                <Field label="Source Reference / Citation" className="mt-4">
                  <textarea value={form.source_reference} rows={2}
                    onChange={(e) => set("source_reference", e.target.value)}
                    placeholder="Allama Dr. Zameer Akhtar Naqvi. Falsafa-e-Imamat. Imamia Mission. 2019."
                    className="form-input w-full resize-none" />
                </Field>
                <Field label="Tags (comma separated)" className="mt-4">
                  <input type="text" value={form.tags}
                    onChange={(e) => set("tags", e.target.value)}
                    placeholder="imamat, aqaed, urdu, zameer akhtar"
                    className="form-input w-full" />
                </Field>
                <Field label="Marja Related (if fiqh)" className="mt-4">
                  <input type="text" value={form.marja_related}
                    onChange={(e) => set("marja_related", e.target.value)}
                    placeholder="sistani / khamenei / all"
                    className="form-input w-full" />
                </Field>
              </Card>

              <div className="flex gap-3">
                <button type="button" onClick={() => setTab("basic")}
                  className="btn-outline">← Back</button>
                <button type="button" onClick={() => setTab("trust")}
                  className="btn-primary flex-1">Agla Step: Verification →</button>
              </div>
            </div>
          )}

          {/* ── Tab: Verification ── */}
          {tab === "trust" && (
            <div className="space-y-5">
              <Card title="Verification Status" icon={ShieldCheck}>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <Field label="Verification Status">
                    <select value={form.verification_status}
                      onChange={(e) => set("verification_status", e.target.value)}
                      className="form-input w-full">
                      <option value="pending">⏳ Pending</option>
                      <option value="verified">✅ Verified</option>
                      <option value="under_review">🔍 Under Review</option>
                      <option value="rejected">❌ Rejected</option>
                    </select>
                  </Field>
                  <Field label="Scholar Review Status">
                    <select value={form.scholar_review_status}
                      onChange={(e) => set("scholar_review_status", e.target.value)}
                      className="form-input w-full">
                      <option value="unreviewed">Unreviewed</option>
                      <option value="approved">✓ Scholar Approved</option>
                      <option value="flagged">⚠ Flagged</option>
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: "is_classical_text",    label: "📜 Classical Text"      },
                    { key: "is_rare_manuscript",   label: "🗿 Rare Manuscript"     },
                    { key: "is_beginner_friendly", label: "🟢 Beginner Friendly"   },
                    { key: "pdf_available",        label: "📄 PDF Available"       },
                    { key: "audio_available",      label: "🎧 Audio Available"     },
                    { key: "download_allowed",     label: "⬇️ Download Allowed"    },
                    { key: "fiqh_sensitive",       label: "⚖️ Fiqh Sensitive"     },
                    { key: "featured",             label: "⭐ Featured Book"       },
                  ].map(({ key, label }) => (
                    <label key={key}
                      className="flex items-center gap-2.5 p-3 rounded-xl border border-sand-200 bg-sand-50 cursor-pointer hover:border-emerald-300 transition-colors">
                      <input type="checkbox"
                        checked={(form as any)[key]}
                        onChange={(e) => set(key, e.target.checked)}
                        className="w-4 h-4 accent-emerald-600 flex-shrink-0" />
                      <span className="text-sm text-navy-700">{label}</span>
                    </label>
                  ))}
                </div>
              </Card>

              <div className="flex gap-3">
                <button type="button" onClick={() => setTab("details")}
                  className="btn-outline">← Back</button>
                <button type="button" onClick={() => setTab("files")}
                  className="btn-primary flex-1">Agla Step: Files →</button>
              </div>
            </div>
          )}

          {/* ── Tab: Files ── */}
          {tab === "files" && (
            <div className="space-y-5">
              <Card title="Files & Links" icon={Upload}>
                <p className="text-sand-500 text-xs mb-5 bg-sand-50 rounded-xl p-3">
                  💡 Abhi ke liye direct links paste karo (Google Drive, Dropbox, ya koi bhi direct link).
                  Supabase connect hone par files directly upload kar sako ge.
                </p>
                <div className="space-y-4">
                  <Field label="Cover Image URL (optional)">
                    <input type="url" value={form.cover_image_url}
                      onChange={(e) => set("cover_image_url", e.target.value)}
                      placeholder="https://drive.google.com/... ya koi image link"
                      className="form-input w-full" />
                  </Field>
                  <Field label="PDF URL (optional)">
                    <input type="url" value={form.pdf_url}
                      onChange={(e) => { set("pdf_url", e.target.value); if (e.target.value) set("pdf_available", true); }}
                      placeholder="https://drive.google.com/... ya direct PDF link"
                      className="form-input w-full" />
                    {form.pdf_url && (
                      <p className="text-emerald-600 text-xs mt-1">✓ PDF available automatically on kar diya gaya</p>
                    )}
                  </Field>
                  <Field label="Audio URL (optional)">
                    <input type="url" value={form.audio_url}
                      onChange={(e) => { set("audio_url", e.target.value); if (e.target.value) set("audio_available", true); }}
                      placeholder="https://... audio lecture link"
                      className="form-input w-full" />
                  </Field>
                </div>
              </Card>

              {/* Summary before submit */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <h3 className="font-bold text-emerald-900 text-sm mb-3">✓ Book Summary</h3>
                <div className="space-y-1.5 text-sm">
                  <p><span className="text-sand-600 text-xs">Title:</span> <strong className="text-navy-800">{form.title || "—"}</strong></p>
                  <p><span className="text-sand-600 text-xs">Author:</span> <strong className="text-navy-800">{form.author_name || "—"}</strong></p>
                  <p><span className="text-sand-600 text-xs">Language:</span> <strong className="text-navy-800">{form.language.toUpperCase()}</strong></p>
                  <p><span className="text-sand-600 text-xs">Category:</span> <strong className="text-navy-800">{form.category_slug || "—"}</strong></p>
                  <p><span className="text-sand-600 text-xs">Status:</span> <strong className={form.verification_status === "verified" ? "text-emerald-700" : "text-amber-700"}>{form.verification_status}</strong></p>
                </div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setTab("trust")}
                  className="btn-outline">← Back</button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {saving
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                    : <><BookOpen className="w-4 h-4" /> Book Add Karo</>
                  }
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      <style jsx global>{`
        .form-input {
          padding: 0.625rem 0.875rem;
          border-radius: 0.75rem;
          border: 1px solid #ede4d3;
          background: white;
          font-size: 0.875rem;
          color: #0a1628;
          outline: none;
          transition: all 0.2s;
        }
        .form-input:focus {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5,150,105,0.12);
        }
      `}</style>
    </div>
  );
}

function Card({ title, icon: Icon, children }: {
  title: string; icon?: React.ElementType; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-sand-200 p-5">
      <h2 className="font-bold text-navy-800 mb-4 flex items-center gap-2 text-sm">
        {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, required, children, className = "" }: {
  label: string; required?: boolean; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-navy-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
