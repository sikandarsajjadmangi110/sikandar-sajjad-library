import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, User, Calendar, Globe, ShieldCheck, BookMarked } from "lucide-react";
import { BookCard } from "@/components/books/BookCard";
import { getAuthorBySlug, getBooksByAuthor } from "@/lib/queries/books";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const author = await getAuthorBySlug(params.slug);
  if (!author) return { title: "Author Not Found" };
  return {
    title: `${author.name} — Books & Works`,
    description: author.bio?.slice(0, 160) ?? `All books and works by ${author.name}`,
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const [author, books] = await Promise.all([
    getAuthorBySlug(params.slug),
    getBooksByAuthor(params.slug),
  ]);

  if (!author) notFound();

  const verified = books.filter((b) => b.verification_status === "verified").length;
  const pdfAvailable = books.filter((b) => b.pdf_available).length;
  const languages = [...new Set(books.map((b) => b.language))];

  const LANGUAGE_LABEL: Record<string, string> = {
    en: "English",
    ur: "Urdu",
    ar: "Arabic",
    multi: "Multi-language",
  };

  return (
    <div className="bg-ivory-100 min-h-screen">
      {/* Hero */}
      <div className="bg-emerald-gradient py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 border-2 border-white/30">
              {author.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={author.image_url}
                  alt={author.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-white/80" />
              )}
            </div>

            {/* Meta */}
            <div className="text-center sm:text-left">
              <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                {author.is_scholar && (
                  <span className="bg-gold-500/20 text-gold-200 text-xs px-2.5 py-0.5 rounded-full border border-gold-400/30">
                    Islamic Scholar
                  </span>
                )}
                {author.era && (
                  <span className="bg-white/10 text-white/80 text-xs px-2.5 py-0.5 rounded-full">
                    {author.era}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {author.name}
              </h1>

              {author.name_ur && (
                <p className="text-emerald-200 text-xl mt-1 font-urdu" dir="rtl">
                  {author.name_ur}
                </p>
              )}

              {author.name_ar && (
                <p className="text-emerald-300 text-sm mt-0.5" dir="rtl">
                  {author.name_ar}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left: Bio + Stats */}
          <div className="lg:col-span-1 space-y-5">

            {/* Stats card */}
            <div className="bg-white rounded-2xl border border-sand-200 shadow-sm p-5">
              <h2 className="font-semibold text-navy-800 text-sm mb-4 flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-emerald-600" /> Author Stats
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-sand-600">Total Books</span>
                  <span className="font-semibold text-navy-800">{books.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-sand-600">Verified</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> {verified}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-sand-600">PDF Available</span>
                  <span className="font-semibold text-blue-700">{pdfAvailable}</span>
                </div>
                {languages.length > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sand-600 flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" /> Languages
                    </span>
                    <span className="font-semibold text-navy-700">
                      {languages.map((l) => LANGUAGE_LABEL[l] ?? l).join(", ")}
                    </span>
                  </div>
                )}
                {author.era && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-sand-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Era
                    </span>
                    <span className="font-semibold text-navy-700">{author.era}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            {author.bio && (
              <div className="bg-white rounded-2xl border border-sand-200 shadow-sm p-5">
                <h2 className="font-semibold text-navy-800 text-sm mb-3 flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600" /> About
                </h2>
                <p className="text-navy-700 text-sm leading-relaxed">{author.bio}</p>
              </div>
            )}

            {/* Back link */}
            <Link
              href="/library"
              className="flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-900 transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Browse All Books
            </Link>
          </div>

          {/* Right: Books grid */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-navy-900">
                Books by {author.name}
              </h2>
              <span className="text-sm text-sand-500">
                {books.length} {books.length === 1 ? "book" : "books"}
              </span>
            </div>

            {books.length === 0 ? (
              <div className="bg-white rounded-2xl border border-sand-200 p-12 text-center">
                <div className="w-16 h-16 bg-sand-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-sand-400" />
                </div>
                <p className="text-navy-700 font-semibold">No books yet</p>
                <p className="text-sand-500 text-sm mt-1">
                  Books by this author will appear here once added.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
