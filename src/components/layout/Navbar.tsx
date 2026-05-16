"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, Moon, Sun, BookOpen, Sparkles, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  {
    label: "Library",
    href: "/library",
    sub: [
      { label: "All Books",        href: "/library" },
      { label: "Quran & Tafsir",   href: "/library?category=quran-tafsir" },
      { label: "Hadith",           href: "/library?category=hadith" },
      { label: "Fiqh",             href: "/library?category=fiqh" },
      { label: "Karbala & Imam Hussainؑ", href: "/library?category=imam-hussain-karbala" },
      { label: "Rare Manuscripts", href: "/library?category=rare-manuscripts" },
    ],
  },
  { label: "Halaqa Hub",     href: "/halaqa" },
  { label: "Marja Fiqh",     href: "/marja" },
  { label: "Knowledge Tree", href: "/knowledge-tree" },
  { label: "Heritage",       href: "/heritage" },
  { label: "Ilm Assistant",  href: "/ilm-assistant" },
];

export function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const pathname = usePathname();
  const router   = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-sand-200/80 shadow-sm"
            : "bg-white/90 backdrop-blur-sm border-b border-sand-200/60"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Sikandar Sajjad Digital Library"
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.sub && setActiveDropdown(link.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === link.href || pathname?.startsWith(link.href + "/")
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-navy-700 hover:bg-sand-100 hover:text-navy-900"
                    )}
                  >
                    {link.label}
                    {link.sub && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          activeDropdown === link.href ? "rotate-180" : ""
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.sub && activeDropdown === link.href && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl
                                    border border-sand-200 shadow-card-hover py-2 z-50 animate-fade-in">
                      {link.sub.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-navy-700 hover:bg-emerald-50
                                     hover:text-emerald-700 transition-colors mx-1 rounded-xl"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-1.5">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-xl text-navy-600 hover:bg-sand-100 hover:text-emerald-700 transition-all duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Dark mode */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl text-navy-600 hover:bg-sand-100 hover:text-navy-900 transition-all duration-200"
                aria-label="Toggle theme"
              >
                {theme === "dark"
                  ? <Sun  className="w-5 h-5 text-gold-500" />
                  : <Moon className="w-5 h-5" />
                }
              </button>

              {/* Ilm Assistant shortcut */}
              <Link
                href="/ilm-assistant"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl
                           bg-emerald-50 hover:bg-emerald-100 text-emerald-700
                           text-sm font-medium transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden xl:inline">Ilm Assistant</span>
              </Link>

              {/* My Shelf */}
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-1.5 btn-primary text-sm py-2 px-4"
              >
                <BookOpen className="w-4 h-4" />
                My Shelf
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-xl text-navy-600 hover:bg-sand-100 transition-colors"
                aria-label="Menu"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Inline search bar */}
          {searchOpen && (
            <div className="pb-3 animate-slide-up">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search books, authors, hadith, duas..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sand-50 border border-sand-200
                               text-navy-900 placeholder-sand-400 text-sm
                               focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm
                             font-semibold rounded-xl transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2.5 rounded-xl hover:bg-sand-100 text-navy-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="lg:hidden py-4 border-t border-sand-200 animate-fade-in space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-navy-700 hover:bg-sand-100"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                <Link
                  href="/ilm-assistant"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                             bg-emerald-50 text-emerald-700 text-sm font-medium"
                >
                  <Sparkles className="w-4 h-4" /> Ilm Assistant
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 btn-primary text-center text-sm py-2.5"
                >
                  My Shelf
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
