"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import SiteLink from "./site-link";
import OfferButton from "./offer-button";
import { useCart } from "./cart-provider";
import { useLang, useT } from "./i18n";
import { itemName, newOrderId, saveOrder } from "./orders";
import { normalizeMoroccanPhone, sortedCities } from "../checkout-data";
import { FREE_SHIPPING_FROM, formatPrice, shippingFor, sizeLabel } from "../product-data";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";
const field = `w-full h-14 rounded-2xl border border-black/15 bg-white px-5 text-base text-color-001 outline-none focus:border-[#1E504D] focus:ring-2 focus:ring-[#1E504D]/20 aria-[invalid=true]:border-[#B3261E] ${font}`;

type Errors = Partial<Record<"name" | "phone" | "city" | "address", string>>;

/** Checkout form: delivery details, cash on delivery, order summary. */
export default function CheckoutView() {
  const { items, total: subtotal, count, ready } = useCart();
  const { lang } = useLang();
  const t = useT();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "", note: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  if (!ready) return <p className={`py-20 text-center text-base text-muted-foreground ${font}`}>{t("Chargement…", "جارٍ التحميل…")}</p>;

  if (items.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center gap-6 text-center">
        <h2 className={`text-3xl font-bold text-color-001 ${font}`}>{t("Votre panier est vide", "سلتك فارغة")}</h2>
        <SiteLink href="/produits" className={`h-[3.9375rem] px-10 flex items-center rounded-[99px] bg-[#344E2F] text-base font-semibold text-white ${font}`}>{t("Découvrir nos produits", "اكتشف منتجاتنا")}</SiteLink>
      </div>
    );
  }

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k as keyof Errors]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  function validate(): { errs: Errors; phone: string | null } {
    const errs: Errors = {};
    if (form.name.trim().length < 3) errs.name = t("Veuillez saisir votre nom complet", "المرجو إدخال الاسم الكامل");
    const phone = normalizeMoroccanPhone(form.phone);
    if (!phone) errs.phone = t("Numéro marocain invalide (06/07 ou +212)", "رقم هاتف مغربي غير صالح (06/07 أو 212+)");
    if (!form.city) errs.city = t("Veuillez choisir une ville", "المرجو اختيار مدينة");
    if (form.address.trim().length < 8) errs.address = t("Veuillez saisir une adresse détaillée", "المرجو إدخال عنوان مفصّل");
    return { errs, phone };
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const { errs, phone } = validate();
    setErrors(errs);
    if (Object.keys(errs).length || !phone) {
      const first = (["name", "phone", "city", "address"] as const).find((k) => errs[k]);
      if (first) document.getElementById(`co-${first}`)?.focus();
      return;
    }
    setSending(true);
    const id = newOrderId();
    saveOrder({
      id,
      createdAt: new Date().toISOString(),
      name: form.name.trim(),
      phone,
      city: form.city,
      address: form.address.trim(),
      note: form.note.trim(),
      items,
      subtotal,
      shipping,
      total,
    });
    // The cart is emptied on the confirmation page, so this page never flashes "empty cart".
    router.push(`/commande/confirmation?n=${encodeURIComponent(id)}`);
  }

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`co-${k}-err`} className={`text-sm text-[#B3261E] ${font}`}>
        {errors[k]}
      </p>
    ) : null;

  const label = `text-base font-semibold text-color-001 ${font}`;

  return (
    <form onSubmit={submit} noValidate className="grid grid-cols-[1fr_26rem] gap-10 items-start max-lg:grid-cols-1">
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-5 rounded-3xl border border-black/[0.06] bg-white p-8 card-depth max-md:p-5">
          <h2 className={`text-2xl font-bold text-color-001 ${font}`}>{t("Informations de livraison", "معلومات التوصيل")}</h2>

          <div className="flex flex-col gap-2">
            <label htmlFor="co-name" className={label}>{t("Nom complet", "الاسم الكامل")}</label>
            <input id="co-name" autoComplete="name" value={form.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "co-name-err" : undefined} className={field} />
            {err("name")}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="co-phone" className={label}>{t("Téléphone", "رقم الهاتف")}</label>
            <input id="co-phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" placeholder="06 12 34 56 78" value={form.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "co-phone-err" : "co-phone-hint"} className={`${field} rtl:text-right`} />
            {err("phone") ?? <p id="co-phone-hint" className={`text-sm text-muted-foreground ${font}`}>{t("Ex. : 0612345678 ou +212612345678", "مثال: 0612345678 أو 212612345678+")}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="co-city" className={label}>{t("Ville", "المدينة")}</label>
            <select id="co-city" value={form.city} onChange={set("city")} aria-invalid={!!errors.city} aria-describedby={errors.city ? "co-city-err" : undefined} className={field}>
              <option value="">{t("Choisissez votre ville", "اختر مدينتك")}</option>
              {sortedCities(lang).map((c) => (
                <option key={c.fr} value={c.fr}>{c[lang]}</option>
              ))}
            </select>
            {err("city")}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="co-address" className={label}>{t("Adresse complète", "العنوان الكامل")}</label>
            <textarea id="co-address" rows={3} autoComplete="street-address" placeholder={t("Quartier, rue, numéro…", "الحي، الشارع، رقم المنزل…")} value={form.address} onChange={set("address")} aria-invalid={!!errors.address} aria-describedby={errors.address ? "co-address-err" : undefined} className={`${field} h-auto py-4 resize-none`} />
            {err("address")}
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-3xl border border-black/[0.06] bg-white p-8 card-depth max-md:p-5">
          <div className="flex items-center justify-between">
            <h2 className={`text-2xl font-bold text-color-001 ${font}`}>{t("Mode de paiement", "طريقة الدفع")}</h2>
            <span className={`text-xs text-muted-foreground ${font}`}>{t("1 mode disponible", "طريقة واحدة متاحة حالياً")}</span>
          </div>

          <div className="flex flex-col gap-3">
            {/* 1. Cash on Delivery (Active & Selected) */}
            <div className="flex items-start gap-4 rounded-2xl border-2 border-[#1E504D] bg-[#F3F8F5] p-5 cursor-default shadow-xs">
              <span aria-hidden="true" className="mt-1 w-5 h-5 shrink-0 rounded-full border-[6px] border-[#1E504D] bg-white" />
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-base font-semibold text-color-001 ${font}`}>{t("Paiement à la livraison", "الدفع عند الاستلام")}</p>
                  <span className={`px-2.5 py-0.5 rounded-full bg-[#1E504D]/10 text-[#1E504D] text-xs font-bold ${font}`}>
                    {t("Actif", "مفعّل")}
                  </span>
                </div>
                <p className={`text-sm text-muted-foreground ${font}`}>{t("Payez en espèces à la réception de votre commande.", "ادفع نقدًا عند استلام طلبك بعد المعاينة.")}</p>
              </div>
            </div>

            {/* 2. Bank Card (Disabled) */}
            <div className="flex items-start gap-4 rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-5 opacity-60 cursor-not-allowed select-none">
              <span aria-hidden="true" className="mt-1 w-5 h-5 shrink-0 rounded-full border-2 border-black/25 bg-white" />
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground" aria-hidden="true">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                    <p className={`text-base font-semibold text-muted-foreground ${font}`}>
                      {t("Carte bancaire", "الدفع بالبطاقة البنكية")}
                    </p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full bg-black/5 text-muted-foreground text-xs font-semibold ${font}`}>
                    {t("Bientôt disponible", "غير متاح حالياً — قريباً")}
                  </span>
                </div>
                <p className={`text-sm text-muted-foreground/80 ${font}`}>
                  {t("Paiement sécurisé par Visa, Mastercard et CMI (bientôt disponible).", "الدفع الآمن عبر البطاقات البنكية المغربية والدولية (قريباً).")}
                </p>
              </div>
            </div>

            {/* 3. Google Pay (Disabled) */}
            <div className="flex items-start gap-4 rounded-2xl border border-dashed border-black/15 bg-black/[0.02] p-5 opacity-60 cursor-not-allowed select-none">
              <span aria-hidden="true" className="mt-1 w-5 h-5 shrink-0 rounded-full border-2 border-black/25 bg-white" />
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="text-muted-foreground" aria-hidden="true">
                      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                    </svg>
                    <p className={`text-base font-semibold text-muted-foreground ${font}`}>
                      Google Pay
                    </p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full bg-black/5 text-muted-foreground text-xs font-semibold ${font}`}>
                    {t("Bientôt disponible", "غير متاح حالياً — قريباً")}
                  </span>
                </div>
                <p className={`text-sm text-muted-foreground/80 ${font}`}>
                  {t("Réglez vos achats en un clic via votre compte Google (bientôt disponible).", "الدفع السريع بنقرة واحدة عبر حساب Google (قريباً).")}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside className="flex flex-col gap-5 rounded-3xl border border-black/[0.06] bg-white p-6 card-depth lg:sticky lg:top-6">
        <h2 className={`text-2xl font-bold text-color-001 ${font}`}>{t("Récapitulatif", "ملخص الطلب")}</h2>
        <ul className="flex flex-col gap-4">
          {items.map((i) => (
            <li key={`${i.slug}-${i.size}`} className="flex items-center gap-4">
              <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-surface">
                <img src={i.image} alt="" className="w-full h-full object-cover" />
                <span className="absolute -top-1 -end-1 min-w-6 h-6 px-1.5 flex items-center justify-center rounded-full bg-[#1E504D] text-xs font-bold text-white">{i.qty}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-base font-semibold text-color-001 truncate ${font}`}>{itemName(i.slug, i.name, lang)}</p>
                <p className={`text-sm text-muted-foreground ${font}`}>{sizeLabel(i.size, lang)}</p>
              </div>
              <p className={`text-base font-semibold text-color-001 ${font}`}>{formatPrice(i.qty * i.price, lang)}</p>
            </li>
          ))}
        </ul>
        <dl className={`flex flex-col gap-3 border-t border-black/10 pt-4 text-base ${font}`}>
          <div className="flex justify-between"><dt className="text-muted-foreground">{t("Sous-total", "المجموع الفرعي")} ({count})</dt><dd className="font-semibold text-color-001">{formatPrice(subtotal, lang)}</dd></div>
          <div className="flex justify-between"><dt className="text-muted-foreground">{t("Livraison", "التوصيل")}</dt><dd className="font-semibold text-color-001">{shipping === 0 ? t("Offerte", "مجاني") : formatPrice(shipping, lang)}</dd></div>
          <div className="flex justify-between border-t border-black/10 pt-4 text-xl"><dt className="font-semibold text-color-001">{t("Total", "المجموع")}</dt><dd className="font-bold text-[#1E4A2E]">{formatPrice(total, lang)}</dd></div>
        </dl>
        {shipping > 0 && (
          <p className={`text-sm text-[#1E504D] ${font}`}>
            {t(`Livraison offerte dès ${formatPrice(FREE_SHIPPING_FROM, "fr")}.`, `التوصيل مجاني ابتداءً من ${formatPrice(FREE_SHIPPING_FROM, "ar")}.`)}
          </p>
        )}
        <OfferButton variant="block" submit disabled={sending} className="w-full" label={sending ? t("Envoi en cours…", "جارٍ الإرسال…") : t("Valider la commande", "تأكيد الطلب")} />
        <p className={`text-xs leading-5 text-muted-foreground ${font}`}>
          {t("En validant, vous acceptez nos ", "بتأكيد الطلب، أنت توافق على ")}
          <SiteLink href="/politiques/conditions" className="underline">{t("conditions de vente", "شروط البيع")}</SiteLink>
          {t(" et notre ", " و")}
          <SiteLink href="/politiques/confidentialite" className="underline">{t("politique de confidentialité", "سياسة الخصوصية")}</SiteLink>.
        </p>
      </aside>
    </form>
  );
}
