import Link         from "next/link";
import { GraduationCap, BookOpen, ChevronRight } from "lucide-react";
import { MARJAS }   from "@/lib/constants/marjas";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Marja-Based Fiqh" };

export default function MarjaPage() {
  return (
    <div className="bg-ivory-100 min-h-screen">
      <div className="bg-emerald-gradient py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold-300 text-xs uppercase tracking-widest mb-3">Fiqh Resources</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Marja-Based Fiqh Filter
          </h1>
          <p className="text-emerald-200 text-sm max-w-xl mx-auto leading-relaxed">
            Select your Marja to browse relevant books, risalah amaliyya sections, and fiqh
            resources specific to their rulings. All content linked to original sources.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 gap-5">
          {MARJAS.map((marja) => (
            <Link
              key={marja.id}
              href={`/marja/${marja.id}`}
              className="card-library p-6 group flex gap-4"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-gradient flex items-center justify-center flex-shrink-0 shadow-md">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-navy-800 text-lg group-hover:text-emerald-700 transition-colors">
                  {marja.name}
                </h2>
                <p className="urdu-text text-gold-700 text-sm">{marja.name_ur}</p>
                <p className="text-sand-500 text-xs mt-2 leading-relaxed line-clamp-2">
                  {marja.description}
                </p>
                <div className="flex items-center gap-1 mt-3 text-emerald-600 text-xs font-medium">
                  <BookOpen className="w-3.5 h-3.5" />
                  Browse Resources
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-amber-800 text-sm leading-relaxed">
            <strong className="text-amber-900">Important:</strong> Fiqh content on this website
            is provided for learning and research purposes only. For binding religious rulings,
            please directly consult your Marja or a qualified Islamic scholar.
          </p>
        </div>
      </div>
    </div>
  );
}
