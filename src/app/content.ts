// Semantic page content extracted from recognized recipe sections.

export type FeatureCardDataItem = {
  href: string;
  title: string;
  titleAr?: string;
  href2: string;
  description: string;
  descriptionAr?: string;
};
export const featureCardData: FeatureCardDataItem[] = [
    { href: "/produits", title: "Produits", titleAr: "المنتجات", href2: "/produits", description: "Produits", descriptionAr: "المنتجات" },
    { href: "/histoire", title: "Histoire", titleAr: "قصتنا", href2: "/histoire", description: "Histoire", descriptionAr: "قصتنا" },
    { href: "/valeurs", title: "Valeurs", titleAr: "قيمنا", href2: "/valeurs", description: "Valeurs", descriptionAr: "قيمنا" },
    { href: "/contact", title: "Contact", titleAr: "اتصل بنا", href2: "/contact", description: "Contact", descriptionAr: "اتصل بنا" }
];

export type ProductsItem = {
  slug: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  imgSrc: string;
  srcSet: string;
  width: string;
};
export const products: ProductsItem[] = [
    { slug: "sucre-de-dattes", title: "Sucre de dattes", titleAr: "سكر التمر", description: "Un sucre naturel de dattes, fait maison, sans conservateurs.", descriptionAr: "سكر تمر طبيعي، منزلي الصنع، بدون مواد حافظة.", imgSrc: "/assets/akal/photos/date-sugar.webp", srcSet: "/assets/akal/photos/date-sugar.webp 1125w", width: "400" },
    { slug: "sirop-de-dattes", title: "Sirop de dattes", titleAr: "دبس التمر", description: "Un sirop de dattes naturel, fait à la main, pour sucrer simplement.", descriptionAr: "دبس تمر طبيعي، مصنوع يدوياً، لتحلية بسيطة.", imgSrc: "/assets/akal/photos/date-syrup.webp", srcSet: "/assets/akal/photos/date-syrup.webp 1125w", width: "400" },
    { slug: "mastic-pur", title: "Mastic pur", titleAr: "المسكة الحرة", description: "Une mastic pure et authentique (المسكة الحرة), préparée avec soin.", descriptionAr: "مسكة حرة أصلية ونقية، محضّرة بعناية.", imgSrc: "/assets/akal/photos/mastic.webp", srcSet: "/assets/akal/photos/mastic.webp 1125w", width: "400" },
    { slug: "eau-de-rose", title: "Eau de rose", titleAr: "ماء الورد", description: "Une eau de rose naturelle (ماء الورد), faite maison.", descriptionAr: "ماء ورد طبيعي، منزلي الصنع.", imgSrc: "/assets/akal/rose-water-1.svg", srcSet: "/assets/akal/rose-water-1.svg 400w", width: "400" },
    { slug: "beurre-naturel", title: "Beurre naturel", titleAr: "الزبدة الطبيعية", description: "Beurre et crèmes naturels, faits maison et sans conservateurs.", descriptionAr: "زبدة وكريمات طبيعية، منزلية الصنع وبدون مواد حافظة.", imgSrc: "/assets/akal/placeholder.svg", srcSet: "/assets/akal/placeholder.svg 400w", width: "400" },
    { slug: "chebakia", title: "Chebakia", titleAr: "الشباكية", description: "Douceurs traditionnelles marocaines, faites à la main.", descriptionAr: "حلويات مغربية تقليدية، مصنوعة يدوياً.", imgSrc: "/assets/akal/placeholder.svg", srcSet: "/assets/akal/placeholder.svg 400w", width: "400" },
    { slug: "melange-energie", title: "Énergie naturelle", titleAr: "الشريحة بالمكسرات", description: "Mélange naturel fait maison.", descriptionAr: "خليط طبيعي منزلي الصنع من مكوّنات مختارة.", imgSrc: "/assets/akal/photos/energy-jar.webp", srcSet: "/assets/akal/photos/energy-jar.webp 1125w", width: "400" },
    { slug: "henne-naturel", title: "Henné naturel", titleAr: "الحناء الطبيعية", description: "Henné naturel finement moulu.", descriptionAr: "حناء طبيعية مطحونة ناعماً بدون إضافات.", imgSrc: "/assets/akal/photos/henna.webp", srcSet: "/assets/akal/photos/henna.webp 1125w", width: "400" },
    { slug: "figues-sechees", title: "Figues séchées", titleAr: "التين المجفف", description: "Figues marocaines séchées naturellement au soleil.", descriptionAr: "تين مغربي مجفف طبيعياً تحت الشمس.", imgSrc: "/assets/akal/photos/dried-fig.webp", srcSet: "/assets/akal/photos/dried-fig.webp 1125w", width: "400" },
    { slug: "amandes", title: "Amandes", titleAr: "اللوز", description: "Amandes marocaines sélectionnées.", descriptionAr: "لوز مغربي مختار.", imgSrc: "/assets/akal/photos/almonds.webp", srcSet: "/assets/akal/photos/almonds.webp 1125w", width: "400" }
];

export type Tile2DataItem = {
  href: string;
  description: string;
  descriptionAr?: string;
  target?: string;
};
export const tile2Data: Tile2DataItem[] = [
    { href: "/#products", description: "Sucre de dattes", descriptionAr: "سكر التمر" },
    { href: "/#products", description: "Sirop de dattes", descriptionAr: "دبس التمر" },
    { href: "/#products", description: "Mastic pur", descriptionAr: "المسكة الحرة" },
    { href: "https://wa.me/message/GMPBRPK6QRRNM1", target: "_blank", description: "WhatsApp", descriptionAr: "واتساب" }
];

export type Tile3DataItem = {
  href: string;
  description: string;
  descriptionAr?: string;
};
export const tile3Data: Tile3DataItem[] = [
    { href: "/histoire", description: "Notre histoire", descriptionAr: "قصتنا" },
    { href: "/valeurs", description: "Nos valeurs", descriptionAr: "قيمنا" },
    { href: "https://www.instagram.com/akal.fr", description: "Instagram", descriptionAr: "إنستغرام" }
];

export type Tile4DataItem = {
  href: string;
  description: string;
  descriptionAr?: string;
  target?: string;
};
export const tile4Data: Tile4DataItem[] = [
    { href: "/#products", description: "Sucre de dattes", descriptionAr: "سكر التمر" },
    { href: "/#products", description: "Sirop de dattes", descriptionAr: "دبس التمر" },
    { href: "/#products", description: "Mastic pur", descriptionAr: "المسكة الحرة" },
    { href: "https://wa.me/message/GMPBRPK6QRRNM1", target: "_blank", description: "WhatsApp", descriptionAr: "واتساب" }
];

export type Tile5DataItem = {
  href: string;
  description: string;
  descriptionAr?: string;
};
export const tile5Data: Tile5DataItem[] = [
    { href: "/histoire", description: "Notre histoire", descriptionAr: "قصتنا" },
    { href: "/valeurs", description: "Nos valeurs", descriptionAr: "قيمنا" },
    { href: "https://www.instagram.com/akal.fr", description: "Instagram", descriptionAr: "إنستغرام" }
];

