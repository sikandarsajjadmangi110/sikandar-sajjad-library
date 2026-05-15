"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { label: "Library",        href: "/library" },
  { label: "Halaqa Hub",     href: "/halaqa" },
  { label: "Marja Fiqh",     href: "/marja" },
  { label: "Knowledge Tree", href: "/knowledge-tree" },
  { label: "Heritage",       href: "/heritage" },
  { label: "Ilm Assistant",  href: "/ilm-assistant" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname  = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sand-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Sikandar Sajjad Digital Library"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-navy-700 hover:bg-sand-100 hover:text-navy-900"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="p-2 rounded-lg text-navy-600 hover:bg-sand-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-navy-600 hover:bg-sand-100 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <Link
              href="/dashboard"
              className="hidden sm:block btn-primary text-sm py-2 px-4"
            >
              My Shelf
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-navy-600 hover:bg-sand-100"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-sand-200 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium mb-1 transition-colors",
                  pathname === link.href
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-navy-700 hover:bg-sand-100"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className="block mt-3 btn-primary text-center text-sm"
              onClick={() => setMenuOpen(false)}
            >
              Sign In / Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
