import { notFound }    from "next/navigation";
import Link            from "next/link";
import Image           from "next/image";
import {
  BookOpen, Download, Headphones, Bookmark, ShieldCheck,
  BookMarked, Star, Clock, Globe, ChevronRight, AlertTriangle,
} from "lucide-react";
import { getBookBySlug, getRelatedBooks, incrementBookView } from "@/lib/queries/books";
import { BookCard }    from "@/components/books/BookCard";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = await getBookBySlug(params.slug);
  if (!book) return { title: "Book Not Found" };
  return {
    title:       book.title,
    description: book.description ?? undefined,
    openGraph: {
      title:  book.title,
      images: book.cover_image_url ? [book.cover_image_url] : [],
    },
  };
}

const BADGE_STYLES: Record<string, string> = {
  verified_source:  "bg-emerald-100 text-emerald-800 border-emerald-200",
  scholar_reviewed: "bg-purple-100 text-purple-800 border-purple-200",
  classical_text:   "bg-amber-100 text-amber-800 border-amber-200",
  audio_available:  "bg-violet-100 text-violet-800 border-violet-200",
  fiqh_sensitive:   "bg-red-100 text-red-800 border-red-200",
  citation_ready:   "bg-teal-100 text-teal-800 border-teal-200",
};

export default async function BookPage({ params }: Props) {
  const book = await getBookBySlug(params.slug);
  if (!book) notFound();

  // Fire-and-forget view increment (non-blocking)
  incrementBookView(book.id).catch(() => {});

  const related = await getRelatedBooks(book, 4);

  const LANGUAGE_LABEL: Record<string, string> = {
    en: "English", ur: "Urdu", ar: "Arabic", multi: "Multiple"
  };

  return (
    <div className="bg-ivory-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm">
          <Link href="/"        className="text-sand-500 hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3 h-3 text-sand-400" />
          <Link href="/library" className="text-sand-500 hover:text-emerald-700">Library</Link>
          <ChevronRight className="w-3 h-3 text-sand-400" />
          {book.category && (
            <>
              <Link href={`/library/${book.category.slug}`} className="text-sand-500 hover:text-emerald-700">
                {book.category.name}
              </Link>
              <ChevronRight className="w-3 h-3 text-sand-400" />
            </>
          )}
          <span className="text-navy-700 font-medium truncate max-w-xs">{book.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left — Cover + Actions */}
          <div className="lg:col-span-1">
            {/* Cover */}
            <div className="relative aspect-[3/4] w-full max-w-xs mx-auto rounded-2xl overflow-hidden shadow-xl bg-sand-200 mb-6">
              {book.cover_image_url ? (
                <Image src={book.cover_image_url} alt={book.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-emerald-gradient">
                  <BookOpen className="w-16 h-16 text-white/50" />
                  <p className="text-white/70 text-center text-sm px-4 font-medium">{book.title}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {book.pdf_available && (
                <Link href={`/read/${book.slug}`} className="btn-primary w-full flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4" /> Read Online
                </Link>
              )}
              {book.download_allowed && book.pdf_url && (
                <a
                  href={book.pdf_url}
                  download
                  className="btn-outline w-full flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              )}
              {book.audio_available && (
                <button className="w-full flex items-center justify-center gap-2 border-2 border-violet-400 text-violet-700 hover:bg-violet-50 font-semibold px-6 py-3 rounded-xl transition-colors">
                  <Headphones className="w-4 h-4" /> Listen Audio
                </button>
              )}
              <button className="w-full flex items-center justify-center gap-2 bg-sand-100 hover:bg-sand-200 text-navy-700 font-semibold px-6 py-3 rounded-xl transition-colors">
                <Bookmark className="w-4 h-4" /> Save to My Shelf
              </button>
            </div>

            {/* No-alteration policy */}
            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <p className="text-emerald-800 text-xs leading-relaxed">
                  <strong>No-Alteration Policy:</strong> The original text of this book has not
                  been modified. Only formatting and searchability have been enhanced.
                </p>
              </div>
            </div>
          </div>

          {/* Right — Book Details */}
          <div className="lg:col-span-2">
            {/* Title & Author */}
            <div className="mb-6">
              {book.category && (
                <Link
                  href={`/library/${book.category.slug}`}
                  className="inline-block text-emerald-600 text-sm font-medium mb-2 hover:text-emerald-800"
                >
                  {book.category.icon} {book.category.name}
                </Link>
              )}

              <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 font-display leading-tight mb-2">
                {book.title}
              </h1>

              {book.title_ur && (
                <p className="urdu-text text-gold-700 text-xl">{book.title_ur}</p>
              )}

              {book.author && (
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-gradient flex items-center justify-center">
                    <BookMarked className="w-4 h-4 text-white" />
                  </div>
                  <Link href={`/author/${book.author.slug}`} className="font-medium text-navy-800 hover:text-emerald-700">
                    {book.author.name}
                  </Link>
                  {book.translator_name && (
                    <span className="text-sand-500 text-sm">· Trans: {book.translator_name}</span>
                  )}
                </div>
              )}
            </div>

            {/* Badges */}
            {book.badges && book.badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {book.badges.map((badge) => (
                  <span
                    key={badge.id}
                    className={`badge border ${BADGE_STYLES[badge.name] ?? "bg-gray-100 text-gray-700 border-gray-200"}`}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            )}

            {/* Fiqh sensitive warning */}
            {book.fiqh_sensitive && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 flex gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800 text-xs leading-relaxed">
                  <strong>Scholar Review Recommended:</strong> This book contains fiqh rulings.
                  For practical application, please consult your Marja or a qualified scholar.
                </p>
              </div>
            )}

            {/* Meta info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              {[
                { icon: Globe,  label: "Language",    value: LANGUAGE_LABEL[book.language] },
                { icon: Clock,  label: "Published",   value: book.publication_year?.toString() ?? "—" },
                { icon: Star,   label: "Pages",       value: book.total_pages?.toString() ?? "—" },
                { icon: BookOpen, label: "Publisher", value: book.publisher ?? "—" },
                { icon: ShieldCheck, label: "Verified", value: book.verification_status === "verified" ? "Yes ✓" : "Pending" },
                { icon: BookMarked, label: "Edition", value: book.edition ?? "—" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-white rounded-xl border border-sand-200 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs text-sand-500 font-medium uppercase tracking-wider">{label}</span>
                  </div>
                  <p className="text-navy-800 text-sm font-semibold">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {book.description && (
              <div className="mb-6">
                <h2 className="font-bold text-navy-800 mb-3 text-lg">About this Book</h2>
                <p className="text-navy-600 text-sm leading-relaxed">{book.description}</p>
                {book.description_ur && (
                  <p className="urdu-text text-navy-600 text-sm mt-3 leading-loose">{book.description_ur}</p>
                )}
              </div>
            )}

            {/* Source reference */}
            {book.source_reference && (
              <div className="bg-ivory-200 rounded-xl border border-sand-200 p-4 mb-6">
                <h3 className="font-semibold text-navy-800 text-sm mb-1 flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-emerald-600" /> Source & Citation
                </h3>
                <p className="text-navy-600 text-xs font-mono leading-relaxed">{book.source_reference}</p>
              </div>
            )}

            {/* Author bio */}
            {book.author?.bio && (
              <div className="border-t border-sand-200 pt-6 mb-6">
                <h2 className="font-bold text-navy-800 mb-3 text-lg">About the Author</h2>
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-gradient flex items-center justify-center flex-shrink-0">
                    <BookMarked className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800">{book.author.name}</p>
                    {book.author.era && <p className="text-emerald-600 text-xs mb-2">{book.author.era}</p>}
                    <p className="text-navy-600 text-sm leading-relaxed">{book.author.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Books */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-sand-200">
            <h2 className="section-heading mb-6">Related Books</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((b) => <BookCard key={b.id} book={b} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
