"use client";

import Link from "next/link";
import { Sparkles, BookMarked, ShieldCheck, ChevronRight } from "lucide-react";
import { useState } from "react";

const SAMPLE_QA = [
  {
    q: "What does Imam Ali (as) say about knowledge in Nahj al-Balagha?",
    a: 'Imam Ali (as) says in Nahj al-Balagha, Saying 147: "The value of a man is what he knows." This refers to the importance of seeking beneficial knowledge as a core virtue for a believer.',
    source: "Nahj al-Balagha, Hikam 147",
  },
  {
    q: "What is the ruling on Salat al-Jumua according to Ayatollah Sistani?",
    a: "According to Ayatollah Sistani, Friday Prayer (Salat al-Jumua) is permissible during the occultation of Imam Mahdi (as) and is considered a sufficient substitute for Dhuhr prayer when conditions are met.",
    source: "Islamic Laws by Sistani, Issue 1519",
  },
];

export function IlmAssistantPreview() {
  const [activeQ, setActiveQ] = useState(0);

  return (
    <section className="py-16 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — description */}
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-900/50 border border-emerald-700
                            rounded-full px-4 py-1.5 mb-5">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span className="text-gold-300 text-xs font-medium uppercase tracking-wider">
                Coming Soon — AI Feature
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ilm Assistant
              <span className="block text-gold-400 text-xl font-medium mt-1">
                Your AI Research Companion for Ahlulbayt Knowledge
              </span>
            </h2>

            <p className="text-sand-300 leading-relaxed mb-6 text-sm sm:text-base">
              Ask any question about Islamic texts, hadith, fiqh, or history and receive
              answers grounded exclusively in verified Shia sources — with full citations.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                { icon: BookMarked,  text: "Answers only from verified Shia sources" },
                { icon: ShieldCheck, text: "Full citation — book, author, chapter, page" },
                { icon: Sparkles,    text: "Supports Urdu, English, Arabic, Roman Urdu" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sand-200 text-sm">{text}</span>
                </li>
              ))}
            </ul>

            {/* Disclaimer */}
            <div className="bg-gold-900/30 border border-gold-800 rounded-xl p-4 mb-6">
              <p className="text-gold-200 text-xs leading-relaxed">
                <strong className="text-gold-400">Disclaimer:</strong> Ilm Assistant answers are
                for learning and research only. For final religious rulings, please consult your
                Marja or a qualified scholar.
              </p>
            </div>

            <Link
              href="/ilm-assistant"
              className="inline-flex items-center gap-2 btn-secondary"
            >
              <Sparkles className="w-4 h-4" />
              Preview Ilm Assistant
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — mock chat UI */}
          <div className="bg-navy-800 rounded-2xl border border-navy-700 overflow-hidden shadow-2xl">
            {/* Chat header */}
            <div className="bg-emerald-900 px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-gradient flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Ilm Assistant</p>
                <p className="text-emerald-300 text-xs">Verified Shia Sources Only</p>
              </div>
              <div className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </div>

            {/* Question tabs */}
            <div className="flex gap-2 p-3 border-b border-navy-700">
              {SAMPLE_QA.map((qa, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQ(i)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                    activeQ === i
                      ? "bg-emerald-700 text-white"
                      : "bg-navy-700 text-sand-400 hover:text-white"
                  }`}
                >
                  Example {i + 1}
                </button>
              ))}
            </div>

            {/* Chat messages */}
            <div className="p-4 space-y-4">
              {/* User question */}
              <div className="flex justify-end">
                <div className="bg-emerald-700/50 text-white text-sm rounded-2xl rounded-tr-none px-4 py-3 max-w-xs">
                  {SAMPLE_QA[activeQ].q}
                </div>
              </div>

              {/* AI answer */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-navy-700 text-sand-200 text-sm rounded-2xl rounded-tl-none px-4 py-3">
                    {SAMPLE_QA[activeQ].a}
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 ml-1">
                    <BookMarked className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 text-xs">{SAMPLE_QA[activeQ].source}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input box preview */}
            <div className="p-4 border-t border-navy-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about any Islamic topic..."
                  disabled
                  className="flex-1 bg-navy-700 text-sand-400 text-sm px-4 py-2.5
                             rounded-xl border border-navy-600 cursor-not-allowed"
                />
                <button
                  disabled
                  className="w-10 h-10 bg-emerald-700/50 rounded-xl flex items-center justify-center cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 text-emerald-400" />
                </button>
              </div>
              <p className="text-navy-500 text-xs text-center mt-2">
                Full feature launching soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
