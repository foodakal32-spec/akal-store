// Product details for the /produits/[slug] pages.
// Source: the AKAL e-commerce store seed (prisma/seed.ts). NOTE: that file marks every
// description, price and stock value as a PLACEHOLDER until the real products are provided,
// so the texts below must be reviewed before publishing. PRICES BELOW ARE DEMO VALUES (MAD) - replace them with the real ones.

type ProductText = Partial<Record<"name" | "short" | "description" | "ingredients" | "usage" | "benefits" | "shelfLife" | "category" | "badge", string>>;

export type ProductDetail = {
  /** Arabic texts (from the AKAL store seed for the first four products). */
  ar?: ProductText;
  slug: string;
  name: string;
  category: string;
  badge?: string;
  nameAr?: string;
  short: string;
  description: string;
  images: string[];
  sizes: { label: string; price: number }[]; // price in MAD (dirhams)
  ingredients?: string;
  usage?: string;
  benefits?: string;
  shelfLife?: string;
};

export const productDetails: ProductDetail[] = [
  {
    slug: "sucre-de-dattes",
    ar: {"name":"سكر التمر","category":"منتجات التمر","badge":"الأكثر مبيعاً","short":"بديل طبيعي للسكر الأبيض","description":"سكر التمر مصنوع من تمور مغربية مجففة ومطحونة يدويًا. بديل صحي للسكر الأبيض يحتفظ بالألياف والمعادن الطبيعية للتمر.","ingredients":"تمر مغربي 100%.","usage":"استعمله في الحلويات، العصائر، الشاي والقهوة، أو رشّه على الياغورت والشوفان. يُستبدل بنفس كمية السكر تقريبًا.","benefits":"غني بالألياف والبوتاسيوم والمغنيزيوم، ومؤشره الجلايسيمي أقل من السكر الأبيض.","shelfLife":"12 شهرًا في مكان جاف وبعيد عن الرطوبة، في علبة محكمة الإغلاق."},
    category: "Produits de dattes",
    badge: "Best-seller",
    name: "Sucre de dattes",
    nameAr: "سكر التمر",
    short: "L'alternative naturelle au sucre blanc",
    description:
      "Sucre de dattes obtenu à partir de dattes marocaines séchées et moulues à la main. Une alternative saine au sucre blanc qui conserve les fibres et minéraux naturels de la datte.",
    images: ["/assets/akal/photos/date-sugar.webp"],
    sizes: [{ label: "250 g", price: 45 }, { label: "500 g", price: 85 }, { label: "1 kg", price: 160 }],
    ingredients: "Dattes marocaines 100 %.",
    usage:
      "Dans les pâtisseries, smoothies, thé et café, ou sur yaourt et porridge. S'utilise à peu près dans les mêmes quantités que le sucre.",
    benefits: "Riche en fibres, potassium et magnésium, avec un index glycémique plus bas que le sucre blanc.",
    shelfLife: "12 mois dans un endroit sec, dans un bocal bien fermé.",
  },
  {
    slug: "sirop-de-dattes",
    ar: {"name":"دبس التمر","category":"منتجات التمر","short":"عسل التمر الطبيعي","description":"دبس تمر تقليدي محضّر ببطء من تمور مختارة، بدون سكر مضاف. قوام كثيف ونكهة كراميل طبيعية.","ingredients":"تمر، ماء.","usage":"مع الخبز والزبدة، في البغرير والمسمن، أو لتحلية المشروبات والحلويات.","benefits":"مصدر طبيعي للطاقة والحديد ومضادات الأكسدة.","shelfLife":"12 شهرًا. بعد الفتح، يُحفظ في مكان بارد."},
    category: "Produits de dattes",
    name: "Sirop de dattes",
    nameAr: "دبس التمر",
    short: "Le miel de dattes naturel",
    description:
      "Sirop de dattes traditionnel, cuit lentement à partir de dattes sélectionnées, sans sucre ajouté. Texture épaisse et goût de caramel naturel.",
    images: ["/assets/akal/photos/date-syrup.webp"],
    sizes: [{ label: "250 ml", price: 40 }, { label: "500 ml", price: 75 }],
    ingredients: "Dattes, eau.",
    usage: "Avec pain et beurre, sur baghrir et msemen, ou pour sucrer boissons et desserts.",
    benefits: "Source naturelle d'énergie, de fer et d'antioxydants.",
    shelfLife: "12 mois. Après ouverture, conserver au frais.",
  },
  {
    slug: "mastic-pur",
    ar: {"name":"المسكة الحرة","category":"العطريات والتوابل","badge":"جديد","short":"مسكة أصلية بحبات صافية","description":"مسكة حرة أصلية بحبات صافية ونقية، لنكهة مميزة في الحلويات والمشروبات والأطباق التقليدية.","ingredients":"مسكة حرة طبيعية 100%.","usage":"تُطحن مع قليل من السكر وتُضاف بكمية صغيرة إلى الحلويات، الحليب، الماء أو الأطباق.","benefits":"معروفة تقليديًا بفوائدها للهضم ولصحة الفم.","shelfLife":"24 شهرًا في علبة محكمة بعيدًا عن الحرارة."},
    category: "Aromates & épices",
    badge: "Nouveau",
    name: "Mastic pur",
    nameAr: "المسكة الحرة",
    short: "Gomme de mastic authentique",
    description:
      "Gomme de mastic authentique en larmes claires et pures, pour parfumer pâtisseries, boissons et plats traditionnels.",
    images: ["/assets/akal/photos/mastic.webp"],
    sizes: [{ label: "10 g", price: 60 }, { label: "25 g", price: 135 }],
    ingredients: "Gomme de mastic naturelle 100 %.",
    usage:
      "Piler avec un peu de sucre et ajouter en petite quantité aux desserts, au lait, à l'eau ou aux plats.",
    benefits: "Traditionnellement connu pour ses bienfaits sur la digestion et l'hygiène buccale.",
    shelfLife: "24 mois dans un contenant hermétique, à l'abri de la chaleur.",
  },
  {
    slug: "eau-de-rose",
    ar: {"name":"ماء الورد","category":"العناية الطبيعية","badge":"الأكثر مبيعاً","short":"ماء ورد طبيعي مقطّر","description":"ماء ورد طبيعي مقطّر بطريقة تقليدية من الورد البلدي. للبشرة وللطبخ والحلويات.","ingredients":"ورد بلدي مقطّر، ماء.","usage":"كمنعش ومنظف للبشرة صباحًا ومساءً، أو بضع قطرات في الحلويات والمشروبات.","benefits":"يرطب البشرة وينعشها، ويضفي رائحة ورد طبيعية.","shelfLife":"12 شهرًا بعيدًا عن الضوء والحرارة."},
    category: "Soins naturels",
    badge: "Best-seller",
    name: "Eau de rose",
    nameAr: "ماء الورد",
    short: "Eau de rose naturelle distillée",
    description:
      "Eau de rose naturelle, distillée de façon traditionnelle à partir de roses beldi. Pour la peau, la cuisine et les pâtisseries.",
    images: ["/assets/akal/rose-water-1.svg", "/assets/akal/rose-water-2.svg"],
    sizes: [{ label: "250 ml", price: 35 }, { label: "500 ml", price: 60 }],
    ingredients: "Roses beldi distillées, eau.",
    usage: "En tonique pour le visage matin et soir, ou quelques gouttes dans desserts et boissons.",
    benefits: "Hydrate et rafraîchit la peau, parfum naturel de rose.",
    shelfLife: "12 mois à l'abri de la lumière et de la chaleur.",
  },
  {
    slug: "beurre-naturel",
    ar: {"name":"الزبدة الطبيعية","category":"الزبدة والكريمات","short":"زبدة وكريمات طبيعية","description":"زبدة وكريمات طبيعية، منزلية الصنع وبدون مواد حافظة. ستُضاف تفاصيل هذا المنتج (المكوّنات وغيرها) قريباً."},
    category: "Beurre & crèmes",
    name: "Beurre naturel",
    short: "Beurre et crèmes naturels",
    description:
      "Beurre et crèmes naturels, faits maison et sans conservateurs. Les détails de ce produit (tailles, ingrédients) seront ajoutés prochainement.",
    images: ["/assets/akal/placeholder.svg"],
    sizes: [{ label: "250 g", price: 70 }, { label: "500 g", price: 130 }],
  },
  {
    slug: "chebakia",
    ar: {"name":"الشباكية","category":"حلويات تقليدية","short":"حلويات مغربية تقليدية","description":"حلويات مغربية تقليدية، مصنوعة يدوياً. ستُضاف تفاصيل هذا المنتج (المكوّنات وغيرها) قريباً."},
    category: "Douceurs traditionnelles",
    name: "Chebakia",
    short: "Douceurs traditionnelles marocaines",
    description:
      "Douceurs traditionnelles marocaines, faites à la main. Les détails de ce produit (tailles, ingrédients) seront ajoutés prochainement.",
    images: ["/assets/akal/placeholder.svg"],
    sizes: [{ label: "500 g", price: 90 }, { label: "1 kg", price: 170 }],
  },
  {
    slug: "melange-energie",
    ar: {"name":"الشريحة بالمكسرات","category":"الطاقة والعافية","short":"دفعة طاقة طبيعية طوال اليوم","description":"خليط طبيعي منزلي الصنع من مكوّنات مختارة، لطاقة صحية يومياً."},
    category: "Énergie & bien-être",
    name: "Énergie naturelle",
    nameAr: "الشريحة بالمكسرات",
    short: "Un boost naturel pour toute la journée",
    description: "Mélange naturel fait maison, préparé à partir d'ingrédients sélectionnés, pour un apport d'énergie sain au quotidien.",
    images: ["/assets/akal/photos/energy-jar.webp"],
    sizes: [{ label: "250 g", price: 65 }, { label: "500 g", price: 120 }],
  },
  {
    slug: "henne-naturel",
    ar: {"name":"الحناء الطبيعية","category":"العناية الطبيعية","short":"حناء صافية للشعر واليدين","description":"حناء طبيعية مطحونة ناعماً بدون إضافات، لتلوين الشعر وتقويته ولليدين."},
    category: "Soins naturels",
    name: "Henné naturel",
    nameAr: "الحناء الطبيعية",
    short: "Henné pur pour cheveux et mains",
    description: "Henné naturel finement moulu, sans additifs, pour colorer et fortifier les cheveux et pour les mains.",
    images: ["/assets/akal/photos/henna.webp"],
    sizes: [{ label: "100 g", price: 25 }, { label: "250 g", price: 55 }],
  },
  {
    slug: "figues-sechees",
    ar: {"name":"التين المجفف","category":"الفواكه الجافة","short":"تين مغربي مجفف تحت الشمس","description":"تين مغربي مجفف طبيعياً تحت الشمس، بدون سكر مضاف أو مواد حافظة."},
    category: "Fruits secs",
    name: "Figues séchées",
    nameAr: "التين المجفف",
    short: "Figues marocaines séchées au soleil",
    description: "Figues marocaines séchées naturellement au soleil, sans sucre ajouté ni conservateurs.",
    images: ["/assets/akal/photos/dried-fig.webp"],
    sizes: [{ label: "250 g", price: 40 }, { label: "500 g", price: 75 }],
  },
  {
    slug: "amandes",
    ar: {"name":"اللوز","category":"الفواكه الجافة","short":"لوز مغربي طبيعي","description":"لوز مغربي مختار، طبيعي ومقرمش، مثالي كوجبة خفيفة أو في الحلويات."},
    category: "Fruits secs",
    name: "Amandes",
    nameAr: "اللوز",
    short: "Amandes marocaines naturelles",
    description: "Amandes marocaines sélectionnées, naturelles et croquantes, idéales en collation ou en pâtisserie.",
    images: ["/assets/akal/photos/almonds.webp"],
    sizes: [{ label: "250 g", price: 60 }, { label: "500 g", price: 110 }, { label: "1 kg", price: 210 }],
  },
];

export const formatPrice = (n: number, lang: "fr" | "ar" = "fr") => (lang === "ar" ? `${n} درهم` : `${n} DH`);

/** "250 g" -> "250 غ" etc. in Arabic. */
export const sizeLabel = (label: string, lang: "fr" | "ar" = "fr") =>
  lang === "ar" ? label.replace(/ kg$/, " كغ").replace(/ ml$/, " مل").replace(/ g$/, " غ") : label;

/** Product with its texts in the requested language. */
export const localize = (p: ProductDetail, lang: "fr" | "ar"): ProductDetail =>
  lang === "ar" && p.ar ? { ...p, ...p.ar, nameAr: undefined } : p;

// Delivery fee — DEMO VALUES from the AKAL store defaults (marked TODO there): replace with the real ones.
export const SHIPPING_FEE = 30; // MAD
export const FREE_SHIPPING_FROM = 300; // MAD
export const shippingFor = (subtotal: number) => (subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE);

export const WHATSAPP_URL = "https://wa.me/message/GMPBRPK6QRRNM1";

export function getProduct(slug: string) {
  return productDetails.find((p) => p.slug === slug);
}
