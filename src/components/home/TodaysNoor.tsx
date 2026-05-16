"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, BookMarked } from "lucide-react";

const DAILY_HADITH = [
  {
    arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
    urdu: "علم حاصل کرنا ہر مسلمان پر فرض ہے۔",
    english: "Seeking knowledge is an obligation upon every Muslim.",
    source: "Prophet Muhammad (saw)",
    ref: "Bihar al-Anwar, Vol. 1, p. 177",
  },
  {
    arabic: "قِيمَةُ كُلِّ امْرِئٍ مَا يُحْسِنُهُ",
    urdu: "ہر انسان کی قدر و قیمت اس کے علم و ہنر میں ہے۔",
    english: "The value of every person is what he knows.",
    source: "Imam Ali ibn Abi Talib (as)",
    ref: "Nahj al-Balagha, Hikam 81",
  },
  {
    arabic: "اَلْعِلْمُ نُورٌ يَقْذِفُهُ اللهُ فِي قَلْبِ مَنْ يَشَاءُ",
    urdu: "علم ایک نور ہے جسے اللہ جس کے دل میں چاہے ڈال دیتا ہے۔",
    english: "Knowledge is a light that Allah casts into the heart of whom He wills.",
    source: "Imam Ja'far al-Sadiq (as)",
    ref: "Al-Kafi, Vol. 1, p. 221",
  },
  {
    arabic: "كُنْ عَالِماً أَوْ مُتَعَلِّماً أَوْ مُسْتَمِعاً أَوْ مُحِبّاً",
    urdu: "عالم بنو یا طالبِ علم یا سننے والے یا محبِ علم۔",
    english: "Be a scholar, a student, a listener, or a lover of knowledge.",
    source: "Imam Ali ibn Abi Talib (as)",
    ref: "Ghurar al-Hikam, No. 7061",
  },
];

export function TodaysNoor() {
  const [idx, setIdx] = useState(0);
  const hadith = DAILY_HADITH[idx];

  const prev = () => setIdx((i) => (i - 1 + DAILY_HADITH.length) % DAILY_HADITH.length);
  const next = () => setIdx((i) => (i + 1) % DAILY_HADITH.length);

  return (
    <section className="py-14 relative overflow-hidden">
      {/* Deep cosmic background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #022c22 0%, #030d1c 50%, #022c22 100%)",
        }}
      />

      {/* Noor radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(251,191,36,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Islamic geometry */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23fbbf24'%3E%3Cpolygon points='40,4 48,28 73,28 52,44 59,68 40,54 21,68 28,44 7,28 32,28'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Twinkling stars */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width:  `${[1, 1.5, 2][i % 3]}px`,
            height: `${[1, 1.5, 2][i % 3]}px`,
            left:   `${(i * 47 + 5) % 100}%`,
            top:    `${(i * 61 + 12) % 100}%`,
            opacity: [0.2, 0.35, 0.45][i % 3],
            animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.4) % 3}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">

        {/* Label */}
        <div className="inline-flex items-center gap-2 mb-6">
          <Star className="w-4 h-4 text-gold-400 fill-gold-400 animate-noor-pulse" />
          <span className="text-gold-400 text-xs font-bold uppercase tracking-[0.25em]">
            Today&apos;s Noor — Daily Hadith
          </span>
          <Star className="w-4 h-4 text-gold-400 fill-gold-400 animate-noor-pulse" style={{ animationDelay: "0.5s" }} />
        </div>

        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mb-6 opacity-50">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gold-500" />
          <span className="text-gold-500 text-lg">✦</span>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gold-500" />
        </div>

        {/* Arabic text */}
        <p
          className="text-white text-2xl sm:text-3xl mb-5 leading-loose"
          style={{
            fontFamily: "Noto Naskh Arabic, serif",
            direction: "rtl",
            textShadow: "0 0 30px rgba(251,191,36,0.3)",
          }}
        >
          {hadith.arabic}
        </p>

        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mb-5 opacity-30">
          <div className="h-px flex-1 max-w-[60px] bg-emerald-500" />
          <span className="text-emerald-500 text-sm">◆</span>
          <div className="h-px flex-1 max-w-[60px] bg-emerald-500" />
        </div>

        {/* English */}
        <p className="text-gold-200 text-lg sm:text-xl italic font-medium mb-3 leading-relaxed">
          &ldquo;{hadith.english}&rdquo;
        </p>

        {/* Urdu */}
        <p
          className="text-emerald-300 text-base mb-6"
          style={{
            fontFamily: "Noto Nastaliq Urdu, serif",
            direction: "rtl",
            lineHeight: "2.4",
          }}
        >
          {hadith.urdu}
        </p>

        {/* Source */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10
                        rounded-full px-4 py-2 mb-6">
          <BookMarked className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-emerald-300 text-sm font-semibold">{hadith.source}</span>
          <span className="text-white/30 text-xs">·</span>
          <span className="text-sand-400 text-xs">{hadith.ref}</span>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                       text-white/60 hover:text-white hover:border-emerald-400 transition-all duration-200"
            aria-label="Previous hadith"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {DAILY_HADITH.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === idx
                  ? "bg-gold-400 scale-125"
                  : "bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}

          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                       text-white/60 hover:text-white hover:border-emerald-400 transition-all duration-200"
            aria-label="Next hadith"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
