import Link from "next/link";
import { ShieldCheck, BookMarked, Scale, Eye, Star, Globe } from "lucide-react";

const TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "Verified Sources Only",
    titleUr: "صرف مستند مصادر",
    desc: "Every book and text is traced to its original source. No unverified content is published.",
    color: "text-emerald-400",
    bg: "bg-emerald-900/40",
    border: "border-emerald-700/40",
  },
  {
    icon: BookMarked,
    title: "No-Alteration Policy",
    titleUr: "تبدیلی نہ کرنے کی پالیسی",
    desc: "Original texts are preserved as-is. Only formatting and searchability are enhanced.",
    color: "text-gold-400",
    bg: "bg-gold-900/30",
    border: "border-gold-700/40",
  },
  {
    icon: Star,
    title: "Scholar Review Badges",
    titleUr: "علمائے کرام کا جائزہ",
    desc: "Books reviewed by qualified Shia scholars carry a Scholar Reviewed badge for your confidence.",
    color: "text-purple-400",
    bg: "bg-purple-900/30",
    border: "border-purple-700/40",
  },
  {
    icon: Scale,
    title: "Marja Attribution",
    titleUr: "مرجع کا حوالہ",
    desc: "All fiqh content is attributed to its specific Marja. Never generic — always specific.",
    color: "text-blue-400",
    bg: "bg-blue-900/30",
    border: "border-blue-700/40",
  },
  {
    icon: Eye,
    title: "Source Transparency",
    titleUr: "مصادر کی شفافیت",
    desc: "Full citation available for every text: author, book, chapter, page, and publication year.",
    color: "text-teal-400",
    bg: "bg-teal-900/30",
    border: "border-teal-700/40",
  },
  {
    icon: Globe,
    title: "Multi-Language Access",
    titleUr: "کثیراللسانی رسائی",
    desc: "Knowledge available in Urdu, Arabic, English, and more — accessible to every seeker.",
    color: "text-cyan-400",
    bg: "bg-cyan-900/30",
    border: "border-cyan-700/40",
  },
];

export function TrustSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#030d1c" }}>

      {/* Top border ornament */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(16,185,129,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-subheading-light">Built on Integrity</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display">
            Trust &{" "}
            <span className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #34d399, #fbbf24)" }}>
              Verification
            </span>
          </h2>
          <p className="text-sand-400 max-w-2xl mx-auto text-sm leading-relaxed">
            The Ahlulbayt<sup>ؑ</sup> Knowledge Universe is founded on scholarly integrity,
            source transparency, and an unwavering commitment to authentic knowledge.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {TRUST_PILLARS.map((p) => (
            <div
              key={p.title}
              className={`rounded-2xl border ${p.border} ${p.bg} p-6
                          hover:scale-[1.02] transition-all duration-300 group`}
            >
              <div className={`w-11 h-11 rounded-xl ${p.bg} border ${p.border}
                              flex items-center justify-center mb-4`}>
                <p.icon className={`w-5 h-5 ${p.color}`} />
              </div>
              <h3 className="text-white font-semibold text-base mb-1">{p.title}</h3>
              <p
                className="text-sand-500 text-xs mb-2"
                style={{ fontFamily: "Noto Nastaliq Urdu, serif", direction: "rtl", lineHeight: "2.2" }}
              >
                {p.titleUr}
              </p>
              <p className="text-sand-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Fiqh disclaimer */}
        <div className="bg-gold-900/20 border border-gold-700/30 rounded-2xl p-6 mb-8">
          <div className="flex gap-3">
            <Scale className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-gold-300 font-semibold text-sm mb-1">Fiqh Content Disclaimer</p>
              <p className="text-sand-400 text-sm leading-relaxed">
                All fiqh and Islamic legal content on this platform is sourced from specific Marjas
                and is provided for educational reference only. For personal religious obligations,
                please consult your Marja directly or a qualified Islamic scholar.
              </p>
            </div>
          </div>
        </div>

        {/* AI disclaimer */}
        <div className="bg-emerald-900/20 border border-emerald-700/30 rounded-2xl p-6 mb-10">
          <div className="flex gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-emerald-300 font-semibold text-sm mb-1">AI Ilm Assistant Disclaimer</p>
              <p className="text-sand-400 text-sm leading-relaxed">
                The Ilm Assistant AI provides answers for learning and research purposes only, sourced
                exclusively from verified Shia Islamic texts. AI-generated answers are not fatawa.
                Always refer to your Marja for religious rulings.
              </p>
            </div>
          </div>
        </div>

        {/* Trust badges row */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {[
            "✓ Verified Sources",
            "✓ No Text Alteration",
            "✓ Scholar Reviewed",
            "✓ Citation Ready",
            "✓ Marja-Attributed Fiqh",
            "✓ Non-Sectarian Tone",
          ].map((b) => (
            <span key={b} className="trust-badge">{b}</span>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/trust-policy"
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300
                       text-sm font-medium transition-colors"
          >
            Read Our Full Trust & Verification Policy →
          </Link>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
    </section>
  );
}
