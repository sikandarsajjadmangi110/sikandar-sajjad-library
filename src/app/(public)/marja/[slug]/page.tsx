import Link            from "next/link";
import { notFound }    from "next/navigation";
import { GraduationCap, BookOpen, ExternalLink, ChevronRight } from "lucide-react";
import { MARJAS }      from "@/lib/constants/marjas";
import { BookCard }    from "@/components/books/BookCard";
import { getBooks }    from "@/lib/queries/books";
import type { Metadata } from "next";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const marja = MARJAS.find((m) => m.id === params.slug);
  if (!marja) return { title: "Marja Not Found" };
  return { title: `${marja.name} — Fiqh Resources` };
}

export async function generateStaticParams() {
  return MARJAS.map((m) => ({ slug: m.id }));
}

export default async function MarjaDetailPage({ params }: Props) {
  const marja = MARJAS.find((m) => m.id === params.slug);
  if (!marja) notFound();

  const { books } = await getBooks({ marja_related: marja.id }, 8);

  return (
    <div className="bg-ivory-100 min-h-screen">
      <div className="bg-emerald-gradient py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link href="/marja" className="text-emerald-200 hover:text-white text-sm flex items-center gap-1 mb-4">
            ← All Maraji
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">{marja.name}</h1>
              <p className="urdu-text text-gold-300 text-lg">{marja.name_ur}</p>
            </div>
          </div>
          <p className="text-emerald-200 text-sm mt-3 max-w-xl">{marja.description}</p>
          {marja.website && (
            <a href={marja.website} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-gold-300 hover:text-gold-200 text-xs">
              <ExternalLink className="w-3.5 h-3.5" /> Official Website
            </a>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Quick resource cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Risalah Amaliyya", icon: "📖", href: `/library/marja-risalah?marja=${marja.id}` },
            { label: "Fiqh Q&A",         icon: "⚖️", href: `/library/fiqh?marja=${marja.id}` },
            { label: "Related Books",    icon: "📚", href: `/library?marja=${marja.id}` },
            { label: "Audio Lectures",   icon: "🎧", href: `/library?marja=${marja.id}&audio=1` },
          ].map((item) => (
            <Link key={item.label} href={item.href}
              className="bg-white border border-sand-200 hover:border-emerald-300 rounded-xl p-4 flex items-center gap-3 transition-colors group">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-navy-800 text-sm group-hover:text-emerald-700">{item.label}</p>
                <p className="text-emerald-600 text-xs flex items-center gap-1">
                  Browse <ChevronRight className="w-3 h-3" />
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Books */}
        <div>
          <h2 className="font-bold text-navy-800 text-xl mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            Books Related to {marja.name}
          </h2>

          {books.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {books.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-sand-200">
              <BookOpen className="w-10 h-10 text-sand-300 mx-auto mb-3" />
              <p className="text-navy-700 font-medium">No books yet for this Marja</p>
              <p className="text-sand-400 text-sm mt-1">Books will appear here once added to the library.</p>
              <Link href="/library" className="inline-flex items-center gap-1 mt-4 text-emerald-600 text-sm hover:underline">
                Browse All Books <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

        <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <p className="text-amber-800 text-sm">
            <strong>Disclaimer:</strong> Content here is for learning only. For binding rulings,
            consult a qualified scholar directly.
          </p>
        </div>
      </div>
    </div>
  );
}
