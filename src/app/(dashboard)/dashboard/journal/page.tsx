"use client";

import { useState } from "react";
import { BookMarked, Target, Bell, Lightbulb, PlusCircle, Save, ChevronDown } from "lucide-react";

const TYPES = [
  { value: "reflection", label: "💭 Reflection",   color: "emerald" },
  { value: "highlight",  label: "✨ Highlight",     color: "gold"    },
  { value: "goal",       label: "🎯 Goal",          color: "blue"    },
  { value: "dua_reminder",label:"🤲 Dua Reminder", color: "purple"  },
  { value: "note",       label: "📝 Note",          color: "sand"    },
];

interface JournalEntry {
  id:      string;
  type:    string;
  title:   string;
  content: string;
  date:    string;
}

export default function IlmJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1", type: "reflection", date: "2026-05-15",
      title: "On Patience from Nahj al-Balagha",
      content: "Imam Ali (as) says patience is of two kinds: patience over what pains you, and patience against what you crave. Both are needed in the path of seeking knowledge.",
    },
    {
      id: "2", type: "goal", date: "2026-05-14",
      title: "Ramadan Reading Plan",
      content: "Goal: Complete Sahifa Sajjadiya this Ramadan. Read 2 duas per day with tafsir.",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState({ type: "reflection", title: "", content: "" });

  function addEntry() {
    if (!form.content.trim()) return;
    setEntries((e) => [{
      id:      Date.now().toString(),
      date:    new Date().toISOString().split("T")[0],
      ...form,
    }, ...e]);
    setForm({ type: "reflection", title: "", content: "" });
    setShowForm(false);
  }

  const TYPE_MAP = Object.fromEntries(TYPES.map((t) => [t.value, t]));

  return (
    <div className="bg-ivory-100 min-h-screen">
      <div className="bg-navy-900 py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">My Ilm Journal</h1>
              <p className="text-sand-300 text-sm mt-1">Your private spiritual learning diary</p>
            </div>
            <button onClick={() => setShowForm((s) => !s)}
              className="btn-secondary flex items-center gap-2 text-sm">
              <PlusCircle className="w-4 h-4" /> New Entry
            </button>
          </div>

          {/* Type filter */}
          <div className="flex flex-wrap gap-2 mt-5">
            {TYPES.map((t) => (
              <span key={t.value} className="badge bg-white/10 text-white border border-white/20 text-xs cursor-pointer hover:bg-white/20 transition-colors">
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        {/* New entry form */}
        {showForm && (
          <div className="bg-white border border-sand-200 rounded-2xl p-5 mb-6 shadow-sm">
            <h3 className="font-bold text-navy-800 mb-4">New Journal Entry</h3>
            <div className="space-y-3">
              <div className="flex gap-2 flex-wrap">
                {TYPES.map((t) => (
                  <button key={t.value} onClick={() => setForm((f) => ({ ...f, type: t.value }))}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      form.type === t.value ? "bg-emerald-600 text-white border-emerald-600" : "border-sand-200 text-navy-700 hover:border-emerald-300"
                    }`}>
                    {t.label}
                  </button>
                ))}
              </div>
              <input type="text" placeholder="Title (optional)" value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm" />
              <textarea placeholder="Write your reflection, highlight, or note here..." value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={4} className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-ivory-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm resize-none" />
              <div className="flex gap-2">
                <button onClick={addEntry} className="btn-primary text-sm flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Entry
                </button>
                <button onClick={() => setShowForm(false)} className="btn-outline text-sm">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Entries */}
        <div className="space-y-4">
          {entries.map((entry) => {
            const type = TYPE_MAP[entry.type];
            return (
              <div key={entry.id} className="bg-white border border-sand-200 rounded-2xl p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{type?.label ?? entry.type}</span>
                    {entry.title && <h3 className="font-semibold text-navy-800">{entry.title}</h3>}
                  </div>
                  <span className="text-sand-400 text-xs flex-shrink-0">{entry.date}</span>
                </div>
                <p className="text-navy-600 text-sm leading-relaxed">{entry.content}</p>
              </div>
            );
          })}
        </div>

        {entries.length === 0 && (
          <div className="text-center py-16">
            <BookMarked className="w-12 h-12 text-sand-300 mx-auto mb-4" />
            <p className="text-navy-700 font-medium">No journal entries yet</p>
            <p className="text-sand-400 text-sm mt-1">Start recording your reflections and learning goals.</p>
          </div>
        )}
      </div>
    </div>
  );
}
