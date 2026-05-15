"use client";

import { useState } from "react";
import { Upload, ScrollText, Eye, Heart, CheckCircle, Loader2 } from "lucide-react";

export default function HeritagePage() {
  const [tab, setTab] = useState<"browse" | "submit">("browse");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [form, setForm] = useState({
    title: "", description: "", era: "", location: "", uploader_name: "", uploader_email: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // simulate API call
    setSubmitted(true);
    setLoading(false);
  }

  return (
    <div className="bg-ivory-100 min-h-screen">
      {/* Header */}
      <div className="bg-navy-900 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <ScrollText className="w-10 h-10 text-gold-400 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Heritage Preservation Portal</h1>
          <p className="text-sand-300 text-sm max-w-xl mx-auto leading-relaxed">
            Preserving the written heritage of Ahlulbayt<sup>ؑ</sup> for future generations.
            Submit rare manuscripts, help with OCR correction, or volunteer to type old texts.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-sand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-1 py-2">
          {[
            { id: "browse", label: "Browse Manuscripts" },
            { id: "submit", label: "Submit a Manuscript" },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id as any)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                tab === t.id ? "bg-emerald-100 text-emerald-800" : "text-navy-600 hover:bg-sand-100"
              }`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {tab === "browse" && (
          <div>
            {/* How to contribute */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Upload,     title: "Submit Rare Books",     desc: "Upload scanned PDFs of rare Islamic texts" },
                { icon: Eye,        title: "OCR Correction",        desc: "Review machine-scanned texts for accuracy"  },
                { icon: ScrollText, title: "Volunteer Typing",      desc: "Type out undigitized manuscripts"           },
                { icon: Heart,      title: "Magazine Archive",      desc: "Help preserve old Urdu Islamic magazines"   },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white border border-sand-200 rounded-xl p-5 text-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <p className="font-semibold text-navy-800 text-sm mb-1">{title}</p>
                  <p className="text-sand-500 text-xs">{desc}</p>
                </div>
              ))}
            </div>

            {/* Placeholder manuscript list */}
            <h2 className="font-bold text-navy-800 text-xl mb-5">Archived Manuscripts</h2>
            <div className="space-y-3">
              {[
                { title: "Ziyarah Waritha — 18th Century Manuscript",  lang: "Arabic",  era: "12th Hijri Century", status: "verified" },
                { title: "Risalah-e-Amali — Urdu Commentary",          lang: "Urdu",    era: "1920s",              status: "verified" },
                { title: "Dua Kumayl — Calligraphic Manuscript",       lang: "Arabic",  era: "Undated",            status: "under_review" },
                { title: "Al-Misbah al-Mutahajjid Fragment",           lang: "Arabic",  era: "13th Hijri Century", status: "verified" },
              ].map((m, i) => (
                <div key={i} className="bg-white border border-sand-200 rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <ScrollText className="w-6 h-6 text-amber-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-navy-800 text-sm">{m.title}</p>
                    <p className="text-sand-500 text-xs mt-0.5">{m.lang} · {m.era}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${
                    m.status === "verified" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                  }`}>
                    {m.status === "verified" ? "✓ Verified" : "Under Review"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "submit" && (
          <div className="max-w-lg mx-auto">
            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-navy-800 mb-2">Submission Received!</h2>
                <p className="text-sand-500 text-sm">
                  JazakAllah Khair. Our team will review your submission and contact you.
                </p>
                <p className="arabic-text text-emerald-700 text-lg mt-3">جزاكم الله خيرًا</p>
                <button onClick={() => { setSubmitted(false); setForm({ title:"",description:"",era:"",location:"",uploader_name:"",uploader_email:"" }); }}
                  className="btn-primary mt-6">Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-sand-200 rounded-2xl p-6 space-y-4">
                <h2 className="font-bold text-navy-800 text-lg mb-2">Submit a Rare Manuscript</h2>

                {[
                  { label: "Manuscript Title *", key: "title", placeholder: "e.g., Dua Kumayl — 18th Century Copy" },
                  { label: "Estimated Era",      key: "era",   placeholder: "e.g., 12th Hijri Century / 1920s" },
                  { label: "Physical Location",  key: "location", placeholder: "e.g., Najaf Library / Private Collection" },
                  { label: "Your Name *",        key: "uploader_name",  placeholder: "Your name" },
                  { label: "Your Email *",       key: "uploader_email", placeholder: "your@email.com" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-navy-700 mb-1">{label}</label>
                    <input type={key === "uploader_email" ? "email" : "text"}
                      required={label.includes("*")}
                      value={(form as any)[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm" />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Description</label>
                  <textarea value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    rows={3} placeholder="Brief description of the manuscript..."
                    className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm resize-none" />
                </div>

                <div className="border-2 border-dashed border-sand-200 rounded-xl p-5 text-center">
                  <Upload className="w-6 h-6 text-sand-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-navy-700">Upload Scanned PDF</p>
                  <p className="text-xs text-sand-400 mt-1">PDF, JPG, PNG — Max 50MB</p>
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {loading ? "Submitting..." : "Submit Manuscript"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
