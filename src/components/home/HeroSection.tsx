"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, BookOpen, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-emerald-gradient" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:  `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Arabic calligraphy watermark */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-5 select-none hidden lg:block">
        <p className="arabic-text text-white text-[200px] leading-none">علم</p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1,  y:  0  }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
                       border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-gold-300" />
            <span className="text-white/90 text-sm font-medium">
              Premium Shia Islamic Digital Library
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1,  y:  0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3"
          >
            The Sikandar Sajjad{" "}
            <span className="text-gold-300">Digital Library</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1,  y:  0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-emerald-200 text-lg sm:text-xl font-medium mb-4"
          >
            Preserving Ahlulbayt<sup>ؑ</sup> Knowledge for the Digital Age
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1,  y:  0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-emerald-100/80 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl"
          >
            Explore verified Shia Islamic books, hadith, fiqh, history, duas, ziyarat,
            lectures, rare manuscripts, and scholarly resources — all in one modern
            digital library.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1,  y:  0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onSubmit={handleSearch}
            className="flex gap-2 mb-8"
          >
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sand-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books, authors, topics, duas..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white text-navy-900
                           placeholder-sand-400 focus:outline-none focus:ring-2
                           focus:ring-gold-400 shadow-lg text-sm sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-gold-600 hover:bg-gold-700 text-white font-semibold
                         rounded-xl transition-colors shadow-lg whitespace-nowrap"
            >
              Search
            </button>
          </motion.form>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1,  y:  0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/library" className="flex items-center gap-2 btn-secondary">
              <BookOpen className="w-4 h-4" />
              Explore Library
            </Link>
            <Link
              href="/ilm-assistant"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20
                         backdrop-blur-sm border border-white/30 text-white font-semibold
                         px-6 py-3 rounded-xl transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-gold-300" />
              Ask Ilm Assistant
            </Link>
            <Link
              href="/knowledge-tree"
              className="flex items-center gap-2 bg-transparent hover:bg-white/10
                         border border-white/20 text-white/80 hover:text-white font-semibold
                         px-6 py-3 rounded-xl transition-all duration-200"
            >
              Browse by Topic
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-white/10"
          >
            {[
              { value: "5,000+",  label: "Verified Books" },
              { value: "20+",     label: "Languages" },
              { value: "100+",    label: "Scholar Reviewed" },
              { value: "50,000+", label: "Readers" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-gold-300">{stat.value}</p>
                <p className="text-emerald-200 text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
