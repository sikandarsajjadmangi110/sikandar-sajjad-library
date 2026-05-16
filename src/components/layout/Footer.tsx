import Link from "next/link";
import { BookOpen, Mail, Heart, Star, Globe, Shield } from "lucide-react";

const FOOTER_LINKS = {
  "Knowledge Galaxies": [
    { label: "Quran & Tafsir",     href: "/library?category=quran-tafsir" },
    { label: "Hadith",             href: "/library?category=hadith" },
    { label: "Fiqh",               href: "/library?category=fiqh" },
    { label: "Karbala",            href: "/library?category=imam-hussain-karbala" },
    { label: "Duas & Ziyarat",     href: "/library?category=duas-ziyarat" },
    { label: "Rare Manuscripts",   href: "/library?category=rare-manuscripts" },
  ],
  "Features": [
    { label: "Ilm Assistant (AI)", href: "/ilm-assistant" },
    { label: "Knowledge Tree",     href: "/knowledge-tree" },
    { label: "Halaqa Hub",         href: "/halaqa" },
    { label: "Heritage Portal",    href: "/heritage" },
    { label: "Marja Fiqh Portal",  href: "/marja" },
    { label: "My Shelf",           href: "/dashboard" },
  ],
  "Trust": [
    { label: "Trust & Verification",    href: "/trust-policy" },
    { label: "No-Alteration Policy",    href: "/trust-policy#no-alteration" },
    { label: "Scholar Review Process",  href: "/trust-policy#review" },
    { label: "Source Transparency",     href: "/trust-policy#sources" },
    { label: "Fiqh Disclaimer",         href: "/trust-policy#fiqh" },
    { label: "AI Disclaimer",           href: "/trust-policy#ai" },
  ],
  "About": [
    { label: "About the Library", href: "/about" },
    { label: "Contact Us",        href: "/contact" },
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Use",      href: "/terms" },
    { label: "Authors",           href: "/authors" },
    { label: "Admin Portal",      href: "/admin" },
  ],
};

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: "#020810" }}>

      {/* Top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Bismillah banner */}
      <div
        className="relative py-6 text-center border-b"
        style={{ borderColor: "rgba(16,185,129,0.15)" }}
      >
        <p
          className="text-gold-300 text-2xl sm:text-3xl"
          style={{
            fontFamily: "Noto Naskh Arabic, serif",
            direction: "rtl",
            textShadow: "0 0 20px rgba(251,191,36,0.3)",
          }}
        >
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        <div className="flex items-center justify-center gap-3 mt-2 opacity-40">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
          <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center
                           border border-emerald-700/50 group-hover:border-emerald-500
                           transition-colors duration-300"
                style={{ background: "linear-gradient(135deg, #022c22, #047857)" }}
              >
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm leading-tight">Sikandar Sajjad</p>
                <p
                  className="text-emerald-400 text-xs"
                  style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
                >
                  ڈیجیٹل لائبریری
                </p>
              </div>
            </Link>

            <p className="text-sand-400 text-sm leading-relaxed mb-4">
              The Ahlulbayt<sup>ؑ</sup> Knowledge Universe — preserving the light of
              Ahlulbayt<sup>ؑ</sup> wisdom for seekers of every generation.
            </p>

            <p
              className="text-gold-500/70 text-sm italic mb-5"
              style={{ fontFamily: "Noto Nastaliq Urdu, serif", direction: "rtl", lineHeight: "2.2" }}
            >
              علم حاصل کرو گہوارے سے لحد تک
            </p>

            <div className="flex flex-col gap-2">
              <a
                href="mailto:contact@sikandar-library.com"
                className="flex items-center gap-2 text-sand-400 hover:text-emerald-400
                           text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@sikandar-library.com
              </a>
              <div className="flex items-center gap-2 text-sand-500 text-xs mt-1">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>Available in Urdu · Arabic · English</span>
              </div>
              <div className="flex items-center gap-2 text-sand-500 text-xs">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified · Scholarly · Trusted</span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4
                className="text-gold-400 font-semibold text-xs uppercase tracking-widest mb-4
                           pb-2 border-b"
                style={{ borderColor: "rgba(251,191,36,0.15)" }}
              >
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sand-400 hover:text-emerald-300 text-sm
                                 transition-colors duration-200 hover:pl-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div
          className="mt-14 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {[
              "✓ Verified Sources Only",
              "✓ No Text Alteration",
              "✓ Scholar Reviewed",
              "✓ Citation Ready",
              "✓ Marja-Attributed Fiqh",
              "✓ Non-Sectarian",
            ].map((badge) => (
              <span
                key={badge}
                className="trust-badge text-[11px]"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Fiqh notice */}
          <p className="text-center text-sand-600 text-xs leading-relaxed max-w-2xl mx-auto mb-6">
            Fiqh content on this platform is for educational reference only and is attributed to
            specific Marjas. For personal religious obligations, always consult your Marja or a
            qualified Islamic scholar. AI answers are not fatawa.
          </p>

          <p className="text-center text-sand-500 text-xs">
            © {new Date().getFullYear()} The Sikandar Sajjad Digital Library — Ahlulbayt Knowledge Universe.
            All rights reserved.
          </p>
          <p className="text-center mt-1">
            <span className="text-sand-600 text-xs">
              Built with{" "}
              <Heart className="inline w-3 h-3 text-gold-600 fill-gold-600" />{" "}
              for the love of Ahlulbayt<sup>ؑ</sup> knowledge.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
