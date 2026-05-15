export const CATEGORIES = [
  { slug: "quran-tafsir",        name: "Quran & Tafsir",           name_ur: "قرآن و تفسیر",         icon: "📖" },
  { slug: "hadith",              name: "Hadith",                   name_ur: "احادیث",               icon: "📜" },
  { slug: "aqaed-beliefs",       name: "Aqaed / Beliefs",          name_ur: "عقائد",                icon: "🕌" },
  { slug: "fiqh",                name: "Fiqh",                     name_ur: "فقہ",                  icon: "⚖️" },
  { slug: "marja-risalah",       name: "Marja / Risalah Amaliyya", name_ur: "مرجع / رسالہ عملیہ",   icon: "🎓" },
  { slug: "history",             name: "History",                  name_ur: "تاریخ",                icon: "🏛️" },
  { slug: "seerah",              name: "Seerah",                   name_ur: "سیرت",                 icon: "⭐" },
  { slug: "ahlulbayt",           name: "Ahlulbaytؑ",               name_ur: "اہلِ بیتؑ",            icon: "🌹" },
  { slug: "imam-ali",            name: "Imam Aliؑ",                name_ur: "امام علیؑ",            icon: "🦁" },
  { slug: "imam-hussain-karbala",name: "Imam Hussainؑ & Karbala",  name_ur: "امام حسینؑ و کربلا",   icon: "🌷" },
  { slug: "nahj-al-balagha",     name: "Nahj al-Balagha",          name_ur: "نہج البلاغہ",          icon: "📚" },
  { slug: "sahifa-sajjadiya",    name: "Sahifa Sajjadiya",         name_ur: "صحیفہ سجادیہ",         icon: "🤲" },
  { slug: "duas-ziyarat",        name: "Duas & Ziyarat",           name_ur: "دعائیں و زیارات",      icon: "🌙" },
  { slug: "akhlaq",              name: "Akhlaq",                   name_ur: "اخلاق",                icon: "💎" },
  { slug: "spirituality-irfan",  name: "Spirituality / Irfan",     name_ur: "روحانیت / عرفان",      icon: "✨" },
  { slug: "urdu-books",          name: "Urdu Books",               name_ur: "اردو کتابیں",          icon: "📕" },
  { slug: "english-books",       name: "English Books",            name_ur: "انگریزی کتابیں",       icon: "📗" },
  { slug: "arabic-books",        name: "Arabic Books",             name_ur: "عربی کتابیں",          icon: "📘" },
  { slug: "childrens-books",     name: "Children's Islamic Books", name_ur: "بچوں کی اسلامی کتابیں",icon: "🎈" },
  { slug: "rare-manuscripts",    name: "Rare Manuscripts",         name_ur: "نادر مخطوطات",         icon: "🗿" },
] as const;

export type CategorySlug = typeof CATEGORIES[number]["slug"];
