"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, BookOpen, ChevronRight } from "lucide-react";
import { MARJAS } from "@/lib/constants/marjas";

export function MarjaPreview() {
  const [selected, setSelected] = useState<string>(MARJAS[0].id);
  const activeMarja = MARJAS.find((m) => m.id === selected)!;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="section-subheading">Fiqh Resources</p>
          <h2 className="section-heading">Marja-Based Fiqh Filter</h2>
          <p className="text-sand-500 mt-2 text-sm max-w-xl mx-auto">
            Select your Marja to browse relevant books, risalah sections, and fiqh resources
            specific to their rulings.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Marja selector */}
          <div className="space-y-2">
            {MARJAS.map((marja) => (
              <button
                key={marja.id}
                onClick={() => setSelected(marja.id)}
                className={`w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl
                            border-2 transition-all duration-200 ${
                  selected === marja.id
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                    : "border-sand-200 bg-white text-navy-700 hover:border-emerald-200 hover:bg-emerald-50/50"
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  selected === marja.id ? "bg-emerald-gradient" : "bg-sand-100"
                }`}>
                  <GraduationCap className={`w-5 h-5 ${selected === marja.id ? "text-white" : "text-sand-400"}`} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{marja.name}</p>
                  <p className="urdu-text text-xs text-sand-500 leading-relaxed">{marja.name_ur}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Content preview */}
          <div className="lg:col-span-2">
            <div className="bg-ivory-100 rounded-2xl border border-sand-200 p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-gradient flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-lg">{activeMarja.name}</h3>
                  <p className="text-sand-500 text-sm mt-1">{activeMarja.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Risalah Amaliyya",  count: "1 book"   },
                  { label: "Fiqh Q&A",           count: "250+ answers" },
                  { label: "Related Books",      count: "45 books" },
                  { label: "Audio Lectures",     count: "12 lectures" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 bg-white rounded-xl p-3 border border-sand-200"
                  >
                    <BookOpen className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-navy-800 text-sm">{item.label}</p>
                      <p className="text-emerald-600 text-xs">{item.count}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href={`/marja/${selected}`}
                className="inline-flex items-center gap-2 btn-primary text-sm"
              >
                Browse {activeMarja.name} Resources
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
