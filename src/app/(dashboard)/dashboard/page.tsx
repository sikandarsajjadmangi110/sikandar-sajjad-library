import Link from "next/link";
import {
  BookOpen, Bookmark, Target, Sparkles,
  Calendar, TrendingUp, Bell, ChevronRight, Flame,
} from "lucide-react";
import { MOCK_BOOKS, MOCK_DAILY } from "@/lib/mock/data";
import { BookCard } from "@/components/books/BookCard";

const DEMO_USER_NAME = "Yasir";

export default function DashboardPage() {
  const recentBooks = MOCK_BOOKS.slice(0, 3);
  const shelfBooks  = MOCK_BOOKS.slice(0, 6);
  const daily       = MOCK_DAILY;

  return (
    <div className="bg-ivory-100 min-h-screen">
      {/* Header greeting */}
      <div className="bg-emerald-gradient py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="arabic-text text-emerald-200 text-lg mb-1">اَلسَّلَامُ عَلَيْكُمْ</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Assalam-o-Alaikum, {DEMO_USER_NAME}
          </h1>
          <p className="text-emerald-200 mt-1 text-sm">
            Continue your journey of Ahlulbayt<sup>ؑ</sup> knowledge today.
          </p>
          <div className="flex items-center gap-2 mt-4 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 w-fit">
            <Flame className="w-5 h-5 text-gold-300" />
            <span className="text-white font-semibold">7 Day Reading Streak</span>
            <span className="text-emerald-300 text-sm">— Keep it up!</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Main */}
          <div className="lg:col-span-2 space-y-6">

            {/* Continue Reading */}
            <DashSection title="Continue Reading" icon={BookOpen} href="/library">
              <div className="space-y-3">
                {recentBooks.map((book) => (
                  <Link key={book.id} href={`/read/${book.slug}`}
                    className="flex items-center gap-4 bg-white rounded-xl border border-sand-200 p-4 hover:border-emerald-300 transition-colors group">
                    <div className="w-12 h-16 rounded-lg bg-emerald-gradient flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy-800 text-sm truncate group-hover:text-emerald-700">{book.title}</p>
                      <p className="text-sand-500 text-xs mt-0.5">{book.author?.name}</p>
                      <div className="mt-2 bg-sand-100 rounded-full h-1.5">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${20 + Math.random() * 60}%` }} />
                      </div>
                      <p className="text-emerald-600 text-xs mt-1">In progress</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-sand-400 group-hover:text-emerald-600 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </DashSection>

            {/* My Shelf */}
            <DashSection title="My Saved Books" icon={Bookmark} href="/library">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {shelfBooks.map((book) => (
                  <Link key={book.id} href={`/book/${book.slug}`}>
                    <div className="aspect-[3/4] rounded-lg bg-emerald-gradient flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm">
                      <BookOpen className="w-6 h-6 text-white/60" />
                    </div>
                  </Link>
                ))}
              </div>
            </DashSection>

            {/* Recently Added */}
            <DashSection title="Recently Added" icon={TrendingUp} href="/library">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {MOCK_BOOKS.slice(8, 12).map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </DashSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">

            {/* Daily Hadith */}
            <div className="bg-emerald-gradient rounded-2xl p-5">
              <p className="text-emerald-200 text-xs uppercase tracking-wider mb-3 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Daily Hadith
              </p>
              <p className="arabic-text text-white text-lg mb-2 leading-loose">{daily.text_ar}</p>
              <p className="text-emerald-100 text-sm italic leading-relaxed mb-2">"{daily.text_en}"</p>
              <p className="urdu-text text-emerald-200 text-xs leading-loose">{daily.text_ur}</p>
              <p className="text-emerald-300 text-xs mt-2">— {daily.source}</p>
            </div>

            {/* Quick links */}
            <div className="bg-white rounded-2xl border border-sand-200 p-4">
              <p className="font-semibold text-navy-800 text-sm mb-3">Quick Access</p>
              <div className="space-y-1">
                {[
                  { icon: BookOpen,  label: "Browse Library",    href: "/library"            },
                  { icon: Sparkles,  label: "Ilm Assistant",     href: "/ilm-assistant"      },
                  { icon: Target,    label: "My Ilm Journal",    href: "/dashboard/journal"  },
                  { icon: Bell,      label: "Halaqa Hub",        href: "/halaqa"             },
                  { icon: Calendar,  label: "Knowledge Tree",    href: "/knowledge-tree"     },
                ].map(({ icon: Icon, label, href }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-navy-700 hover:bg-sand-50 hover:text-emerald-700 transition-colors">
                    <Icon className="w-4 h-4 text-emerald-600" /> {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Ilm Journal CTA */}
            <div className="bg-navy-900 rounded-2xl p-5">
              <Target className="w-6 h-6 text-gold-400 mb-3" />
              <h3 className="text-white font-bold mb-1">Ilm Journal</h3>
              <p className="text-sand-400 text-xs mb-3 leading-relaxed">
                Record reflections, highlights, and spiritual goals from your reading.
              </p>
              <Link href="/dashboard/journal" className="btn-secondary text-sm text-center block">
                Open Journal
              </Link>
            </div>

            {/* Halaqa reminder */}
            <div className="bg-white rounded-2xl border border-sand-200 p-4">
              <p className="font-semibold text-navy-800 text-sm mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-600" /> Upcoming Halaqas
              </p>
              {[
                { title: "Nahj al-Balagha Study Circle", time: "Fri 8pm PKT" },
                { title: "Sahifa Sajjadiya Reading",     time: "Sat 7pm PKT" },
              ].map((h) => (
                <Link key={h.title} href="/halaqa"
                  className="flex items-center gap-3 py-2.5 border-b border-sand-100 last:border-0 hover:text-emerald-700 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-navy-800 text-xs font-medium">{h.title}</p>
                    <p className="text-sand-400 text-xs">{h.time}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashSection({ title, icon: Icon, href, children }: {
  title: string; icon: React.ElementType; href: string; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-sand-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-navy-800 flex items-center gap-2">
          <Icon className="w-4 h-4 text-emerald-600" /> {title}
        </h2>
        <Link href={href} className="text-emerald-600 text-xs hover:text-emerald-800 flex items-center gap-1">
          View All <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
      {children}
    </div>
  );
}
