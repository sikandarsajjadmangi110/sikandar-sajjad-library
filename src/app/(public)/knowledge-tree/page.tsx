"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, BookOpen } from "lucide-react";

const TREE_NODES = [
  {
    id:       "quran",
    label:    "Quran",
    label_ar: "قُرآن",
    color:    "emerald",
    children: [
      {
        id:       "tafsir",
        label:    "Tafsir",
        label_ar: "تفسیر",
        color:    "emerald",
        children: [
          {
            id:       "hadith",
            label:    "Hadith of Ahlulbaytؑ",
            label_ar: "احادیث اہلِ بیتؑ",
            color:    "gold",
            children: [
              { id: "fiqh",    label: "Fiqh Ruling",       label_ar: "فقہی حکم",     color: "navy",    children: [] },
              { id: "history", label: "Historical Context", label_ar: "تاریخی پس منظر", color: "amber",   children: [] },
              { id: "akhlaq",  label: "Akhlaq",             label_ar: "اخلاق",         color: "purple",  children: [] },
            ],
          },
        ],
      },
      {
        id:       "aqaed",
        label:    "Aqaed / Beliefs",
        label_ar: "عقائد",
        color:    "blue",
        children: [
          { id: "wilayah",  label: "Wilayah",  label_ar: "ولایت",   color: "emerald", children: [] },
          { id: "imamate",  label: "Imamate",  label_ar: "امامت",   color: "gold",    children: [] },
        ],
      },
    ],
  },
];

const COLOR_MAP: Record<string, string> = {
  emerald: "bg-emerald-100 border-emerald-300 text-emerald-800 hover:bg-emerald-200",
  gold:    "bg-gold-100 border-gold-300 text-gold-800 hover:bg-gold-200",
  navy:    "bg-navy-100 border-navy-300 text-navy-800 hover:bg-navy-200",
  amber:   "bg-amber-100 border-amber-300 text-amber-800 hover:bg-amber-200",
  purple:  "bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200",
  blue:    "bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200",
};

const EXAMPLE_PATH = [
  { step: "Quranic Verse",              href: "/library/quran-tafsir"   },
  { step: "Tafsir",                     href: "/library/quran-tafsir"   },
  { step: "Hadith of Ahlulbaytؑ",       href: "/library/hadith"         },
  { step: "Fiqh Ruling",               href: "/library/fiqh"           },
  { step: "Historical Context",        href: "/library/history"        },
  { step: "Recommended Books",         href: "/library"                },
];

function TreeNode({ node, depth = 0 }: { node: typeof TREE_NODES[0]; depth?: number }) {
  const [expanded, setExpanded] = useState(depth === 0);
  const style = COLOR_MAP[node.color] ?? COLOR_MAP.emerald;

  return (
    <div className={`${depth > 0 ? "ml-8 mt-3 border-l-2 border-sand-200 pl-4" : ""}`}>
      <button
        onClick={() => setExpanded((e) => !e)}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${style}`}
      >
        <span>{node.label}</span>
        <span className="arabic-text text-xs opacity-70">{node.label_ar}</span>
        {node.children.length > 0 && (
          <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${expanded ? "rotate-90" : ""}`} />
        )}
      </button>

      {expanded && node.children.length > 0 && (
        <div className="mt-1">
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child as any} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function KnowledgeTreePage() {
  return (
    <div className="bg-ivory-100 min-h-screen">
      <div className="bg-emerald-gradient py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Knowledge Tree</h1>
          <p className="text-emerald-200">
            A visual learning map connecting the branches of Ahlulbayt<sup>ؑ</sup> knowledge.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Tree */}
          <div>
            <h2 className="font-bold text-navy-800 text-lg mb-5">Interactive Knowledge Map</h2>
            <p className="text-sand-500 text-sm mb-5">
              Click any node to expand and explore connected branches of Islamic knowledge.
            </p>
            {TREE_NODES.map((node) => (
              <TreeNode key={node.id} node={node} />
            ))}
          </div>

          {/* Example learning path */}
          <div>
            <h2 className="font-bold text-navy-800 text-lg mb-5">Example Learning Path</h2>
            <p className="text-sand-500 text-sm mb-5">
              Follow a structured path from Quranic verse all the way to recommended books.
            </p>

            <div className="space-y-3">
              {EXAMPLE_PATH.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-gradient flex items-center justify-center flex-shrink-0 text-white text-xs font-bold shadow">
                    {i + 1}
                  </div>
                  <Link
                    href={step.href}
                    className="flex-1 flex items-center justify-between bg-white border border-sand-200 hover:border-emerald-300 rounded-xl px-4 py-3 text-sm text-navy-800 font-medium transition-colors group"
                  >
                    {step.step}
                    <ChevronRight className="w-4 h-4 text-sand-400 group-hover:text-emerald-600" />
                  </Link>
                  {i < EXAMPLE_PATH.length - 1 && (
                    <div className="absolute ml-4 mt-11 h-3 w-px bg-sand-200" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
              <BookOpen className="w-6 h-6 text-emerald-700 mb-2" />
              <h3 className="font-bold text-navy-800 mb-1">Start Exploring</h3>
              <p className="text-navy-600 text-sm mb-4">
                Every node in the tree links to curated verified books in the library.
              </p>
              <Link href="/library" className="btn-primary text-sm inline-flex items-center gap-2">
                Browse the Library <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
