"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ScrollText, Copy, CheckCircle, BookOpen, AlertCircle,
  ArrowRight, Trash2, Github, Code2, RefreshCw,
} from "lucide-react";
import { getAllAdminBooks, deleteAdminBook, exportBookAsCode, type AdminBook } from "@/lib/admin/store";

export default function PublishPage() {
  const [books, setBooks]       = useState<AdminBook[]>([]);
  const [copied, setCopied]     = useState(false);
  const [cleared, setCleared]   = useState(false);
  const [step, setStep]         = useState<"view" | "done">("view");

  useEffect(() => {
    setBooks(getAllAdminBooks());
  }, []);

  const allCode = books.length > 0
    ? `// ── Paste these entries inside the MOCK_BOOKS array in src/lib/mock/data.ts ──\n// Added on ${new Date().toLocaleDateString("en-GB")} via Admin Panel\n\n${books.map(exportBookAsCode).join("\n\n")}`
    : "";

  async function handleCopy() {
    if (!allCode) return;
    await navigator.clipboard.writeText(allCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  function handleClearAll() {
    if (!confirm(`${books.length} books ko localStorage se delete karna chahte hain? Sirf tab karo jab aap code paste kar chuke hon.`)) return;
    books.forEach((b) => deleteAdminBook(b.id));
    setBooks([]);
    setCleared(true);
    setStep("done");
  }

  function handleRemoveOne(id: string) {
    deleteAdminBook(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }

  if (step === "done") {
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="bg-white border border-sand-200 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold text-navy-900 mb-2">Shukriya! Kaam Mukammal Hua</h1>
          <p className="text-sand-500 text-sm mb-6">
            Jab aap ne code paste karke git push kar diya, books live ho jayengi.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/admin" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
              <ArrowRight className="w-4 h-4" /> Dashboard Par Wapas
            </Link>
            <Link href="/admin/books/add" className="flex items-center gap-2 border border-sand-200 text-navy-700 hover:border-emerald-300 font-medium px-5 py-2.5 rounded-xl transition-colors text-sm">
              <BookOpen className="w-4 h-4" /> Nai Book Add Karo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="p-6 lg:p-8 max-w-2xl mx-auto">
        <div className="bg-white border border-sand-200 rounded-2xl p-10 text-center">
          <div className="w-14 h-14 rounded-2xl bg-sand-100 flex items-center justify-center mx-auto mb-4">
            <ScrollText className="w-7 h-7 text-sand-400" />
          </div>
          <h1 className="text-lg font-bold text-navy-800 mb-2">Koi Pending Book Nahi</h1>
          <p className="text-sand-500 text-sm mb-6">
            Abhi tak koi nai book add nahi ki. Pehle "Add Book" se book add karo.
          </p>
          <Link href="/admin/books/add"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm">
            <BookOpen className="w-4 h-4" /> Nai Book Add Karo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Code2 className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-900">Publish Code</h1>
            <p className="text-sand-500 text-sm">
              {books.length} nai book{books.length > 1 ? "en" : ""} publish honi hain
            </p>
          </div>
        </div>
      </div>

      {/* Step-by-step instructions */}
      <div className="bg-navy-900 text-white rounded-2xl p-6 mb-6">
        <h2 className="font-bold text-white mb-5 flex items-center gap-2 text-base">
          <Github className="w-4 h-4 text-emerald-400" />
          Books Ko Permanently Live Karne Ka Tareeqa
        </h2>
        <div className="space-y-4">
          {[
            {
              num: "1",
              title: "Neeche Code Copy Karo",
              desc: "\"Copy Code\" button dabao — sara code clipboard mein aa jayega.",
            },
            {
              num: "2",
              title: "File Kholein: src/lib/mock/data.ts",
              desc: "VS Code ya kisi bhi editor mein yeh file kholein.",
            },
            {
              num: "3",
              title: "MOCK_BOOKS Array Mein Paste Karo",
              desc: "File ke andar MOCK_BOOKS = [ ... ] dhundho. Pehli entry se pehle copied code paste karo.",
            },
            {
              num: "4",
              title: "Save Karo aur GitHub Push Karo",
              desc: "git add . → git commit -m \"new books\" → git push. Vercel auto deploy karega.",
            },
          ].map(({ num, title, desc }) => (
            <div key={num} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                {num}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{title}</p>
                <p className="text-sand-400 text-xs mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Books to publish */}
      <div className="bg-white border border-sand-200 rounded-2xl mb-6">
        <div className="p-5 border-b border-sand-100">
          <h2 className="font-bold text-navy-800 text-sm">Yeh Books Publish Hongi ({books.length})</h2>
        </div>
        <div className="divide-y divide-sand-100 max-h-64 overflow-y-auto">
          {books.map((book) => (
            <div key={book.id} className="flex items-center gap-3 px-5 py-3">
              <div className="w-8 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                   style={{ background: "linear-gradient(135deg, #022c22, #047857)" }}>
                <BookOpen className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-navy-800 text-sm truncate">{book.title}</p>
                <p className="text-sand-500 text-xs">{book.author_name} · {book.language.toUpperCase()}</p>
              </div>
              <button
                onClick={() => handleRemoveOne(book.id)}
                className="p-1.5 text-sand-400 hover:text-red-500 transition-colors"
                title="Is book ko list se hatao"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Code */}
      <div className="bg-white border border-sand-200 rounded-2xl mb-6">
        <div className="p-4 border-b border-sand-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-600" />
            <span className="font-bold text-navy-800 text-sm">Generated TypeScript Code</span>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
              copied
                ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {copied ? (
              <><CheckCircle className="w-4 h-4" /> Copied!</>
            ) : (
              <><Copy className="w-4 h-4" /> Copy Code</>
            )}
          </button>
        </div>
        <div className="overflow-auto max-h-[500px] p-4">
          <pre className="text-xs font-mono text-navy-700 leading-relaxed whitespace-pre-wrap break-words">
            {allCode}
          </pre>
        </div>
      </div>

      {/* Warning + Clear button */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-amber-800 font-semibold text-sm mb-1">
            Code paste karne ke baad hi ye karo:
          </p>
          <p className="text-amber-700 text-xs mb-4">
            Neeche wala button localStorage se in books ko hata dega. Sirf tab dabao jab aap code paste kar chuke hon aur git push bhi kar diya ho.
          </p>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Haan, {books.length} Books Clear Karo (Code Already Paste Kar Liya)
          </button>
        </div>
      </div>

    </div>
  );
}
