import Link            from "next/link";
import { Calendar, Users, Video, BookOpen, Clock, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Halaqa Hub" };

async function getHalaqas() {
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("halaqas")
      .select("*")
      .in("status", ["upcoming", "live"])
      .order("date", { ascending: true })
      .limit(20);
    return data ?? [];
  } catch { return []; }
}

const STATUS_STYLES: Record<string, string> = {
  upcoming: "bg-blue-100 text-blue-700",
  live:     "bg-red-100 text-red-700 animate-pulse",
  completed:"bg-sand-100 text-sand-600",
};

export default async function HalaqaPage() {
  const halaqas = await getHalaqas();

  return (
    <div className="bg-ivory-100 min-h-screen">
      {/* Header */}
      <div className="bg-navy-900 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gold-400 text-xs uppercase tracking-widest mb-3">Community Learning</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Halaqa Hub</h1>
          <p className="text-sand-300 max-w-xl mx-auto text-sm leading-relaxed">
            Scholar-moderated study circles, weekly halaqas, live lectures, book reading groups,
            and Q&A sessions with certificates upon completion.
          </p>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="bg-white border-b border-sand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Video,    label: "Live Lectures",        desc: "Real-time with scholars"    },
              { icon: BookOpen, label: "Book Reading Groups",  desc: "Chapter-by-chapter study"   },
              { icon: Users,    label: "Discussion Rooms",     desc: "Student-moderated forums"   },
              { icon: Calendar, label: "Certificate Courses",  desc: "Earn on completion"         },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center p-4 rounded-xl bg-ivory-100">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-emerald-700" />
                </div>
                <p className="font-semibold text-navy-800 text-sm">{label}</p>
                <p className="text-sand-500 text-xs mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="font-bold text-navy-800 text-xl mb-5 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-600" /> Upcoming Halaqas
        </h2>

        {halaqas.length > 0 ? (
          <div className="space-y-4">
            {halaqas.map((h: any) => (
              <Link key={h.id} href={`/halaqa/${h.id}`}
                className="card-library flex gap-4 p-5 group">
                <div className="w-14 h-14 rounded-xl bg-emerald-gradient flex items-center justify-center flex-shrink-0">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="font-bold text-navy-800 group-hover:text-emerald-700 transition-colors">
                      {h.title}
                    </h3>
                    <span className={`badge text-xs px-2.5 py-1 rounded-full ${STATUS_STYLES[h.status] ?? STATUS_STYLES.upcoming}`}>
                      {h.status === "live" ? "🔴 Live Now" : "📅 Upcoming"}
                    </span>
                  </div>
                  <p className="text-emerald-600 text-sm font-medium mt-0.5">{h.scholar_name}</p>
                  <p className="text-sand-500 text-sm mt-1 line-clamp-2">{h.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    {h.date && (
                      <span className="flex items-center gap-1 text-xs text-sand-500">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(h.date).toLocaleDateString("en-US", {
                          weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                        })}
                      </span>
                    )}
                    {h.max_attendees && (
                      <span className="flex items-center gap-1 text-xs text-sand-500">
                        <Users className="w-3.5 h-3.5" /> {h.max_attendees} seats
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-sand-300 group-hover:text-emerald-500 flex-shrink-0 self-center" />
              </Link>
            ))}
          </div>
        ) : (
          /* Empty state with seed data notice */
          <div className="space-y-4">
            {[
              { title: "Introduction to Nahj al-Balagha", scholar: "Sheikh Ahmad Hussain",     date: "Every Friday 8pm PKT",  desc: "A weekly reading and reflection on the sermons and letters of Imam Ali (as)." },
              { title: "Sahifa Sajjadiya — The Psalms of Islam", scholar: "Syed Murtaza Rizvi",  date: "Every Saturday 7pm PKT", desc: "Line-by-line study of the blessed supplications of Imam Zain al-Abidin (as)." },
              { title: "Shia Aqaed for Beginners",         scholar: "Maulana Hasan Jafri",      date: "Every Sunday 6pm PKT",   desc: "Foundational beliefs of Shia Islam explained for new learners and youth." },
            ].map((h, i) => (
              <div key={i} className="card-library flex gap-4 p-5">
                <div className="w-14 h-14 rounded-xl bg-emerald-gradient flex items-center justify-center flex-shrink-0">
                  <Video className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="font-bold text-navy-800">{h.title}</h3>
                    <span className="badge bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full">📅 Upcoming</span>
                  </div>
                  <p className="text-emerald-600 text-sm font-medium mt-0.5">{h.scholar}</p>
                  <p className="text-sand-500 text-sm mt-1">{h.desc}</p>
                  <p className="flex items-center gap-1 text-xs text-sand-500 mt-2">
                    <Clock className="w-3.5 h-3.5" /> {h.date}
                  </p>
                </div>
              </div>
            ))}
            <p className="text-center text-sand-400 text-xs pt-2">
              Sample data — connect Supabase to load real halaqas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
