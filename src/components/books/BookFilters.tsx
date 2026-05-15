"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Filter, X } from "lucide-react";
import { CATEGORIES } from "@/lib/constants/categories";
import { MARJAS }     from "@/lib/constants/marjas";

const LANGUAGES = [
  { value: "en", label: "🇬🇧 English" },
  { value: "ur", label: "🇵🇰 Urdu"    },
  { value: "ar", label: "🇸🇦 Arabic"  },
];

const LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "advanced", label: "Advanced" },
];

export function BookFilters() {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) { params.set(key, value);    }
      else       { params.delete(key);         }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const active = (key: string, value: string) => searchParams.get(key) === value;
  const hasAny = ["language", "category", "marja", "level", "verified", "pdf", "audio"]
    .some((k) => searchParams.has(k));

  return (
    <div className="bg-white rounded-2xl border border-sand-200 p-5 space-y-5 sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-navy-800 flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-600" /> Filters
        </h3>
        {hasAny && (
          <button
            onClick={() => router.push(pathname)}
            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Language */}
      <FilterGroup label="Language">
        {LANGUAGES.map((l) => (
          <FilterChip
            key={l.value}
            label={l.label}
            active={active("language", l.value)}
            onClick={() => setParam("language", active("language", l.value) ? null : l.value)}
          />
        ))}
      </FilterGroup>

      {/* Category */}
      <FilterGroup label="Category">
        <div className="max-h-52 overflow-y-auto space-y-1 pr-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              onClick={() => setParam("category", active("category", c.slug) ? null : c.slug)}
              className={`w-full text-left text-xs px-3 py-2 rounded-lg transition-colors ${
                active("category", c.slug)
                  ? "bg-emerald-100 text-emerald-800 font-medium"
                  : "text-navy-700 hover:bg-sand-100"
              }`}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Marja */}
      <FilterGroup label="Marja Related">
        {MARJAS.filter((m) => m.id !== "other").map((m) => (
          <FilterChip
            key={m.id}
            label={m.name.replace("Ayatollah ", "")}
            active={active("marja", m.id)}
            onClick={() => setParam("marja", active("marja", m.id) ? null : m.id)}
          />
        ))}
      </FilterGroup>

      {/* Level */}
      <FilterGroup label="Level">
        {LEVELS.map((l) => (
          <FilterChip
            key={l.value}
            label={l.label}
            active={active("level", l.value)}
            onClick={() => setParam("level", active("level", l.value) ? null : l.value)}
          />
        ))}
      </FilterGroup>

      {/* Toggle filters */}
      <FilterGroup label="Availability">
        {[
          { key: "verified", label: "✓ Verified Source" },
          { key: "pdf",      label: "📄 PDF Available"  },
          { key: "audio",    label: "🎧 Audio Available" },
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center gap-2 cursor-pointer group">
            <div
              onClick={() => setParam(key, searchParams.has(key) ? null : "1")}
              className={`w-9 h-5 rounded-full transition-colors flex items-center ${
                searchParams.has(key) ? "bg-emerald-500" : "bg-sand-300"
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-0.5 ${
                searchParams.has(key) ? "translate-x-4" : "translate-x-0"
              }`} />
            </div>
            <span className="text-xs text-navy-700">{label}</span>
          </label>
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-semibold text-sand-500 uppercase tracking-wider mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-emerald-600 text-white border-emerald-600"
          : "bg-white text-navy-700 border-sand-200 hover:border-emerald-300"
      }`}
    >
      {label}
    </button>
  );
}
