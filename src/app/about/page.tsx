import Link from "next/link";
import { BookOpen, ShieldCheck, Heart, Globe } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="bg-ivory-100 min-h-screen">
      <div className="bg-emerald-gradient py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">About the Library</h1>
        <p className="text-emerald-200 text-sm max-w-xl mx-auto">
          Preserving Ahlulbayt knowledge for the digital age.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10">
        <div>
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Our Mission</h2>
          <p className="text-navy-600 leading-relaxed">
            The Sikandar Sajjad Digital Library is a premium digital maktaba dedicated to preserving
            and sharing verified Shia Islamic knowledge. Our mission is to make authentic Ahlulbayt
            knowledge accessible to every seeker — from students and scholars to general readers and
            youth — in a modern, clean, and trustworthy digital platform.
          </p>
        </div>

        <div className="arabic-text text-emerald-800 text-xl text-center bg-emerald-50 border border-emerald-200 rounded-2xl p-6 leading-loose">
          طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ
          <p className="font-sans text-sm text-emerald-600 mt-3 not-italic">
            "Seeking knowledge is an obligation upon every Muslim."
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-navy-900 mb-5">Our Values</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: ShieldCheck, title: "Authenticity",     desc: "Every book is sourced, verified, and reviewed before publishing." },
              { icon: BookOpen,    title: "Accessibility",    desc: "Free to read. Available in Urdu, English, and Arabic."            },
              { icon: Heart,       title: "Reverence",        desc: "We treat every classical text with the respect it deserves."       },
              { icon: Globe,       title: "Preservation",     desc: "Digitizing rare manuscripts so knowledge is never lost."           },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-3 bg-white border border-sand-200 rounded-xl p-4">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="font-semibold text-navy-800 text-sm">{title}</p>
                  <p className="text-sand-500 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-gold-700 font-semibold text-lg italic">
            "Read. Reflect. Preserve. Share."
          </p>
          <div className="flex justify-center gap-3 mt-6">
            <Link href="/library"      className="btn-primary text-sm">Explore Library</Link>
            <Link href="/trust-policy" className="btn-outline text-sm">Trust Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
