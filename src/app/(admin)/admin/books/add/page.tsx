"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, BookOpen, Loader2, ChevronLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIES } from "@/lib/constants/categories";

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ur", label: "Urdu"    },
  { value: "ar", label: "Arabic"  },
  { value: "multi", label: "Multi-language" },
];

export default function AddBookPage() {
  const router   = useRouter();
  const supabase = createClient();
  const [saving, setSaving] = useState(false);
  const [form,   setForm]   = useState({
    title:                "",
    title_ur:             "",
    title_ar:             "",
    author_name:          "",
    language:             "ur",
    category_slug:        "",
    description:          "",
    description_ur:       "",
    publication_year:     "",
    publisher:            "",
    edition:              "",
    total_pages:          "",
    source_reference:     "",
    verification_status:  "pending",
    scholar_review_status:"unreviewed",
    is_classical_text:    false,
    is_beginner_friendly: false,
    download_allowed:     true,
    pdf_available:        false,
    audio_available:      false,
    fiqh_sensitive:       false,
    marja_related:        "",
    featured:             false,
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      // In production: first upsert the author, get author_id, then insert book
      const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const { error } = await supabase.from("books").insert({
        ...form,
        slug,
        publication_year: form.publication_year ? parseInt(form.publication_year) : null,
        total_pages:      form.total_pages      ? parseInt(form.total_pages)      : null,
      });
      if (error) throw error;
      router.push("/admin/books");
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-ivory-100 min-h-screen">
      {/* Admin header */}
      <div className="bg-navy-900 py-4 px-4 sm:px-8 flex items-center gap-3">
        <Link href="/admin/books" className="text-sand-400 hover:text-white flex items-center gap-1 text-sm">
          <ChevronLeft className="w-4 h-4" /> Books
        </Link>
        <span className="text-navy-600">/</span>
        <span className="text-white text-sm font-medium">Add New Book</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title Section */}
          <FormSection title="Book Title" icon={BookOpen}>
            <div className="grid md:grid-cols-3 gap-4">
              <FormInput label="Title (English / Primary)" required value={form.title}
                onChange={(v) => set("title", v)} placeholder="Nahj al-Balagha" />
              <FormInput label="Title — Urdu" value={form.title_ur}
                onChange={(v) => set("title_ur", v)} placeholder="نہج البلاغہ" dir="rtl" />
              <FormInput label="Title — Arabic" value={form.title_ar}
                onChange={(v) => set("title_ar", v)} placeholder="نهج البلاغة" dir="rtl" />
            </div>
          </FormSection>

          {/* Author & Classification */}
          <FormSection title="Author & Classification">
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput label="Author Name" required value={form.author_name}
                onChange={(v) => set("author_name", v)} placeholder="Imam Ali ibn Abi Talib (as)" />
              <div>
                <label className="block text-xs font-medium text-navy-700 mb-1">Language</label>
                <select
                  value={form.language}
                  onChange={(e) => set("language", e.target.value)}
                  className="form-select w-full"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l.value} value={l.value}>{l.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs font-medium text-navy-700 mb-1">Category</label>
                <select
                  value={form.category_slug}
                  onChange={(e) => set("category_slug", e.target.value)}
                  className="form-select w-full"
                >
                  <option value="">Select category...</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.icon} {c.name}</option>
                  ))}
                </select>
              </div>
              <FormInput label="Marja Related" value={form.marja_related}
                onChange={(v) => set("marja_related", v)}
                placeholder="sistani / khamenei / all" />
            </div>
          </FormSection>

          {/* Description */}
          <FormSection title="Description">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-navy-700 mb-1">Description (English)</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={4}
                  className="form-input w-full resize-none"
                  placeholder="A brief description of the book..."
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-navy-700 mb-1">Description (Urdu)</label>
                <textarea
                  value={form.description_ur}
                  onChange={(e) => set("description_ur", e.target.value)}
                  rows={3}
                  dir="rtl"
                  className="form-input w-full resize-none urdu-text"
                  placeholder="کتاب کا مختصر تعارف..."
                />
              </div>
            </div>
          </FormSection>

          {/* Publication details */}
          <FormSection title="Publication Details">
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <FormInput label="Publication Year" value={form.publication_year} type="number"
                onChange={(v) => set("publication_year", v)} placeholder="1420" />
              <FormInput label="Publisher" value={form.publisher}
                onChange={(v) => set("publisher", v)} placeholder="Dar al-Kutub" />
              <FormInput label="Edition" value={form.edition}
                onChange={(v) => set("edition", v)} placeholder="3rd Edition" />
              <FormInput label="Total Pages" value={form.total_pages} type="number"
                onChange={(v) => set("total_pages", v)} placeholder="412" />
            </div>
            <div className="mt-4">
              <label className="block text-xs font-medium text-navy-700 mb-1">Source Reference / Citation</label>
              <textarea
                value={form.source_reference}
                onChange={(e) => set("source_reference", e.target.value)}
                rows={2}
                className="form-input w-full resize-none"
                placeholder="Full citation string, e.g., Imam Ali ibn Abi Talib. Nahj al-Balagha. Compiled by Sayyid Radi. Dar al-Kutub, 1420 AH."
              />
            </div>
          </FormSection>

          {/* Verification & Badges */}
          <FormSection title="Verification & Trust" icon={ShieldCheck}>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-navy-700 mb-1">Verification Status</label>
                <select
                  value={form.verification_status}
                  onChange={(e) => set("verification_status", e.target.value)}
                  className="form-select w-full"
                >
                  <option value="pending">Pending</option>
                  <option value="verified">Verified ✓</option>
                  <option value="under_review">Under Review</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-navy-700 mb-1">Scholar Review Status</label>
                <select
                  value={form.scholar_review_status}
                  onChange={(e) => set("scholar_review_status", e.target.value)}
                  className="form-select w-full"
                >
                  <option value="unreviewed">Unreviewed</option>
                  <option value="approved">Approved ✓</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { key: "is_classical_text",    label: "Classical Text"     },
                { key: "is_beginner_friendly", label: "Beginner Friendly"  },
                { key: "pdf_available",        label: "PDF Available"      },
                { key: "audio_available",      label: "Audio Available"    },
                { key: "download_allowed",     label: "Download Allowed"   },
                { key: "fiqh_sensitive",       label: "Fiqh Sensitive"     },
                { key: "featured",             label: "Featured"           },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(form as any)[key]}
                    onChange={(e) => set(key, e.target.checked)}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <span className="text-sm text-navy-700">{label}</span>
                </label>
              ))}
            </div>
          </FormSection>

          {/* File Upload placeholder */}
          <FormSection title="Files (Upload via Storage)" icon={Upload}>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "Cover Image",  accept: "image/*",       field: "cover_image_url"  },
                { label: "PDF File",     accept: "application/pdf", field: "pdf_url"         },
                { label: "Audio File",   accept: "audio/*",        field: "audio_url"        },
              ].map(({ label, accept }) => (
                <div key={label} className="border-2 border-dashed border-sand-200 rounded-xl p-5 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-sand-400 mx-auto mb-2" />
                  <p className="text-xs font-medium text-navy-700">{label}</p>
                  <p className="text-xs text-sand-400 mt-1">{accept}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-sand-400 mt-3">
              Files are uploaded to Supabase Storage / Cloudflare R2. Implement file upload
              handlers using <code>supabase.storage.from('books').upload()</code>.
            </p>
          </FormSection>

          {/* Submit */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <BookOpen className="w-4 h-4" />}
              {saving ? "Saving..." : "Add Book to Library"}
            </button>
            <Link href="/admin/books" className="btn-outline">
              Cancel
            </Link>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .form-input {
          @apply px-3 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-navy-800
                 focus:outline-none focus:ring-2 focus:ring-emerald-400;
        }
        .form-select {
          @apply px-3 py-2.5 rounded-xl border border-sand-200 bg-white text-sm text-navy-800
                 focus:outline-none focus:ring-2 focus:ring-emerald-400;
        }
      `}</style>
    </div>
  );
}

function FormSection({
  title, icon: Icon, children,
}: {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-sand-200 p-6">
      <h2 className="font-bold text-navy-800 mb-5 flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4 text-emerald-600" />}
        {title}
      </h2>
      {children}
    </div>
  );
}

function FormInput({
  label, value, onChange, placeholder, required, type = "text", dir,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  dir?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-navy-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        dir={dir}
        className="form-input w-full"
      />
    </div>
  );
}
