import Link from "next/link";

const GALAXIES = [
  {
    slug:   "quran-tafsir",
    name:   "Quran & Tafsir",
    nameUr: "قرآن و تفسیر",
    icon:   "📖",
    glow:   "rgba(251,191,36,0.5)",
    desc:   "The Word of Allah",
    bg:     "radial-gradient(circle at 35% 35%, #fde68a, #d97706, #020810)",
  },
  {
    slug:   "hadith",
    name:   "Hadith",
    nameUr: "احادیث",
    icon:   "📜",
    glow:   "rgba(16,185,129,0.5)",
    desc:   "Sayings of Ahlulbaytؑ",
    bg:     "radial-gradient(circle at 35% 35%, #6ee7b7, #059669, #020810)",
  },
  {
    slug:   "fiqh",
    name:   "Fiqh",
    nameUr: "فقہ",
    icon:   "⚖️",
    glow:   "rgba(99,102,241,0.5)",
    desc:   "Islamic Jurisprudence",
    bg:     "radial-gradient(circle at 35% 35%, #a5b4fc, #4338ca, #020810)",
  },
  {
    slug:   "imam-hussain-karbala",
    name:   "Karbala",
    nameUr: "کربلا",
    icon:   "🌷",
    glow:   "rgba(244,63,94,0.5)",
    desc:   "Imam Hussainؑ & Karbala",
    bg:     "radial-gradient(circle at 35% 35%, #fda4af, #e11d48, #020810)",
  },
  {
    slug:   "nahj-al-balagha",
    name:   "Nahj al-Balagha",
    nameUr: "نہج البلاغہ",
    icon:   "📚",
    glow:   "rgba(217,119,6,0.5)",
    desc:   "Peak of Eloquence",
    bg:     "radial-gradient(circle at 35% 35%, #fcd34d, #b45309, #020810)",
  },
  {
    slug:   "duas-ziyarat",
    name:   "Duas & Ziyarat",
    nameUr: "دعائیں و زیارات",
    icon:   "🌙",
    glow:   "rgba(20,184,166,0.5)",
    desc:   "Supplications & Salutations",
    bg:     "radial-gradient(circle at 35% 35%, #5eead4, #0d9488, #020810)",
  },
  {
    slug:   "akhlaq",
    name:   "Akhlaq",
    nameUr: "اخلاق",
    icon:   "💎",
    glow:   "rgba(34,211,238,0.5)",
    desc:   "Islamic Ethics",
    bg:     "radial-gradient(circle at 35% 35%, #67e8f9, #0891b2, #020810)",
  },
  {
    slug:   "spirituality-irfan",
    name:   "Irfan",
    nameUr: "عرفان",
    icon:   "✨",
    glow:   "rgba(168,85,247,0.5)",
    desc:   "Mysticism & Spirituality",
    bg:     "radial-gradient(circle at 35% 35%, #d8b4fe, #7c3aed, #020810)",
  },
  {
    slug:   "childrens-books",
    name:   "Children",
    nameUr: "بچوں کی کتابیں",
    icon:   "🎈",
    glow:   "rgba(163,230,53,0.5)",
    desc:   "Islamic Learning for Kids",
    bg:     "radial-gradient(circle at 35% 35%, #bef264, #65a30d, #020810)",
  },
  {
    slug:   "rare-manuscripts",
    name:   "Manuscripts",
    nameUr: "نادر مخطوطات",
    icon:   "🗿",
    glow:   "rgba(251,191,36,0.3)",
    desc:   "Rare & Ancient Texts",
    bg:     "radial-gradient(circle at 35% 35%, #fde68a, #92400e, #020810)",
  },
];

export function KnowledgeGalaxies() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#020810" }}>

      {/* Background nebula */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.05) 0%, transparent 70%)," +
            "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(251,191,36,0.04) 0%, transparent 50%)," +
            "radial-gradient(ellipse 40% 40% at 80% 20%, rgba(129,140,248,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Islamic geometry overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpolygon fill='%23ffffff' points='50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Twinkling stars */}
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  `${[1, 1.5, 2][i % 3]}px`,
            height: `${[1, 1.5, 2][i % 3]}px`,
            background: ["#fff", "#fbbf24", "#34d399"][i % 3],
            left: `${(i * 41 + 3) % 100}%`,
            top:  `${(i * 67 + 8) % 100}%`,
            opacity: [0.15, 0.25, 0.4, 0.3][i % 4],
            animation: `twinkle ${2 + (i % 4)}s ease-in-out infinite`,
            animationDelay: `${(i * 0.25) % 4}s`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-subheading-light">Navigate the Universe</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">
            Knowledge{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #34d399, #fbbf24)" }}
            >
              Galaxies
            </span>
          </h2>
          <p className="text-sand-400 max-w-xl mx-auto text-sm leading-relaxed">
            Each galaxy holds a universe of Ahlulbayt<sup>ؑ</sup> wisdom.
            Choose your destination and begin your journey of Ilm.
          </p>
        </div>

        {/* Galaxy grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {GALAXIES.map((galaxy) => (
            <Link
              key={galaxy.slug}
              href={`/library?category=${galaxy.slug}`}
              className="planet-card group"
              style={{ "--planet-glow": galaxy.glow } as React.CSSProperties}
            >
              {/* Planet orb */}
              <div
                className="planet-orb w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
                style={{
                  background: galaxy.bg,
                  boxShadow: `0 0 20px ${galaxy.glow}, 0 0 40px ${galaxy.glow.replace("0.5", "0.12").replace("0.3", "0.08")}`,
                }}
              >
                <span className="text-2xl sm:text-3xl select-none">{galaxy.icon}</span>
              </div>

              {/* Labels */}
              <div className="text-center">
                <p className="text-white text-xs sm:text-sm font-semibold leading-tight
                               group-hover:text-emerald-300 transition-colors duration-300">
                  {galaxy.name}
                </p>
                <p
                  className="text-sand-500 text-xs mt-0.5"
                  style={{
                    fontFamily: "Noto Nastaliq Urdu, serif",
                    direction: "rtl",
                    lineHeight: "2",
                  }}
                >
                  {galaxy.nameUr}
                </p>
                <p className="text-sand-600 text-[10px] mt-1 hidden sm:block leading-tight">
                  {galaxy.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all */}
        <div className="text-center mt-10">
          <Link
            href="/library"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300
                       text-sm font-medium transition-colors border border-emerald-800
                       hover:border-emerald-500 px-6 py-3 rounded-xl"
          >
            Explore All 20+ Galaxies
            <span className="text-gold-400">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
