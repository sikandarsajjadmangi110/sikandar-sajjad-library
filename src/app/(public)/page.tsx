import { Suspense }                    from "react";
import Link                            from "next/link";
import { BookOpen, ChevronRight, Star, Sparkles, Users, ScrollText, Upload, Eye, Heart,
         GraduationCap, BookMarked, ShieldCheck, Telescope, Baby, Scale } from "lucide-react";
import { HeroSection }                 from "@/components/home/HeroSection";
import { TodaysNoor }                  from "@/components/home/TodaysNoor";
import { KnowledgeGalaxies }           from "@/components/home/KnowledgeGalaxies";
import { IlmAssistantPreview }         from "@/components/home/IlmAssistantPreview";
import { TrustSection }                from "@/components/home/TrustSection";
import { BookCard, BookCardSkeleton }  from "@/components/books/BookCard";
import { getFeaturedBooks, getRecentBooks } from "@/lib/queries/books";
import { MARJAS }                      from "@/lib/constants/marjas";

export const revalidate = 3600;

// ── Editor's Pick ─────────────────────────────────────────────────────────────
async function EditorsPick() {
  const books    = await getFeaturedBooks(1);
  const featured = books[0];
  if (!featured) return null;

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#fdf8f0" }}>

      {/* Manuscript texture overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(16,185,129,0.06) 0%, transparent 40%)," +
            "radial-gradient(circle at 80% 20%, rgba(217,119,6,0.04) 0%, transparent 40%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-subheading">Curator&apos;s Choice</p>
          <h2 className="section-heading">
            Editor&apos;s{" "}
            <span className="gradient-text">Pick</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">

          {/* Book cover */}
          <div className="relative mx-auto md:mx-0 max-w-xs w-full">
            {/* Glow behind book */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
              style={{ background: "linear-gradient(135deg, #059669, #d97706)" }}
            />
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-cosmic">
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-4 p-8"
                style={{ background: "linear-gradient(135deg, #022c22 0%, #047857 50%, #065f46 100%)" }}
              >
                {/* Islamic geometry on cover */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpolygon fill='%23ffffff' points='30,3 37,21 57,21 41,34 47,53 30,42 13,53 19,34 3,21 23,21'/%3E%3C/svg%3E")`,
                    backgroundSize: "60px 60px",
                  }}
                />
                <BookOpen className="w-16 h-16 text-white/25 relative z-10" />
                <div className="relative z-10 text-center">
                  <p className="text-white text-xl font-bold leading-tight font-display">{featured.title}</p>
                  {featured.title_ur && (
                    <p
                      className="text-gold-300 text-base mt-2"
                      style={{ fontFamily: "Noto Nastaliq Urdu, serif", direction: "rtl", lineHeight: "2.2" }}
                    >
                      {featured.title_ur}
                    </p>
                  )}
                  {featured.author && (
                    <p className="text-emerald-300 text-sm mt-3">{featured.author.name}</p>
                  )}
                </div>
              </div>
            </div>
            {/* Featured ribbon */}
            <div className="absolute -top-3 -right-3 w-14 h-14 bg-gold-gradient rounded-full
                            flex items-center justify-center shadow-noor">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="badge bg-gold-100 text-gold-800 border border-gold-200 mb-4">
              ⭐ Featured Book of the Month
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold text-navy-900 font-display mb-2 leading-tight">
              {featured.title}
            </h3>

            {featured.title_ur && (
              <p
                className="text-gold-700 text-lg mb-3"
                style={{ fontFamily: "Noto Nastaliq Urdu, serif", direction: "rtl", lineHeight: "2.2" }}
              >
                {featured.title_ur}
              </p>
            )}

            {featured.author && (
              <Link
                href={`/author/${featured.author.slug}`}
                className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-600
                           font-medium text-sm mb-4 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-gradient flex items-center justify-center">
                  <BookMarked className="w-3.5 h-3.5 text-white" />
                </div>
                {featured.author.name}
              </Link>
            )}

            {featured.description && (
              <p className="text-navy-600 text-sm leading-relaxed mb-6 line-clamp-4">
                {featured.description}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <Link href={`/read/${featured.slug}`} className="btn-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Read Online
              </Link>
              <Link href={`/book/${featured.slug}`} className="btn-outline flex items-center gap-2">
                Book Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Recently Added ────────────────────────────────────────────────────────────
async function RecentBooks() {
  const books = await getRecentBooks(8);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="section-subheading">Fresh From the Universe</p>
            <h2 className="section-heading">Recently Added Books</h2>
          </div>
          <Link href="/library" className="hidden sm:flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {books.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
        <div className="text-center mt-8 sm:hidden">
          <Link href="/library" className="btn-outline text-sm py-2.5 px-6">
            View All Books
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Marja Fiqh Portal ─────────────────────────────────────────────────────────
function MarjaPortal() {
  const featured = MARJAS.slice(0, 4);
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#fdf8f0" }}>
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 50%, rgba(16,185,129,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <p className="section-subheading">Jurisprudence</p>
            <h2 className="section-heading mb-4">
              Marja Fiqh{" "}
              <span className="gradient-text">Portal</span>
            </h2>
            <p className="text-navy-600 text-sm leading-relaxed mb-8">
              Browse fiqh books, risalah amaliyya, and rulings — filtered by your specific Marja.
              Every fiqh resource is attributed to its source with full transparency.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {featured.map((marja) => (
                <Link
                  key={marja.id}
                  href={`/marja/${marja.id}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-sand-200
                             hover:border-emerald-300 hover:shadow-card-hover transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-gradient flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-navy-800 text-xs leading-tight group-hover:text-emerald-700 transition-colors truncate">
                      {marja.name}
                    </p>
                    <p
                      className="text-sand-500 text-[10px] truncate mt-0.5"
                      style={{ fontFamily: "Noto Nastaliq Urdu, serif", direction: "rtl", lineHeight: "1.8" }}
                    >
                      {marja.name_ur}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="bg-gold-50 border border-gold-200 rounded-2xl p-4 mb-6">
              <div className="flex gap-2">
                <Scale className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-gold-800 text-xs leading-relaxed">
                  <strong>Fiqh Disclaimer:</strong> All fiqh content is for educational reference only.
                  For personal religious obligations, always consult your Marja directly.
                </p>
              </div>
            </div>

            <Link href="/marja" className="btn-primary inline-flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Enter Fiqh Portal
            </Link>
          </div>

          {/* Stats column */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "12+",   label: "Major Marjas", icon: "🎓", color: "emerald" },
              { value: "500+",  label: "Fiqh Books",   icon: "📚", color: "gold" },
              { value: "2,500+",label: "Q&A Answered", icon: "❓", color: "emerald" },
              { value: "15+",   label: "Risalah Books", icon: "📖", color: "gold" },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl p-6 text-center border ${
                  s.color === "emerald"
                    ? "bg-emerald-900 border-emerald-800"
                    : "bg-gold-900 border-gold-800"
                }`}
              >
                <div className="text-3xl mb-2">{s.icon}</div>
                <p className={`text-2xl font-bold ${s.color === "emerald" ? "text-emerald-300" : "text-gold-300"}`}>
                  {s.value}
                </p>
                <p className="text-white/60 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Heritage Preservation ─────────────────────────────────────────────────────
function HeritageMission() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#020810" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(217,119,6,0.07) 0%, transparent 60%)," +
            "radial-gradient(ellipse 40% 40% at 80% 50%, rgba(16,185,129,0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <p className="section-subheading-light">Heritage Preservation Mission</p>
            <h2 className="section-heading-light mb-4">
              Preserving Written Heritage of{" "}
              <span className="gradient-text-gold">Ahlulbayt<sup>ؑ</sup></span>
            </h2>
            <p className="text-sand-400 leading-relaxed mb-8 text-sm">
              Thousands of rare Shia manuscripts, old Urdu books, and classical texts risk being
              lost forever. Join us in digitizing, verifying, and preserving them for future seekers.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: Upload,     title: "Submit Rare Books",   desc: "Upload scanned manuscripts and rare Islamic texts." },
                { icon: Eye,        title: "OCR Correction",      desc: "Volunteer to correct machine-scanned texts for accuracy." },
                { icon: ScrollText, title: "Scholar Verification",desc: "Qualified scholars review and authenticate manuscripts." },
                { icon: Heart,      title: "Magazine Archive",    desc: "Preserving rare Urdu and Shia Islamic magazines." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gold-900/40 border border-gold-700/40
                                  flex items-center justify-center flex-shrink-0 mt-0.5
                                  group-hover:border-gold-500 transition-colors">
                    <Icon className="w-4 h-4 text-gold-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{title}</p>
                    <p className="text-sand-500 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/heritage" className="btn-secondary inline-flex items-center gap-2">
              <Heart className="w-4 h-4" /> Join the Preservation Mission
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "1,200+", label: "Manuscripts Archived",    color: "gold" },
              { value: "350+",   label: "Scholar Verified",        color: "emerald" },
              { value: "80+",    label: "Volunteers",              color: "gold" },
              { value: "25+",    label: "Languages Preserved",     color: "emerald" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`p-6 rounded-2xl border text-center ${
                  stat.color === "gold"
                    ? "bg-gold-900/40 border-gold-700/40"
                    : "bg-emerald-900/40 border-emerald-700/40"
                }`}
              >
                <p className={`text-3xl font-bold mb-1 ${
                  stat.color === "gold" ? "text-gold-300" : "text-emerald-300"
                }`}>
                  {stat.value}
                </p>
                <p className="text-white/60 text-xs">{stat.label}</p>
              </div>
            ))}

            <div
              className="col-span-2 rounded-2xl border p-5"
              style={{
                background: "rgba(16,185,129,0.06)",
                borderColor: "rgba(16,185,129,0.2)",
              }}
            >
              <ScrollText className="w-5 h-5 text-gold-400 mb-3" />
              <p className="text-white/80 text-sm italic leading-relaxed">
                &ldquo;Preserving the written heritage of Ahlulbayt<sup>ؑ</sup> for future generations
                of seekers.&rdquo;
              </p>
              <p className="text-emerald-400 text-xs mt-2 font-medium">
                — Sikandar Sajjad Digital Library Mission
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Halaqa Hub ────────────────────────────────────────────────────────────────
function HalaqaHub() {
  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 50%, rgba(16,185,129,0.05) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Right visual — shown first on mobile, second on desktop */}
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            {[
              { icon: "📖", title: "Weekly Halaqas",      count: "24 active circles",  color: "emerald" },
              { icon: "🎤", title: "Live Lectures",        count: "Every Friday",       color: "gold" },
              { icon: "📚", title: "Book Reading Groups",  count: "12 active groups",   color: "emerald" },
              { icon: "🎓", title: "Scholar Moderated",    count: "8 scholars",         color: "gold" },
            ].map((item) => (
              <div
                key={item.title}
                className={`p-5 rounded-2xl border text-center ${
                  item.color === "emerald"
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-gold-50 border-gold-200"
                }`}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className={`font-semibold text-sm mb-1 ${
                  item.color === "emerald" ? "text-emerald-800" : "text-gold-800"
                }`}>
                  {item.title}
                </p>
                <p className="text-sand-500 text-xs">{item.count}</p>
              </div>
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <p className="section-subheading">Community Learning</p>
            <h2 className="section-heading mb-4">
              Halaqa{" "}
              <span className="gradient-text">Hub</span>
            </h2>
            <p className="text-navy-600 text-sm leading-relaxed mb-6">
              Join scholar-moderated study circles, weekly halaqas, live lectures, and book
              reading groups. Learn together as a community of seekers.
            </p>

            <div className="space-y-3 mb-8">
              {[
                "Scholar-moderated study circles with Q&A",
                "Weekly live lecture recordings and notes",
                "Book club discussions on featured texts",
                "Beginner-friendly Islamic learning tracks",
              ].map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 text-xs">✓</span>
                  </div>
                  <span className="text-navy-700 text-sm">{f}</span>
                </div>
              ))}
            </div>

            <Link href="/halaqa" className="btn-primary inline-flex items-center gap-2">
              <Users className="w-4 h-4" /> Explore Halaqas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Children's Learning ───────────────────────────────────────────────────────
function ChildrensLearning() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #fefce8 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-subheading">The Next Generation</p>
          <h2 className="section-heading">
            Children&apos;s Islamic{" "}
            <span className="gradient-text">Learning</span>
          </h2>
          <p className="text-sand-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            Nurturing the love of Ahlulbayt<sup>ؑ</sup> knowledge from childhood —
            age-appropriate Islamic books, stories, and learning resources.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {[
            { icon: "📖", title: "Story Books",        desc: "Stories of Prophets & Imams",  bg: "bg-emerald-100", text: "text-emerald-800" },
            { icon: "🎨", title: "Coloring Books",     desc: "Creative Islamic learning",    bg: "bg-gold-100",    text: "text-gold-800" },
            { icon: "🧒", title: "Kids Fiqh",          desc: "Simple Islamic rules for kids",bg: "bg-blue-100",    text: "text-blue-800" },
            { icon: "🌙", title: "Duas for Kids",      desc: "Easy supplications to learn",  bg: "bg-purple-100",  text: "text-purple-800" },
          ].map((item) => (
            <Link
              key={item.title}
              href={`/library?category=childrens-books`}
              className={`${item.bg} rounded-2xl p-6 text-center hover:scale-[1.03]
                          transition-all duration-300 group border border-white/60`}
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <p className={`font-bold text-sm ${item.text}`}>{item.title}</p>
              <p className="text-sand-600 text-xs mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/library?category=childrens-books"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Baby className="w-4 h-4" /> Browse Children&apos;s Books
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Researcher Mode ───────────────────────────────────────────────────────────
function ResearcherMode() {
  return (
    <section className="py-20 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <p className="section-subheading">For Scholars & Researchers</p>
          <h2 className="section-heading">
            Researcher{" "}
            <span className="gradient-text">Mode</span>
          </h2>
          <p className="text-sand-500 mt-3 max-w-xl mx-auto text-sm">
            Advanced tools designed for Islamic scholars, students, and researchers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              icon: Telescope,
              title: "Advanced Search",
              desc: "Search by author, era, topic, language, marja, verification status, and more.",
              badge: "Available",
              badgeColor: "bg-emerald-100 text-emerald-700",
            },
            {
              icon: BookMarked,
              title: "Citation Generator",
              desc: "Generate academic citations in MLA, APA, Chicago, and Islamic citation formats.",
              badge: "Coming Soon",
              badgeColor: "bg-gold-100 text-gold-700",
            },
            {
              icon: ScrollText,
              title: "Cross-Reference Tool",
              desc: "Find hadith across multiple collections and compare source texts side-by-side.",
              badge: "Coming Soon",
              badgeColor: "bg-gold-100 text-gold-700",
            },
            {
              icon: ShieldCheck,
              title: "Source Verification",
              desc: "Check original sources, manuscript history, and chain of transmission for any text.",
              badge: "Available",
              badgeColor: "bg-emerald-100 text-emerald-700",
            },
            {
              icon: Sparkles,
              title: "Ilm Assistant",
              desc: "AI research assistant powered exclusively by verified Shia Islamic sources.",
              badge: "Beta",
              badgeColor: "bg-blue-100 text-blue-700",
            },
            {
              icon: Eye,
              title: "Parallel Reading",
              desc: "Read Arabic, Urdu, and English translations simultaneously in split view.",
              badge: "Coming Soon",
              badgeColor: "bg-gold-100 text-gold-700",
            },
          ].map(({ icon: Icon, title, desc, badge, badgeColor }) => (
            <div
              key={title}
              className="bg-white rounded-2xl border border-sand-200 p-6
                         hover:border-emerald-200 hover:shadow-card-hover
                         transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100
                                flex items-center justify-center">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${badgeColor}`}>
                  {badge}
                </span>
              </div>
              <h3 className="font-bold text-navy-900 text-sm mb-2 group-hover:text-emerald-700 transition-colors">
                {title}
              </h3>
              <p className="text-sand-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/library" className="btn-primary inline-flex items-center gap-2">
            <Telescope className="w-4 h-4" /> Start Researching
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Main Homepage ─────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* 1. Hero — Universe of Ahlulbayt Knowledge */}
      <HeroSection />

      {/* 2. Today's Noor — Daily Hadith */}
      <TodaysNoor />

      {/* 3. Editor's Pick */}
      <Suspense fallback={
        <div className="py-20 bg-ivory-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="skeleton h-96 rounded-3xl max-w-4xl mx-auto" />
          </div>
        </div>
      }>
        <EditorsPick />
      </Suspense>

      {/* 4. Knowledge Galaxies */}
      <KnowledgeGalaxies />

      {/* 5. Recently Added Books */}
      <Suspense fallback={
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} />)}
          </div>
        </div>
      }>
        <RecentBooks />
      </Suspense>

      {/* 6. Ilm Assistant Preview */}
      <IlmAssistantPreview />

      {/* 7. Marja Fiqh Portal */}
      <MarjaPortal />

      {/* 8. Heritage Preservation Mission */}
      <HeritageMission />

      {/* 9. Halaqa Hub */}
      <HalaqaHub />

      {/* 10. Researcher Mode */}
      <ResearcherMode />

      {/* 11. Children's Learning */}
      <ChildrensLearning />

      {/* 12. Trust & Verification */}
      <TrustSection />
    </>
  );
}
