"use client";

import Link from "next/link";
import { Sparkles, BookMarked, ShieldCheck, ChevronRight, Telescope } from "lucide-react";
import { useState } from "react";

const SAMPLE_QA = [
  {
    q: "What does Imam Ali (as) say about knowledge in Nahj al-Balagha?",
    a: 'Imam Ali (as) says in Hikam 81: "The value of every person is what he knows." This refers to the primacy of beneficial knowledge as a core virtue for a believer in the school of Ahlulbayt.',
    source: "Nahj al-Balagha, Hikam 81",
  },
  {
    q: "What is the ruling on Friday Prayer according to Ayatollah Sistani?",
    a: "According to Ayatollah Sistani, Friday Prayer is permissible during the occultation of Imam Mahdi (as) and is sufficient as a substitute for Dhuhr prayer when proper conditions are fulfilled.",
    source: "Islamic Laws, Sistani — Issue 1519",
  },
  {
    q: "What does Imam Hussain (as) teach about standing for truth?",
    a: 'Imam Hussain (as) declared at Karbala: "I see death as nothing but happiness, and living under the oppressors as nothing but disgrace." His sacrifice is the eternal model of standing for truth.',
    source: "Maqtal al-Husayn, Bihar al-Anwar Vol. 44",
  },
];

export function IlmAssistantPreview() {
  const [activeQ, setActiveQ] = useState(0);

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#030d1c" }}>

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(16,185,129,0.1) 0%, transparent 60%)," +
            "radial-gradient(ellipse 40% 40% at 20% 50%, rgba(251,191,36,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — description */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-700/50
                            rounded-full px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
                AI-Powered Research Feature
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-display">
              Ilm Assistant
            </h2>
            <p className="text-gold-400 text-lg font-medium mb-5">
              Your AI Research Companion for Ahlulbayt<sup>ؑ</sup> Knowledge
            </p>

            <p className="text-sand-400 leading-relaxed mb-7 text-sm sm:text-base">
              Ask any question about Islamic texts, hadith, fiqh, or Ahlulbayt<sup>ؑ</sup> history
              and receive answers grounded exclusively in verified Shia sources — with full citations.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                { icon: BookMarked,  text: "Answers only from verified Shia Islamic sources" },
                { icon: ShieldCheck, text: "Full citation — book, author, chapter, page number" },
                { icon: Telescope,   text: "Researcher mode with cross-reference capability" },
                { icon: Sparkles,    text: "Supports Urdu, English, Arabic, and Roman Urdu" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-emerald-900/60 border border-emerald-700/40
                                  flex items-center justify-center flex-shrink-0
                                  group-hover:border-emerald-500 transition-colors">
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sand-300 text-sm">{text}</span>
                </li>
              ))}
            </ul>

            {/* Disclaimer */}
            <div className="bg-gold-900/20 border border-gold-700/30 rounded-2xl p-4 mb-7">
              <p className="text-gold-200/80 text-xs leading-relaxed">
                <strong className="text-gold-400">Disclaimer:</strong> Ilm Assistant answers are
                for learning and research only. AI-generated answers are not fatawa.
                For religious rulings, please consult your Marja or a qualified scholar.
              </p>
            </div>

            <Link
              href="/ilm-assistant"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Try Ilm Assistant
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — premium chat UI */}
          <div
            className="rounded-3xl overflow-hidden shadow-cosmic border"
            style={{
              background: "linear-gradient(135deg, #0a1e3d, #071428)",
              borderColor: "rgba(16,185,129,0.2)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-3 border-b"
              style={{
                background: "linear-gradient(90deg, #022c22, #030d1c)",
                borderColor: "rgba(16,185,129,0.15)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #059669, #047857)" }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Ilm Assistant</p>
                <p className="text-emerald-400 text-xs">Verified Shia Sources Only</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs">Active</span>
              </div>
            </div>

            {/* Question tabs */}
            <div
              className="flex gap-2 p-3 border-b overflow-x-auto"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {SAMPLE_QA.map((qa, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQ(i)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    activeQ === i
                      ? "bg-emerald-700 text-white shadow-emerald-sm"
                      : "bg-white/5 text-sand-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  Sample {i + 1}
                </button>
              ))}
            </div>

            {/* Chat messages */}
            <div className="p-5 space-y-4 min-h-[200px]">
              {/* User question */}
              <div className="flex justify-end">
                <div
                  className="text-white text-sm rounded-2xl rounded-tr-none px-4 py-3 max-w-[85%]"
                  style={{ background: "rgba(5,150,105,0.3)", border: "1px solid rgba(16,185,129,0.2)" }}
                >
                  {SAMPLE_QA[activeQ].q}
                </div>
              </div>

              {/* AI answer */}
              <div className="flex gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <div
                    className="text-sand-200 text-sm rounded-2xl rounded-tl-none px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {SAMPLE_QA[activeQ].a}
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 ml-1">
                    <BookMarked className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 text-xs font-medium">
                      {SAMPLE_QA[activeQ].source}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input preview */}
            <div
              className="p-4 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about any Islamic topic..."
                  disabled
                  className="flex-1 text-sand-500 text-sm px-4 py-2.5 rounded-xl
                             cursor-not-allowed"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
                <button
                  disabled
                  className="w-10 h-10 rounded-xl flex items-center justify-center cursor-not-allowed"
                  style={{ background: "rgba(5,150,105,0.2)" }}
                >
                  <ChevronRight className="w-4 h-4 text-emerald-500" />
                </button>
              </div>
              <p className="text-sand-600 text-xs text-center mt-2">
                Full feature launching soon — Stay tuned
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    </section>
  );
}
