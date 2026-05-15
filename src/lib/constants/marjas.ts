export const MARJAS = [
  {
    id:          "sistani",
    name:        "Ayatollah Sistani",
    name_ur:     "آیت اللہ سیستانی",
    website:     "https://www.sistani.org",
    description: "Grand Ayatollah Ali al-Husayni al-Sistani, based in Najaf, Iraq.",
  },
  {
    id:          "khamenei",
    name:        "Ayatollah Khamenei",
    name_ur:     "آیت اللہ خامنہ ای",
    website:     "https://www.khamenei.ir",
    description: "Supreme Leader of Iran, Ayatollah Sayyid Ali Khamenei.",
  },
  {
    id:          "makarem-shirazi",
    name:        "Ayatollah Makarem Shirazi",
    name_ur:     "آیت اللہ مکارم شیرازی",
    website:     "https://www.makarem.ir",
    description: "Grand Ayatollah Naser Makarem Shirazi, based in Qom, Iran.",
  },
  {
    id:          "wahid-khorasani",
    name:        "Ayatollah Wahid Khorasani",
    name_ur:     "آیت اللہ وحید خراسانی",
    website:     "https://www.wahidkhorasani.com",
    description: "Grand Ayatollah Hossein Wahid Khorasani, based in Qom, Iran.",
  },
  {
    id:          "other",
    name:        "Other Maraji",
    name_ur:     "دیگر مراجع",
    website:     "",
    description: "Other recognized Shia Maraji.",
  },
] as const;

export type MarjaId = typeof MARJAS[number]["id"];
