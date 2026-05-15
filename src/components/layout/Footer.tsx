import Link from "next/link";
import { BookOpen, Mail, Heart } from "lucide-react";

const FOOTER_LINKS = {
  Library: [
    { label: "Browse All Books", href: "/library" },
    { label: "Quran & Tafsir",   href: "/library/quran-tafsir" },
    { label: "Hadith",           href: "/library/hadith" },
    { label: "Fiqh",             href: "/library/fiqh" },
    { label: "Duas & Ziyarat",   href: "/library/duas-ziyarat" },
  ],
  Features: [
    { label: "Ilm Assistant",   href: "/ilm-assistant" },
    { label: "Knowledge Tree",  href: "/knowledge-tree" },
    { label: "Halaqa Hub",      href: "/halaqa" },
    { label: "Heritage Portal", href: "/heritage" },
    { label: "Marja Fiqh",      href: "/marja" },
  ],
  Trust: [
    { label: "Trust & Verification",   href: "/trust-policy" },
    { label: "No-Alteration Policy",   href: "/trust-policy#no-alteration" },
    { label: "Scholar Review Process", href: "/trust-policy#review" },
    { label: "Source Transparency",    href: "/trust-policy#sources" },
    { label: "Privacy Policy",         href: "/privacy" },
  ],
  About: [
    { label: "About the Library", href: "/about" },
    { label: "Contact Us",        href: "/contact" },
    { label: "Terms of Use",      href: "/terms" },
    { label: "Admin Login",       href: "/admin" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white mt-20">
      {/* Islamic bismillah banner */}
      <div className="bg-emerald-900 py-4 text-center">
        <p className="arabic-text text-gold-300 text-xl">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Sikandar Sajjad</p>
                <p className="text-emerald-400 text-xs">Digital Library</p>
              </div>
            </div>
            <p className="text-sand-300 text-sm leading-relaxed mb-4">
              Preserving Ahlulbayt Knowledge for the Digital Age.
            </p>
            <p className="text-gold-400 text-xs font-medium italic">
              "Read. Reflect. Preserve. Share."
            </p>
            <div className="mt-4">
              <a
                href="mailto:contact@sikandar-library.com"
                className="flex items-center gap-2 text-sand-400 hover:text-emerald-400 text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@sikandar-library.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-gold-400 font-semibold text-sm uppercase tracking-wider mb-4">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sand-300 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges row */}
        <div className="mt-12 pt-8 border-t border-navy-700">
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {[
              "✓ Verified Sources Only",
              "✓ No Text Alteration",
              "✓ Scholar Reviewed",
              "✓ Citation Ready",
              "✓ Fiqh Content with Marja Source",
            ].map((badge) => (
              <span
                key={badge}
                className="bg-emerald-900 text-emerald-300 text-xs px-3 py-1.5 rounded-full border border-emerald-800"
              >
                {badge}
              </span>
            ))}
          </div>

          <p className="text-center text-sand-500 text-xs">
            © {new Date().getFullYear()} The Sikandar Sajjad Digital Library. All rights reserved.
            <br />
            <span className="text-sand-600">
              Built with <Heart className="inline w-3 h-3 text-gold-500" /> for the love of Ahlulbayt knowledge.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
