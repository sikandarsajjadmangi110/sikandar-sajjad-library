import { Suspense }                    from "react";
import Link                            from "next/link";
import { BookOpen, ChevronRight }      from "lucide-react";
import { HeroSection }                 from "@/components/home/HeroSection";
import { CategoryGrid }                from "@/components/home/CategoryGrid";
import { IlmAssistantPreview }         from "@/components/home/IlmAssistantPreview";
import { MarjaPreview }                from "@/components/home/MarjaPreview";
import { HeritageSection }             from "@/components/home/HeritageSection";
import { BookCard, BookCardSkeleton }  from "@/components/books/BookCard";
import { getFeaturedBooks, getRecentBooks } from "@/lib/queries/books";

export const revalidate = 3600;

async function FeaturedBook() {
  const books    = await getFeaturedBooks(1);
  const featured = books[0];
  if (!featured) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="section-subheading">Editor's Pick</p>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[3/4] max-w-xs rounded-2xl overflow-hidden shadow-2xl bg-emerald-gradient mx-auto md:mx-0 flex items-center justify-center">
            <div className="text-center px-6">
              <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="text-white text-lg font-bold leading-tight">{featured.title}</p>
              {featured.title_ar && (
                <p className="arabic-text text-white/70 text-base mt-2">{featured.title_ar}</p>
              )}
            </div>
          </div>
          <div>
            <span className="badge bg-gold-100 text-gold-800 border border-gold-200 mb-3">⭐ Featured Book</span>
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 font-display mb-2">{featured.title}</h2>
            {featured.title_ur && <p className="urdu-text text-gold-700 text-xl mb-2">{featured.title_ur}</p>}
            <p className="text-emerald-700 font-medium mb-4">{featured.author?.name}</p>
            <p className="text-navy-600 text-sm leading-relaxed mb-6 line-clamp-4">{featured.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/read/${featured.slug}`} className="btn-primary flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Read Online
              </Link>
              <Link href={`/book/${featured.slug}`} className="btn-outline flex items-center gap-2">
                View Details <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

async function RecentBooks() {
  const books = await getRecentBooks(8);
  return (
    <section className="py-16 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="section-subheading">Fresh Additions</p>
            <h2 className="section-heading">Recently Added</h2>
          </div>
          <Link href="/library" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {books.map((book) => <BookCard key={book.id} book={book} />)}
        </div>
      </div>
    </section>
  );
}

async function LanguageSections() {
  const allBooks = await getRecentBooks(20);
  const sections = [
    { label: "🇵🇰 Urdu Books",   labelUr: "اردو کتابیں",    href: "/library?language=ur", books: allBooks.filter((b) => b.language === "ur").slice(0, 4) },
    { label: "🇬🇧 English Books", labelUr: "انگریزی کتابیں", href: "/library?language=en", books: allBooks.filter((b) => b.language === "en").slice(0, 4) },
    { label: "🇸🇦 Arabic Books",  labelUr: "عربی کتابیں",    href: "/library?language=ar", books: allBooks.filter((b) => b.language === "ar").slice(0, 4) },
  ];
  return (
    <>
      {sections.map((sec) => sec.books.length > 0 && (
        <section key={sec.href} className="py-12 bg-white border-t border-sand-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-navy-900">{sec.label}</h3>
                <span className="urdu-text text-sand-500 text-sm">{sec.labelUr}</span>
              </div>
              <Link href={sec.href} className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {sec.books.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

function DailyBanner() {
  return (
    <section className="py-10 bg-emerald-gradient">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-emerald-200 text-xs uppercase tracking-widest mb-2">Daily Hadith</p>
        <p className="arabic-text text-white text-xl mb-2 leading-loose">
          طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
        </p>
        <p className="text-gold-200 text-base italic mb-1">
          "Seeking knowledge is an obligation upon every Muslim."
        </p>
        <p className="urdu-text text-emerald-200 text-sm">علم حاصل کرنا ہر مسلمان پر فرض ہے۔</p>
        <p className="text-emerald-300 text-xs mt-1">— Prophet Muhammad (saw) | Bihar al-Anwar</p>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <DailyBanner />

      <Suspense fallback={<div className="py-16 bg-white"><div className="max-w-7xl mx-auto px-4 skeleton h-64 rounded-2xl" /></div>}>
        <FeaturedBook />
      </Suspense>

      <CategoryGrid />

      <Suspense fallback={
        <div className="py-16 bg-ivory-100">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <BookCardSkeleton key={i} />)}
          </div>
        </div>
      }>
        <RecentBooks />
      </Suspense>

      <Suspense fallback={null}>
        <LanguageSections />
      </Suspense>

      <IlmAssistantPreview />
      <MarjaPreview />
      <HeritageSection />

      {/* Halaqa Hub Teaser */}
      <section className="py-16 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="section-subheading text-gold-400">Community Learning</p>
          <h2 className="text-3xl font-bold text-white mb-4">Halaqa Hub</h2>
          <p className="text-sand-300 mb-6 text-sm leading-relaxed">
            Join scholar-moderated study circles, weekly halaqas, live lectures, and book reading groups.
          </p>
          <Link href="/halaqa" className="btn-secondary inline-flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Explore Halaqas
          </Link>
        </div>
      </section>
    </>
  );
}
