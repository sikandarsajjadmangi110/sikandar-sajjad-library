import { ShieldCheck, BookMarked, AlertTriangle, Eye } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Trust & Verification Policy" };

export default function TrustPolicyPage() {
  return (
    <div className="bg-ivory-100 min-h-screen">
      <div className="bg-navy-900 py-12 text-center">
        <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-white mb-2">Trust & Verification Policy</h1>
        <p className="text-sand-300 text-sm max-w-xl mx-auto">
          How we ensure every piece of content on this library is authentic, verified, and trustworthy.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        {[
          {
            icon: ShieldCheck,
            id: "no-alteration",
            title: "1. No-Alteration Policy",
            color: "emerald",
            body: `The original text of every classical book, hadith, and Quranic text on this platform is never modified, edited, or paraphrased. We preserve exact original wording. Only formatting (paragraphs, headings) and search metadata are adjusted. Any translation is clearly labeled with translator name, year, and source.`,
          },
          {
            icon: Eye,
            id: "sources",
            title: "2. Source Transparency",
            color: "blue",
            body: `Every book includes full source details: publisher, year, edition, and a citation string. Books without verifiable sources are marked as "Pending Verification" and are not displayed in the main library until verified.`,
          },
          {
            icon: BookMarked,
            id: "review",
            title: "3. Scholar Review Process",
            color: "purple",
            body: `Books go through a multi-step review: (1) Editor uploads and fills metadata, (2) Assigned to a Scholar Reviewer, (3) Reviewer checks authenticity and source, (4) Reviewer approves or flags. Only approved books display the Scholar Reviewed badge. Flagged books are hidden pending further review.`,
          },
          {
            icon: AlertTriangle,
            id: "fiqh",
            title: "4. Fiqh Content Policy",
            color: "amber",
            body: `All fiqh content is linked to its Marja source. Books containing religious rulings are marked with the "Scholar Review Recommended" badge. Our AI assistant (Ilm Assistant) always ends fiqh answers with a clear disclaimer to consult a qualified Marja or scholar.`,
          },
          {
            icon: ShieldCheck,
            id: "translations",
            title: "5. Translation Standards",
            color: "emerald",
            body: `Translations are clearly labeled with language, translator name, translation year, and publishing house. Arabic originals and Urdu/English translations are kept separate. Differences between translation editions are noted where applicable.`,
          },
          {
            icon: AlertTriangle,
            id: "sensitive",
            title: "6. Sensitive Topics",
            color: "red",
            body: `Historical topics with multiple scholarly opinions are presented carefully and respectfully, noting different views. Sensitive topics are marked "Scholar Review Recommended." We do not promote sectarian conflict or disrespect any Islamic tradition.`,
          },
        ].map(({ icon: Icon, id, title, body, color }) => (
          <div key={id} id={id} className="bg-white border border-sand-200 rounded-2xl p-6">
            <h2 className="font-bold text-navy-800 text-lg mb-3 flex items-center gap-2">
              <Icon className={`w-5 h-5 text-${color}-600`} />
              {title}
            </h2>
            <p className="text-navy-600 text-sm leading-relaxed">{body}</p>
          </div>
        ))}

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
          <p className="text-emerald-800 text-sm font-medium">
            If you find any content that violates this policy, please contact us immediately.
          </p>
          <a href="mailto:trust@sikandar-library.com"
            className="text-emerald-600 hover:underline text-sm mt-2 inline-block">
            trust@sikandar-library.com
          </a>
        </div>
      </div>
    </div>
  );
}
