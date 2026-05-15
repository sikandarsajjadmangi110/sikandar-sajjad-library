import Link from "next/link";
import {
  BookOpen, Users, FolderOpen, Calendar,
  ScrollText, LayoutDashboard, PlusCircle, ShieldCheck,
} from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin",             icon: LayoutDashboard, label: "Dashboard"   },
  { href: "/admin/books",       icon: BookOpen,        label: "Books"       },
  { href: "/admin/books/add",   icon: PlusCircle,      label: "Add Book"    },
  { href: "/admin/authors",     icon: Users,           label: "Authors"     },
  { href: "/admin/categories",  icon: FolderOpen,      label: "Categories"  },
  { href: "/admin/halaqas",     icon: Calendar,        label: "Halaqas"     },
  { href: "/admin/manuscripts", icon: ScrollText,      label: "Manuscripts" },
  { href: "/admin/reviewers",   icon: ShieldCheck,     label: "Reviewers"   },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-navy-900 flex-shrink-0 flex flex-col">
        <div className="p-5 border-b border-navy-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white text-xs font-bold">Admin Panel</p>
              <p className="text-emerald-400 text-xs">Sikandar Library</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          {ADMIN_NAV.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-sand-300 hover:bg-navy-700 hover:text-white transition-colors">
              <Icon className="w-4 h-4" /> {label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-navy-700">
          <Link href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-sand-500 hover:text-white transition-colors">
            ← Back to Site
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
