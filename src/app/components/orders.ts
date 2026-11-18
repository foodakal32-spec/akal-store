"use client";

// Orders are kept in this browser only: the site is static and has no server to receive them.
// The customer finishes the order by sending its summary on WhatsApp (see order-confirmation.tsx).

import type { CartItem } from "./cart-provider";
import type { Lang } from "./i18n";
import { cityLabel } from "../checkout-data";
import { formatPrice, localize, productDetails, sizeLabel } from "../product-data";

export type Order = {
  id: string;
  createdAt: string;
  name: string;
  phone: string; // normalized +2126XXXXXXXX
  city: string; // French city name (canonical)
  address: string;
  note: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

const KEY = "akal-orders-v1";

export function newOrderId() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `AK-${ymd}-${rand}`;
}

function readAll(): Order[] {
  try {
    const list = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  const list = readAll().filter((o) => o.id !== order.id);
  list.unshift(order);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, 20)));
  } catch {
    /* ignore */
  }
}

export function getOrder(id: string): Order | undefined {
  return readAll().find((o) => o.id === id);
}

export function itemName(slug: string, fallback: string, lang: Lang) {
  const p = productDetails.find((d) => d.slug === slug);
  return p ? localize(p, lang).name : fallback;
}

export function displayPhone(normalized: string) {
  return normalized.replace(/^\+212/, "0").replace(/(\d{2})(?=\d)/g, "$1 ").trim();
}

/** WhatsApp message summarizing the order, in the page language. */
export function orderMessage(o: Order, lang: Lang) {
  const items = o.items.map((i) => `▫️ ${i.qty} × ${itemName(i.slug, i.name, lang)} (${sizeLabel(i.size, lang)}) : ${formatPrice(i.qty * i.price, lang)}`);
  const ship = o.shipping === 0 ? (lang === "ar" ? "مجاني ✓" : "Offerte ✓") : formatPrice(o.shipping, lang);

  if (lang === "ar") {
    return [
      `🌿 *طلب جديد من متجر أكال | AKAL*`,
      `━━━━━━━━━━━━━━━━━━`,
      `📦 *رقم الطلب:* ${o.id}`,
      `👤 *الاسم:* ${o.name}`,
      `📱 *الهاتف:* ${displayPhone(o.phone)}`,
      `📍 *المدينة:* ${cityLabel(o.city, "ar")}`,
      `🏡 *العنوان:* ${o.address}`,
      ...(o.note ? [`📝 *ملاحظة:* ${o.note}`] : []),
      `━━━━━━━━━━━━━━━━━━`,
      `🛍️ *تفاصيل المنتجات:*`,
      ...items,
      `━━━━━━━━━━━━━━━━━━`,
      `🚚 *التوصيل:* ${ship}`,
      `💰 *المجموع الكلي:* ${formatPrice(o.total, lang)}`,
      `💵 *طريقة الدفع:* الدفع نقداً عند الاستلام`,
      `━━━━━━━━━━━━━━━━━━`,
      `✨ مرحباً، أود تأكيد هذا الطلب. شكراً لكم!`,
    ].join("\n");
  }

  return [
    `🌿 *Nouvelle commande sur AKAL*`,
    `━━━━━━━━━━━━━━━━━━`,
    `📦 *N° de commande :* ${o.id}`,
    `👤 *Nom :* ${o.name}`,
    `📱 *Téléphone :* ${displayPhone(o.phone)}`,
    `📍 *Ville :* ${o.city}`,
    `🏡 *Adresse :* ${o.address}`,
    ...(o.note ? [`📝 *Note :* ${o.note}`] : []),
    `━━━━━━━━━━━━━━━━━━`,
    `🛍️ *Articles commandés :*`,
    ...items,
    `━━━━━━━━━━━━━━━━━━`,
    `🚚 *Livraison :* ${ship}`,
    `💰 *Total à payer :* ${formatPrice(o.total, lang)}`,
    `💵 *Mode de paiement :* Paiement à la livraison`,
    `━━━━━━━━━━━━━━━━━━`,
    `✨ Bonjour, je confirme ma commande. Merci !`,
  ].join("\n");
}
