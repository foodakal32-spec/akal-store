export const dynamic = "force-static";

const body = [
  "# AKAL أكال — Produits naturels faits maison",
  "",
  "Produits naturels faits maison, 100% à la main, sans conservateurs, pour une vie plus saine.",
  "",
  "Instagram: https://www.instagram.com/akal.fr",
  "WhatsApp: https://wa.me/message/GMPBRPK6QRRNM1",
  "",
].join("\n");

export function GET() {
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
