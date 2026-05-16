"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, BookOpen, Sparkles, ChevronRight, Star, Telescope } from "lucide-react";

const QUICK_SEARCHES = [
  "Nahj al-Balagha", "Imam Hussain", "Duas", "Fiqh Sistani", "Karbala"
];

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">

      {/* ── Deep space background ── */}
      <div className="absolute inset-0 bg-cosmic-gradient" />

      {/* ── Radial noor glow (top center) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16,185,129,0.15) 0%, transparent 70%), " +
            "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(251,191,36,0.08) 0%, transparent 60%)",
        }}
      />

      {/* ── Islamic geometry overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='none' stroke='rgba(16,185,129,0.06)' stroke-width='0.5'%3E%3Cpolygon points='60,10 71,40 103,40 78,58 88,88 60,70 32,88 42,58 17,40 49,40'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
        }}
      />

      {/* ── Floating star particles ── */}
      {[...Array(35)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width:  `${[1, 1.5, 2, 2.5][i % 4]}px`,
            height: `${[1, 1.5, 2, 2.5][i % 4]}px`,
            left:   `${(i * 37 + 11) % 100}%`,
            top:    `${(i * 53 + 7) % 100}%`,
            opacity: [0.2, 0.35, 0.5, 0.6, 0.3][i % 5],
            animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.3) % 4}s`,
          }}
        />
      ))}

      {/* ── Large decorative Arabic calligraphy ── */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.035] select-none hidden xl:block pointer-events-none">
        <p
          className="text-white leading-none"
          style={{
            fontFamily: "Noto Naskh Arabic, serif",
            fontSize: "clamp(200px, 22vw, 320px)",
            direction: "rtl",
          }}
        >
          علم
        </p>
      </div>

      {/* ── Floating planet orbs (decorative) ── */}
      <div
        className="absolute right-10 top-20 w-24 h-24 rounded-full opacity-20 hidden lg:block pointer-events-none animate-float-slow"
        style={{ background: "radial-gradient(circle at 35% 35%, #34d399, #047857, #020810)" }}
      />
      <div
        className="absolute right-48 bottom-20 w-14 h-14 rounded-full opacity-15 hidden xl:block pointer-events-none animate-float"
        style={{
          background: "radial-gradient(circle at 35% 35%, #fcd34d, #d97706, #78350f)",
          animationDelay: "2s",
        }}
      />
      <div
        className="absolute right-20 top-1/2 w-8 h-8 rounded-full opacity-20 hidden xl:block pointer-events-none animate-float"
        style={{
          background: "radial-gradient(circle at 35% 35%, #818cf8, #4338ca, #1e1b4b)",
          animationDelay: "4s",
        }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm
                          border border-emerald-500/30 rounded-full px-4 py-2 mb-7 animate-fade-in">
            <Telescope className="w-4 h-4 text-gold-400" />
            <span className="text-white/90 text-sm font-medium">
              Ahlulbayt<sup className="text-gold-300">ؑ</sup> Knowledge Universe
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Main heading */}
          <h1
            className="text-4xl sm:text-5xl lg:text-[3.75rem] font-bold text-white leading-[1.1] mb-4"
            style={{ animationDelay: "0.1s" }}
          >
            A Universe of{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #34d399, #fbbf24, #34d399)",
                backgroundSize: "200% auto",
                animation: "textShimmer 4s linear infinite",
              }}
            >
              Ahlulbayt<sup className="text-gold-300 text-2xl">ؑ</sup>
            </span>{" "}
            Knowledge
          </h1>

          {/* Urdu tagline */}
          <p
            className="text-gold-300 text-lg sm:text-xl mb-3 opacity-90"
            style={{
              fontFamily: "Noto Nastaliq Urdu, serif",
              direction: "rtl",
              lineHeight: "2.2",
            }}
          >
            علمِ اہلِ بیتؑ کا ڈیجیٹل کائنات
          </p>

          {/* Subtitle */}
          <p className="text-emerald-200/80 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
            Every book is a planet, every topic a galaxy, every hadith a star — and every
            seeker, a traveler through the boundless universe of Ahlulbayt<sup>ؑ</sup> wisdom.
          </p>

          {/* ── Search bar ── */}
          <form onSubmit={handleSearch} className="mb-5">
            <div className="flex gap-2 p-1.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20
                            hover:border-emerald-500/40 transition-all duration-300 shadow-glass">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search books, hadiths, duas, authors..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white text-navy-900
                             placeholder-sand-400 focus:outline-none focus:ring-2
                             focus:ring-emerald-400 text-sm sm:text-base"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-gold-600 hover:bg-gold-500 text-white font-bold
                           rounded-xl transition-all duration-300 shadow-noor-sm
                           hover:shadow-noor whitespace-nowrap hover:-translate-y-0.5"
              >
                Search
              </button>
            </div>

            {/* Quick searches */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="text-emerald-400/70 text-xs py-1">Quick:</span>
              {QUICK_SEARCHES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => router.push(`/search?q=${encodeURIComponent(s)}`)}
                  className="text-xs px-3 py-1.5 bg-white/8 hover:bg-white/15
                             border border-white/15 hover:border-emerald-400/40
                             text-white/70 hover:text-white rounded-full
                             transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </form>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <Link href="/library" className="btn-secondary flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Enter the Library
            </Link>
            <Link href="/ilm-assistant" className="btn-ghost-light flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold-300" />
              Ask Ilm Assistant
            </Link>
            <Link href="/knowledge-tree" className="flex items-center gap-2 text-white/70 hover:text-white
                                                    text-sm font-medium py-3 px-4 transition-colors">
              Knowledge Tree
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            {[
              { value: "5,000+",  label: "Verified Books",    icon: "📚" },
              { value: "20+",     label: "Languages",          icon: "🌐" },
              { value: "100+",    label: "Scholar Reviewed",   icon: "✅" },
              { value: "50,000+", label: "Seekers of Ilm",     icon: "🌙" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="flex items-center gap-1.5 justify-center mb-0.5">
                  <span className="text-lg">{stat.icon}</span>
                  <p className="text-2xl font-bold text-gold-300 group-hover:text-gold-200 transition-colors">
                    {stat.value}
                  </p>
                </div>
                <p className="text-emerald-300/70 text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-ivory-100 to-transparent pointer-events-none" />
    </section>
  );
}
