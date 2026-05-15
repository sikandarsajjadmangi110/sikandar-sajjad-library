import Link from "next/link";
import { CATEGORIES } from "@/lib/constants/categories";

export function CategoryGrid() {
  return (
    <section className="py-16 bg-ivory-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="section-subheading">Explore the Collection</p>
          <h2 className="section-heading">Browse by Category</h2>
          <p className="text-sand-500 mt-2 max-w-xl mx-auto text-sm">
            From Quran & Tafsir to rare manuscripts — every branch of Ahlulbayt knowledge,
            organized for easy exploration.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/library/${cat.slug}`}
              className="group flex flex-col items-center gap-2 p-4 bg-white rounded-2xl
                         border border-sand-200 hover:border-emerald-300 hover:shadow-md
                         transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-navy-800 text-xs font-semibold group-hover:text-emerald-700 transition-colors leading-snug">
                {cat.name}
              </span>
              {cat.name_ur && (
                <span className="urdu-text text-sand-500 text-xs leading-relaxed">
                  {cat.name_ur}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
