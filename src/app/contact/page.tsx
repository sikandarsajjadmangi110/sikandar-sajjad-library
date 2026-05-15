"use client";

import { useState } from "react";
import { Mail, MessageSquare, CheckCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);
  const [form,    setForm]    = useState({ name: "", email: "", subject: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="bg-ivory-100 min-h-screen">
      <div className="bg-emerald-gradient py-12 text-center">
        <MessageSquare className="w-10 h-10 text-white mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Contact Us</h1>
        <p className="text-emerald-200 text-sm">Questions, suggestions, or book submissions? We'd love to hear from you.</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {sent ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-navy-800 mb-2">Message Sent!</h2>
            <p className="text-sand-500 text-sm">JazakAllah Khair. We'll respond within 2–3 business days.</p>
            <p className="arabic-text text-emerald-700 text-lg mt-3">جزاكم الله خيرًا</p>
          </div>
        ) : (
          <div className="bg-white border border-sand-200 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Your Name *", key: "name",  placeholder: "Yasir Sajjad",       type: "text"  },
                  { label: "Email *",     key: "email", placeholder: "you@example.com",    type: "email" },
                ].map(({ label, key, placeholder, type }) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-navy-700 mb-1">{label}</label>
                    <input type={type} required value={(form as any)[key]}
                      onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Subject *</label>
                <select required value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm text-navy-800">
                  <option value="">Select subject...</option>
                  <option>Book Suggestion</option>
                  <option>Report Wrong Content</option>
                  <option>Manuscript Submission</option>
                  <option>Scholar Review Request</option>
                  <option>Halaqa Partnership</option>
                  <option>General Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Message *</label>
                <textarea required value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  rows={5} placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
