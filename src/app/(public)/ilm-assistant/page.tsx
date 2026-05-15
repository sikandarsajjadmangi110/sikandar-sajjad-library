"use client";

import { useState, useRef } from "react";
import { Sparkles, Send, BookMarked, AlertTriangle, Globe, Loader2 } from "lucide-react";

interface Message {
  id:      string;
  role:    "user" | "assistant";
  content: string;
  sources?: { book: string; author: string; page?: string }[];
}

const EXAMPLE_QUESTIONS = [
  "What does Imam Ali (as) say about patience in Nahj al-Balagha?",
  "Explain the significance of Ashura according to Shia hadith",
  "What is the ruling on Salat al-Jumua according to Ayatollah Sistani?",
  "Tell me about Sahifa Sajjadiya and its importance",
  "What are the conditions of Wilayah according to Shia scholars?",
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ur", label: "اردو" },
  { value: "ar", label: "عربي" },
];

export default function IlmAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input,    setInput]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [lang,     setLang]     = useState("en");
  const bottomRef  = useRef<HTMLDivElement>(null);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    // Scroll to bottom
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);

    try {
      const res = await fetch("/api/ilm-assistant", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ question: text, language: lang }),
      });
      const data = await res.json();
      const assistantMsg: Message = {
        id:      (Date.now() + 1).toString(),
        role:    "assistant",
        content: data.answer ?? "I could not find a verified answer to this question. Please consult a qualified scholar.",
        sources: data.sources,
      };
      setMessages((m) => [...m, assistantMsg]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id:      (Date.now() + 1).toString(),
          role:    "assistant",
          content: "There was a problem fetching an answer. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }

  return (
    <div className="bg-ivory-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-navy-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-gradient flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Ilm Assistant</h1>
              <p className="text-emerald-400 text-xs">Verified Shia Sources Only • Citation Required</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-gold-900/40 border border-gold-800 rounded-xl p-3">
            <div className="flex gap-2">
              <AlertTriangle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
              <p className="text-gold-200 text-xs leading-relaxed">
                <strong className="text-gold-400">Disclaimer:</strong> This answer is for learning
                and research only. For final religious rulings, please consult your Marja or a
                qualified scholar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 flex flex-col">

        {/* Empty state */}
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-gradient flex items-center justify-center mb-5 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-navy-800 mb-2">Ask About Ahlulbayt Knowledge</h2>
            <p className="text-sand-500 text-sm max-w-md mb-8">
              Ask any question about Islamic texts, hadith, fiqh, history, or duas.
              Every answer comes with full citations from verified Shia sources.
            </p>

            <div className="grid sm:grid-cols-2 gap-2 w-full max-w-2xl">
              {EXAMPLE_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-sm bg-white border border-sand-200 hover:border-emerald-300 hover:bg-emerald-50 rounded-xl px-4 py-3 text-navy-700 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.length > 0 && (
          <div className="flex-1 space-y-4 mb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                {msg.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-emerald-gradient flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}

                <div className={`max-w-xl ${msg.role === "user" ? "items-end" : ""}`}>
                  <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-emerald-600 text-white rounded-tr-none"
                      : "bg-white border border-sand-200 text-navy-800 rounded-tl-none shadow-sm"
                  }`}>
                    {msg.content}
                  </div>

                  {/* Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {msg.sources.map((src, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <BookMarked className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700 text-xs font-medium">
                            {src.book}
                          </span>
                          <span className="text-sand-500 text-xs">— {src.author}</span>
                          {src.page && <span className="text-sand-400 text-xs">p. {src.page}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-gradient flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-sand-200 rounded-2xl rounded-tl-none px-4 py-3">
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}

        {/* Input bar */}
        <div className="bg-white border border-sand-200 rounded-2xl p-3 shadow-sm">
          {/* Language selector */}
          <div className="flex gap-1 mb-2">
            <Globe className="w-4 h-4 text-sand-400 self-center mr-1" />
            {LANGUAGES.map((l) => (
              <button
                key={l.value}
                onClick={() => setLang(l.value)}
                className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                  lang === l.value
                    ? "bg-emerald-100 text-emerald-700 font-medium"
                    : "text-sand-500 hover:text-navy-700"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
              placeholder="Ask about any Islamic topic — hadith, fiqh, history, duas..."
              className="flex-1 text-sm bg-transparent outline-none text-navy-800 placeholder-sand-400 py-2"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="w-9 h-9 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed
                         text-white rounded-xl flex items-center justify-center transition-colors"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
