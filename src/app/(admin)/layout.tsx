"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen, Users, PlusCircle, ShieldCheck,
  LayoutDashboard, Menu, X, Globe, ExternalLink,
  ScrollText,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const ADMIN_NAV = [
  { href: "/admin",             icon: LayoutDashboard, label: "Dashboard",   end: true  },
  { href: "/admin/books",       icon: BookOpen,        label: "All Books",   end: false },
  { href: "/admin/books/add",   icon: PlusCircle,      label: "Add Book",    end: true  },
  { href: "/admin/authors",     icon: Users,           label: "Authors",     end: false },
  { href: "/admin/publish",     icon: ScrollText,      label: "Publish Code",end: true  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string, end: boolean) {
    return end ? pathname === href : pathname?.startsWith(href);
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ── Sidebar ── */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-60 bg-navy-900 flex flex-col transition-transform duration-300 lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-5 border-b border-navy-700/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
               style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white text-xs font-bold leading-tight">Admin Panel</p>
            <p className="text-emerald-400 text-[10px]">Sikandar Library</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto lg:hidden p-1 text-sand-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {ADMIN_NAV.map(({ href, icon: Icon, label, end }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive(href, end)
                  ? "bg-emerald-600/20 text-emerald-300 border border-emerald-700/40"
                  : "text-sand-400 hover:bg-navy-700/60 hover:text-white"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
              {href === "/admin/books/add" && (
                <span className="ml-auto w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">+</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom links */}
        <div className="p-3 border-t border-navy-700/60 space-y-1">
          <Link href="/" target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-sand-500 hover:text-white transition-colors">
            <Globe className="w-3.5 h-3.5" />
            View Live Site
            <ExternalLink className="w-3 h-3 ml-auto" />
          </Link>
          <div className="px-3 py-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-[10px] font-medium">Demo Mode — No Supabase</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Mobile header ── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 bg-navy-900 border-b border-navy-700 px-4 py-3 flex items-center gap-3">
        <button onClick={() => setOpen(true)} className="p-1.5 text-sand-400 hover:text-white">
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span className="text-white text-sm font-bold">Admin Panel</span>
        </div>
        <Link href="/admin/books/add"
          className="ml-auto flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
          <PlusCircle className="w-3.5 h-3.5" /> Add Book
        </Link>
      </div>

      {/* ── Overlay (mobile) ── */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* ── Main content ── */}
      <main className="flex-1 lg:ml-60 min-h-screen overflow-auto pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
