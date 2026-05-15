import Link from "next/link";
import { BookOpen, Users, Eye, PlusCircle, ShieldCheck, Download } from "lucide-react";
import { MOCK_BOOKS } from "@/lib/mock/data";

export default function AdminDashboard() {
  const totalBooks    = MOCK_BOOKS.length;
  const verifiedBooks = MOCK_BOOKS.filter((b) => b.verification_status === "verified").length;
  const pendingBooks  = MOCK_BOOKS.filter((b) => b.verification_status === "pending").length;
  const totalDownloads = MOCK_BOOKS.reduce((sum, b) => sum + b.download_count, 0);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy-900">Admin Dashboard</h1>
        <p className="text-sand-500 text-sm mt-1">
          Demo mode — connect Supabase to manage live data
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Books",    value: totalBooks,    icon: BookOpen,    color: "emerald" },
          { label: "Verified",       value: verifiedBooks, icon: ShieldCheck, color: "green"   },
          { label: "Pending Review", value: pendingBooks,  icon: Eye,         color: "amber"   },
          { label: "Downloads",      value: totalDownloads.toLocaleString(), icon: Download, color: "blue" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white border border-sand-200 rounded-xl p-5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
              color === "emerald" ? "bg-emerald-100" :
              color === "green"   ? "bg-green-100"   :
              color === "amber"   ? "bg-amber-100"   : "bg-blue-100"
            }`}>
              <Icon className={`w-5 h-5 ${
                color === "emerald" ? "text-emerald-700" :
                color === "green"   ? "text-green-700"   :
                color === "amber"   ? "text-amber-700"   : "text-blue-700"
              }`} />
            </div>
            <p className="text-2xl font-bold text-navy-900">{value}</p>
            <p className="text-sand-500 text-sm">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Add New Book",         href: "/admin/books/add",  icon: PlusCircle,  desc: "Upload a new book to the library"  },
          { label: "Review Pending Books", href: "/admin/books",      icon: ShieldCheck, desc: "Verify and approve pending books"  },
          { label: "Manage Halaqas",       href: "/admin/halaqas",    icon: Users,       desc: "Schedule and manage study circles" },
        ].map(({ label, href, icon: Icon, desc }) => (
          <Link key={href} href={href}
            className="bg-white border border-sand-200 hover:border-emerald-300 rounded-xl p-5 group transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
              <Icon className="w-5 h-5 text-emerald-700" />
            </div>
            <p className="font-semibold text-navy-800 group-hover:text-emerald-700 transition-colors text-sm">{label}</p>
            <p className="text-sand-500 text-xs mt-1">{desc}</p>
          </Link>
        ))}
      </div>

      {/* Books list */}
      <div className="bg-white border border-sand-200 rounded-2xl">
        <div className="p-5 border-b border-sand-100 flex items-center justify-between">
          <h2 className="font-bold text-navy-800">All Books</h2>
          <Link href="/admin/books/add" className="btn-primary text-sm py-2 px-4 flex items-center gap-1">
            <PlusCircle className="w-4 h-4" /> Add Book
          </Link>
        </div>
        <div className="divide-y divide-sand-100">
          {MOCK_BOOKS.map((book) => (
            <div key={book.id} className="flex items-center gap-4 p-4 hover:bg-sand-50 transition-colors">
              <div className="w-10 h-12 rounded-lg bg-emerald-gradient flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-navy-800 text-sm truncate">{book.title}</p>
                <p className="text-sand-500 text-xs">{book.author?.name} · {book.language.toUpperCase()}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full ${
                book.verification_status === "verified"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {book.verification_status === "verified" ? "✓ Verified" : "Pending"}
              </span>
              <div className="flex gap-2">
                <Link href={`/book/${book.slug}`}
                  className="text-xs px-3 py-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-navy-700 transition-colors">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
