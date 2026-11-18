// Moroccan cities offered at checkout (copied from the AKAL store, src/lib/cities.ts).
export const CITIES: ReadonlyArray<{ fr: string; ar: string }> = [
  { fr: "Casablanca", ar: "الدار البيضاء" },
  { fr: "Rabat", ar: "الرباط" },
  { fr: "Salé", ar: "سلا" },
  { fr: "Témara", ar: "تمارة" },
  { fr: "Kénitra", ar: "القنيطرة" },
  { fr: "Mohammedia", ar: "المحمدية" },
  { fr: "Marrakech", ar: "مراكش" },
  { fr: "Fès", ar: "فاس" },
  { fr: "Meknès", ar: "مكناس" },
  { fr: "Tanger", ar: "طنجة" },
  { fr: "Tétouan", ar: "تطوان" },
  { fr: "Agadir", ar: "أكادير" },
  { fr: "Inezgane", ar: "إنزكان" },
  { fr: "Oujda", ar: "وجدة" },
  { fr: "Nador", ar: "الناظور" },
  { fr: "Al Hoceïma", ar: "الحسيمة" },
  { fr: "El Jadida", ar: "الجديدة" },
  { fr: "Safi", ar: "آسفي" },
  { fr: "Essaouira", ar: "الصويرة" },
  { fr: "Béni Mellal", ar: "بني ملال" },
  { fr: "Khouribga", ar: "خريبكة" },
  { fr: "Settat", ar: "سطات" },
  { fr: "Berrechid", ar: "برشيد" },
  { fr: "Khémisset", ar: "الخميسات" },
  { fr: "Larache", ar: "العرائش" },
  { fr: "Ksar El Kébir", ar: "القصر الكبير" },
  { fr: "Taza", ar: "تازة" },
  { fr: "Ifrane", ar: "إفران" },
  { fr: "Errachidia", ar: "الرشيدية" },
  { fr: "Ouarzazate", ar: "ورزازات" },
  { fr: "Zagora", ar: "زاكورة" },
  { fr: "Tinghir", ar: "تنغير" },
  { fr: "Taroudant", ar: "تارودانت" },
  { fr: "Tiznit", ar: "تيزنيت" },
  { fr: "Guelmim", ar: "كلميم" },
  { fr: "Laâyoune", ar: "العيون" },
  { fr: "Dakhla", ar: "الداخلة" },
  { fr: "Berkane", ar: "بركان" },
  { fr: "Taourirt", ar: "تاوريرت" },
  { fr: "Chefchaouen", ar: "شفشاون" },
  { fr: "Ouezzane", ar: "وزان" },
  { fr: "Sidi Kacem", ar: "سيدي قاسم" },
  { fr: "Sidi Slimane", ar: "سيدي سليمان" },
  { fr: "Fquih Ben Salah", ar: "الفقيه بن صالح" },
  { fr: "Khénifra", ar: "خنيفرة" },
  { fr: "Azrou", ar: "أزرو" },
  { fr: "Midelt", ar: "ميدلت" },
  { fr: "Benslimane", ar: "بنسليمان" },
  { fr: "Skhirat", ar: "الصخيرات" },
  { fr: "Bouskoura", ar: "بوسكورة" },
  { fr: "Martil", ar: "مرتيل" },
  { fr: "M'diq", ar: "المضيق" },
  { fr: "Fnideq", ar: "الفنيدق" },
  { fr: "Youssoufia", ar: "اليوسفية" },
  { fr: "Kelaat Sraghna", ar: "قلعة السراغنة" },
  { fr: "Sefrou", ar: "صفرو" },
  { fr: "Guercif", ar: "جرسيف" },
  { fr: "Tan-Tan", ar: "طانطان" },
];

export function cityLabel(city: string, lang: "fr" | "ar"): string {
  return lang === "fr" ? city : CITIES.find((c) => c.fr === city)?.ar ?? city;
}

export function sortedCities(lang: "fr" | "ar") {
  return [...CITIES].sort((a, b) => a[lang].localeCompare(b[lang], lang));
}

/** Moroccan mobile numbers: 06/07XXXXXXXX or +212 6/7XXXXXXXX. Returns "+2126XXXXXXXX" or null. */
export function normalizeMoroccanPhone(input: string): string | null {
  const compact = input.replace(/[\s\-.()]/g, "");
  const match = compact.match(/^(?:\+212|00212|212|0)([67]\d{8})$/);
  return match ? `+212${match[1]}` : null;
}
