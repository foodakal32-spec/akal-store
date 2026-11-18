import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "../lib/site";
import { productDetails } from "./product-data";

export const dynamic = "force-static";

const PAGES = ["", "/produits", "/histoire", "/valeurs", "/contact", "/politiques/livraison", "/politiques/retours", "/politiques/conditions", "/politiques/confidentialite"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({ url: SITE_ORIGIN + (p || "/"), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...productDetails.map((p) => ({ url: `${SITE_ORIGIN}/produits/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
