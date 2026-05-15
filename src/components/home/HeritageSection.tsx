import Link from "next/link";
import { ScrollText, Upload, Eye, Heart, ChevronRight } from "lucide-react";

export function HeritageSection() {
  return (
    <section className="py-16 bg-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="section-subheading">Heritage Preservation Portal</p>
            <h2 className="section-heading mb-4">
              Preserving the Written Heritage of
              <span className="gradient-text block">Ahlulbayt<sup>ؑ</sup></span>
            </h2>
            <p className="text-navy-600 leading-relaxed mb-6 text-sm sm:text-base">
              Thousands of rare Shia manuscripts, old Urdu books, and classical texts risk
              being lost forever. Help us digitize, verify, and preserve them for future
              generations of seekers.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: Upload,
                  title: "Submit Rare Books",
                  desc:  "Upload scanned manuscripts and rare Islamic texts to our archive.",
                },
                {
                  icon: Eye,
                  title: "OCR Correction Project",
                  desc:  "Volunteer to review and correct machine-scanned texts for accuracy.",
                },
                {
                  icon: ScrollText,
                  title: "Scholar Verification",
                  desc:  "Qualified scholars review and authenticate submitted manuscripts.",
                },
                {
                  icon: Heart,
                  title: "Old Magazine Archive",
                  desc:  "Preserving rare Urdu and Shia Islamic magazine archives digitally.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy-800 text-sm">{title}</p>
                    <p className="text-sand-500 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/heritage" className="inline-flex items-center gap-2 btn-primary">
              Join the Preservation Mission
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right — stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "1,200+", label: "Manuscripts Archived",     color: "emerald" },
              { value: "350+",   label: "Scholar Verified",         color: "gold" },
              { value: "80+",    label: "Volunteers Contributing",  color: "emerald" },
              { value: "25+",    label: "Languages Preserved",      color: "gold" },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`p-6 rounded-2xl border text-center ${
                  stat.color === "emerald"
                    ? "bg-emerald-900 border-emerald-800"
                    : "bg-gold-900 border-gold-800"
                }`}
              >
                <p className={`text-3xl font-bold mb-1 ${
                  stat.color === "emerald" ? "text-emerald-300" : "text-gold-300"
                }`}>
                  {stat.value}
                </p>
                <p className="text-white/70 text-xs">{stat.label}</p>
              </div>
            ))}

            {/* Mission quote */}
            <div className="col-span-2 bg-navy-900 rounded-2xl border border-navy-700 p-5">
              <ScrollText className="w-6 h-6 text-gold-400 mb-3" />
              <p className="text-white/90 text-sm italic leading-relaxed">
                "Preserving the written heritage of Ahlulbayt<sup>ؑ</sup> for future generations."
              </p>
              <p className="text-emerald-400 text-xs mt-2 font-medium">
                — The Sikandar Sajjad Digital Library Mission
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
