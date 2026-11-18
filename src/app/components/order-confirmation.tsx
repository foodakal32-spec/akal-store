"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SiteLink from "./site-link";
import OfferButton from "./offer-button";
import { useLang, useT } from "./i18n";
import { useCart } from "./cart-provider";
import { displayPhone, getOrder, itemName, orderMessage, type Order } from "./orders";
import { cityLabel } from "../checkout-data";
import { formatPrice, sizeLabel, WHATSAPP_URL } from "../product-data";

const font = "[font-family:Inter,_'Inter_Placeholder',_sans-serif]";

/** Redesigned Order Confirmation Page with direct WhatsApp submission and warm customer messaging. */
export default function OrderConfirmation() {
  const params = useSearchParams();
  const id = params.get("n") ?? "";
  const { lang } = useLang();
  const t = useT();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const [idCopied, setIdCopied] = useState(false);
  const [testConfirmed, setTestConfirmed] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const { ready, clear } = useCart();

  useEffect(() => {
    setOrder(id ? getOrder(id) ?? null : null);
  }, [id]);

  // Once the order is loaded, clear the cart so the user doesn't have duplicate items.
  useEffect(() => {
    if (ready && order) clear();
  }, [ready, order, clear]);

  if (order === undefined) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
        <div className="w-12 h-12 rounded-full border-3 border-[#1E504D] border-t-transparent animate-spin" />
        <p className={`text-base text-muted-foreground ${font}`}>{t("Chargement de votre commande…", "جارٍ تحميل تفاصيل طلبك…")}</p>
      </div>
    );
  }

  if (order === null) {
    return (
      <div className="py-20 flex flex-col items-center gap-6 text-center">
        <span className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-2xl font-bold">✕</span>
        <h1 className={`text-3xl font-bold text-color-001 ${font}`}>{t("Commande introuvable", "الطلب غير موجود")}</h1>
        <p className={`text-base text-muted-foreground ${font}`}>
          {t("Nous n'avons pas pu retrouver ce numéro de commande.", "تعذر العثور على هذا الطلب، ربما انتهت صلاحية الجلسة.")}
        </p>
        <SiteLink href="/" className={`h-[3.9375rem] px-10 flex items-center rounded-[99px] bg-[#1E4A2E] text-base font-semibold text-white ${font}`}>
          {t("Retour à l'accueil", "العودة إلى الرئيسية")}
        </SiteLink>
      </div>
    );
  }

  const message = orderMessage(order, lang);
  const whatsappUrl = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;

  function copyOrderId() {
    if (!order) return;
    try {
      navigator.clipboard.writeText(order.id);
      setIdCopied(true);
      setTimeout(() => setIdCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mx-auto w-full max-w-200 flex flex-col gap-8">
      {/* 1. Warm Celebration Header */}
      <header className="flex flex-col items-center gap-4 text-center pt-2">
        <div className="relative flex items-center justify-center">
          <div className="w-22 h-22 rounded-full bg-[#E7F6ED] text-[#1E504D] flex items-center justify-center shadow-lg border-4 border-white">
            <svg viewBox="0 0 24 24" width="42" height="42" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <span className="absolute -top-1 -end-1 w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center text-xs font-bold shadow-md">
            ✓
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className={`text-[2.25rem] font-bold leading-[2.75rem] tracking-tight text-color-001 max-md:text-[1.85rem] max-md:leading-9 ${font}`}>
            {t(`Merci pour votre confiance, ${order.name} !`, `شكراً لثقتك بنا يا ${order.name}! 🎉`)}
          </h1>
          <p className={`text-base leading-relaxed text-muted-foreground max-w-lg mx-auto ${font}`}>
            {t(
              "Votre commande a été enregistrée avec succès. Pour la valider et planifier la livraison à votre adresse, envoyez-la directement sur notre WhatsApp.",
              "تم تسجيل طلبك بنجاح في متجر أكال للمنتجات الطبيعية. لتأكيد الطلب وتحديد موعد التوصيل، يرجى إرساله بنقرة واحدة عبر واتساب.",
            )}
          </p>
        </div>

        {/* Order ID Pill with Copy button */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-black/10 shadow-xs">
          <span className={`text-xs text-muted-foreground ${font}`}>{t("N° de commande", "رقم الطلب")}:</span>
          <strong dir="ltr" className="text-sm font-mono font-bold text-[#1E504D]">{order.id}</strong>
          <button
            type="button"
            onClick={copyOrderId}
            className={`text-xs text-muted-foreground hover:text-color-001 underline transition-colors cursor-pointer ${font}`}
          >
            {idCopied ? t("Copié ✓", "تم النسخ ✓") : t("Copier", "نسخ")}
          </button>
        </div>
      </header>

      {/* 2. Order Confirmation Card (Safe Test Mode) */}
      <section className="rounded-3xl border border-black/[0.06] bg-white p-7 max-md:p-5 card-depth flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3.5">
            <span className="w-12 h-12 rounded-2xl bg-[#E6F2EA] text-[#1E504D] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <div className="flex flex-col">
              <h2 className={`text-xl font-bold text-color-001 ${font}`}>
                {t("Confirmation de votre commande", "تأكيد واستلام طلبك")}
              </h2>
              <span className="text-xs text-amber-700 font-medium">
                {t("Mode Test actif (Aucun message WhatsApp envoyé)", "وضع التجربة مُفعّل (لن يتم إرسال أي رسالة إلى واتساب)")}
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold">
            {t("Mode Test", "وضع التجربة")}
          </span>
        </div>

        {/* Tactile 3D Button in Safe Test Mode (No external navigation) */}
        <OfferButton
          variant="block"
          onClick={() => {
            setTestConfirmed(true);
            try {
              navigator.clipboard.writeText(message);
            } catch {
              /* ignore */
            }
          }}
          label={
            <span className="flex items-center justify-center gap-2.5">
              <span>{testConfirmed ? "✓" : "✨"}</span>
              <span>
                {testConfirmed
                  ? t("Commande confirmée avec succès ✓", "تم تأكيد الطلب بنجاح (وضع تجريبي) ✓")
                  : t("Confirmer la commande (Test)", "تأكيد الطلب التجريبي")}
              </span>
            </span>
          }
        />

        {testConfirmed && (
          <div className="rounded-2xl bg-[#F0FDF4] border border-[#86EFAC]/60 p-4 text-sm text-[#166534] flex items-start gap-3 animate-in fade-in">
            <span className="text-xl shrink-0">✅</span>
            <div className="flex flex-col gap-1">
              <strong className="font-bold">{t("Commande enregistrée avec succès !", "تم تسجيل وتأكيد الطلب بنجاح على جهازك!")}</strong>
              <p className="text-xs leading-relaxed text-[#15803D]">
                {t(
                  "Toutes les données ont été sauvegardées localement. Aucun message WhatsApp n'a été envoyé car le site est en mode test.",
                  "تم حفظ جميع بيانات الطلب بنجاح محلياً في متصفحك. لم يتم إرسال أي رسالة إلى واتساب لأن الموقع قيد التجربة.",
                )}
              </p>
            </div>
          </div>
        )}

        {/* Optional preview toggle to see the message text */}
        <div className="flex flex-col gap-2 pt-1 border-t border-black/5">
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className={`text-xs text-muted-foreground hover:text-color-001 flex items-center justify-center gap-1.5 transition-colors cursor-pointer py-1 ${font}`}
          >
            <span>{showPreview ? "▲" : "▼"}</span>
            <span>
              {showPreview
                ? t("Masquer l'aperçu du texte", "إخفاء معاينة نص الطلب")
                : t("Aperçu du texte préparé pour WhatsApp", "معاينة نص الطلب المجهز لواتساب (دون إرسال)")}
            </span>
          </button>

          {showPreview && (
            <div className="rounded-2xl bg-[#F9FAF8] border border-black/10 p-4 flex flex-col gap-2.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-semibold">{t("Texte généré :", "نص الرسالة التوضيحي:")}</span>
                <button
                  type="button"
                  onClick={() => {
                    try {
                      navigator.clipboard.writeText(message);
                    } catch {
                      /* ignore */
                    }
                  }}
                  className="text-xs text-[#1E504D] hover:underline font-bold"
                >
                  {t("Copier le texte", "نسخ النص")}
                </button>
              </div>
              <pre className="text-xs leading-relaxed text-color-001 whitespace-pre-wrap font-sans bg-white p-3.5 rounded-xl border border-black/5 max-h-60 overflow-y-auto" dir="rtl">
                {message}
              </pre>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium text-center">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>{t("Paiement à la livraison après réception de votre colis", "الدفع نقداً عند الاستلام بعد معاينة وفحص الطلب")}</span>
        </div>
      </section>

      {/* 3. Visual Order Steps Tracker */}
      <section className="rounded-3xl border border-black/[0.06] bg-white p-6 card-depth flex flex-col gap-4">
        <h3 className={`text-base font-bold text-color-001 ${font}`}>
          {t("Suivi de votre commande", "مراحل تجهيز وتوصيل طلبك")}
        </h3>
        <div className="grid grid-cols-4 gap-2 text-center max-sm:grid-cols-2 max-sm:gap-4">
          {/* Step 1: Placed */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="w-10 h-10 rounded-full bg-[#E7F6ED] text-[#1E504D] flex items-center justify-center font-bold text-sm border-2 border-[#1E504D]">
              ✓
            </span>
            <span className={`text-xs font-bold text-color-001 ${font}`}>{t("Enregistrée", "تم التسجيل")}</span>
            <span className="text-[11px] text-muted-foreground">{t("Sur le site", "بالموقع بنجاح")}</span>
          </div>

          {/* Step 2: Confirmation */}
          <div className="flex flex-col items-center gap-1.5">
            <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-xs ${testConfirmed ? "bg-[#1E504D] text-white" : "bg-amber-100 text-amber-800"}`}>
              {testConfirmed ? "✓" : "2"}
            </span>
            <span className={`text-xs font-bold text-color-001 ${font}`}>{t("Confirmation", "تأكيد الطلب")}</span>
            <span className="text-[11px] text-muted-foreground font-medium">
              {testConfirmed ? t("Confirmée ✓", "تم التأكيد ✓") : t("Étape actuelle", "الخطوة الحالية")}
            </span>
          </div>

          {/* Step 3: Preparation */}
          <div className="flex flex-col items-center gap-1.5 opacity-65">
            <span className="w-10 h-10 rounded-full bg-[#F3F4F6] text-muted-foreground flex items-center justify-center font-bold text-sm">
              3
            </span>
            <span className={`text-xs font-semibold text-color-001 ${font}`}>{t("Préparation", "التجهيز اليدوي")}</span>
            <span className="text-[11px] text-muted-foreground">{t("100% naturel", "طبيعي 100%")}</span>
          </div>

          {/* Step 4: Delivery */}
          <div className="flex flex-col items-center gap-1.5 opacity-65">
            <span className="w-10 h-10 rounded-full bg-[#F3F4F6] text-muted-foreground flex items-center justify-center font-bold text-sm">
              4
            </span>
            <span className={`text-xs font-semibold text-color-001 ${font}`}>{t("Livraison", "التوصيل والاستلام")}</span>
            <span className="text-[11px] text-muted-foreground">{t("À domicile", "لباب منزلك")}</span>
          </div>
        </div>
      </section>

      {/* 4. Complete Order Details Summary */}
      <section className="flex flex-col gap-5 rounded-3xl border border-black/[0.06] bg-white p-6 card-depth">
        <h2 className={`text-xl font-bold text-color-001 ${font}`}>{t("Récapitulatif de la commande", "تفاصيل المنتجات والفاتورة")}</h2>

        <ul className="flex flex-col divide-y divide-black/10">
          {order.items.map((i) => (
            <li key={`${i.slug}-${i.size}`} className="py-3 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface shrink-0 border border-black/5">
                <img src={i.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-base font-semibold text-color-001 truncate ${font}`}>
                  {itemName(i.slug, i.name, lang)}
                </p>
                <p className={`text-sm text-muted-foreground ${font}`}>
                  {i.qty} × {sizeLabel(i.size, lang)}
                </p>
              </div>
              <p className={`text-base font-bold text-color-001 shrink-0 ${font}`}>
                {formatPrice(i.qty * i.price, lang)}
              </p>
            </li>
          ))}
        </ul>

        {/* Cost breakdown */}
        <dl className={`flex flex-col gap-2.5 border-t border-black/10 pt-4 text-base ${font}`}>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{t("Sous-total", "المجموع الفرعي")}</dt>
            <dd className="text-color-001 font-medium">{formatPrice(order.subtotal, lang)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">{t("Frais de livraison", "مصاريف التوصيل")}</dt>
            <dd className="text-color-001 font-medium">
              {order.shipping === 0 ? (
                <span className="text-[#1E4A2E] font-bold">{t("Offerte ✓", "مجاني ✓")}</span>
              ) : (
                formatPrice(order.shipping, lang)
              )}
            </dd>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-3 text-xl">
            <dt className="font-bold text-color-001">{t("Total à payer", "المجموع الكلي المطلوب")}</dt>
            <dd className="font-bold text-[#1E4A2E]">{formatPrice(order.total, lang)}</dd>
          </div>
        </dl>

        {/* Customer & Delivery address */}
        <div className={`flex flex-col gap-1.5 border-t border-black/10 pt-4 text-sm ${font}`}>
          <p className="font-bold text-base text-color-001 mb-1">{t("Informations de livraison", "معلومات المستلم والعنوان")}:</p>
          <p className="text-color-001 font-medium">
            {order.name} · <span dir="ltr" className="text-muted-foreground">{displayPhone(order.phone)}</span>
          </p>
          <p className="text-muted-foreground">
            {order.address}, {cityLabel(order.city, lang)}
          </p>
          {order.note && (
            <p className="text-muted-foreground italic">
              « {order.note} »
            </p>
          )}
          <div className="mt-2 inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-[#F3F8F5] border border-[#1E504D]/20 text-xs font-semibold text-[#1E504D]">
            <span>✓ {t("Paiement à la livraison", "الدفع عند الاستلام")}</span>
          </div>
        </div>
      </section>

      {/* 5. Return to Shop Link */}
      <div className="flex flex-col items-center gap-3 pt-2 pb-6">
        <SiteLink
          href="/produits"
          className={`h-12 px-8 flex items-center rounded-full bg-[#1E4A2E] text-white text-base font-semibold hover:bg-[#163823] active:scale-95 transition-all shadow-sm ${font}`}
        >
          {t("Découvrir d'autres produits", "تصفح باقي المنتجات الطبيعية")}
        </SiteLink>
        <SiteLink href="/" className={`text-sm text-muted-foreground hover:text-color-001 underline ${font}`}>
          {t("Retour à l'accueil", "العودة إلى الصفحة الرئيسية")}
        </SiteLink>
      </div>
    </div>
  );
}
