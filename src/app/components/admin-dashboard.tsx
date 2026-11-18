"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase, supabaseConfigured, type ProductRow } from "../../lib/supabase";
import { productDetails } from "../product-data";
import GlassBackground from "./glass-background";
import { SCHEMA_SQL } from "../../lib/schema-sql";

const GREEN = "#1E504D"; // AKAL teal
const NAVY = "#0E2A3A";
const LIME = "#d8ff7c";
const font = "[font-family:var(--font-tajawal),Inter,sans-serif]";
const fmt = (n: number) => `${n} درهم`;

const emptyProduct = (): ProductRow => ({
  slug: "", name_fr: "", name_ar: "", category_fr: "", category_ar: "", badge_fr: null, badge_ar: null,
  short_fr: "", short_ar: "", description_fr: "", description_ar: "", image: "",
  sizes: [{ label: "250 g", price: 0 }], in_stock: true, position: 0,
});

/** Existing static products -> table rows (used by "import current products"). */
const staticRows = (): ProductRow[] =>
  productDetails.map((p, i) => ({
    slug: p.slug, name_fr: p.name, name_ar: p.ar?.name ?? p.nameAr ?? p.name,
    category_fr: p.category, category_ar: p.ar?.category ?? "",
    badge_fr: p.badge ?? null, badge_ar: p.ar?.badge ?? null,
    short_fr: p.short, short_ar: p.ar?.short ?? "", description_fr: p.description, description_ar: p.ar?.description ?? "",
    image: p.images[0] ?? "", sizes: p.sizes, in_stock: true, position: i,
  }));

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/* ───────────── data layer: Supabase, or an in-memory demo when it is not connected ───────────── */
function useStore(demo: boolean, signedIn: boolean) {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setError("");
    if (demo) { setRows((r) => (r.length ? r : staticRows())); setLoading(false); return; }
    const sb = getSupabase();
    if (!sb || !signedIn) return;
    setLoading(true);
    const { data, error } = await sb.from("products").select("*").order("position");
    if (error) setError(error.message); else setRows((data ?? []) as ProductRow[]);
    setLoading(false);
  }, [demo, signedIn]);

  useEffect(() => { void load(); }, [load]);

  const save = async (row: ProductRow) => {
    if (demo) { setRows((r) => (r.some((x) => x.slug === row.slug) ? r.map((x) => (x.slug === row.slug ? row : x)) : [...r, { ...row, position: r.length }])); return ""; }
    const { error } = await getSupabase()!.from("products").upsert(row);
    if (error) return error.message;
    await load(); return "";
  };
  const remove = async (slug: string) => {
    if (demo) { setRows((r) => r.filter((x) => x.slug !== slug)); return; }
    const { error } = await getSupabase()!.from("products").delete().eq("slug", slug);
    if (error) setError(error.message); else await load();
  };
  const importStatic = async () => {
    if (demo) { setRows(staticRows()); return; }
    const { error } = await getSupabase()!.from("products").upsert(staticRows());
    if (error) setError(error.message); else await load();
  };
  const upload = async (file: File): Promise<string> => {
    if (demo) return URL.createObjectURL(file);
    const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]+/g, "-")}`;
    const sb = getSupabase()!;
    const { error } = await sb.storage.from("product-images").upload(path, file);
    if (error) throw new Error(error.message);
    return sb.storage.from("product-images").getPublicUrl(path).data.publicUrl;
  };
  return { rows, loading, error, save, remove, importStatic, upload };
}

/* ───────────── small UI pieces ───────────── */
const Icon = ({ d, size = 20 }: { d: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const ICONS = {
  box: "M21 8 12 3 3 8v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v8",
  plus: "M12 5v14M5 12h14",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
  edit: "M4 20h4L19 9l-4-4L4 16v4ZM13 7l4 4",
  logout: "M10 4H5v16h5M15 8l4 4-4 4M19 12H9",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  store: "M3 9l1-5h16l1 5M3 9v11h18V9M3 9c0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0",
  home: "M3 11 12 3l9 8M5 10v10h14V10",
  mail: "M4 6h16v12H4V6ZM4 7l8 6 8-6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
  db: "M12 8c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3ZM4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  lock: "M6 11h12v9H6v-9ZM8 11V8a4 4 0 0 1 8 0v3",
  eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  eyeoff: "M3 3l18 18M10.6 6.2A9.8 9.8 0 0 1 12 6c6 0 10 6 10 6a17 17 0 0 1-3.2 3.8M6.5 7.6C3.7 9.3 2 12 2 12s4 7 10 7a9.6 9.6 0 0 0 4.4-1M9.9 10a3 3 0 0 0 4.1 4.1",
  check: "M20 6 9 17l-5-5",
  orders: "M6 3h12v18l-3-2-3 2-3-2-3 2V3ZM9 8h6M9 12h6",
  tag: "M3 12V4h8l10 10-8 8L3 12ZM7.5 7.5h.01",
  percent: "M19 5 5 19M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  users: "M16 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 20v-2a4 4 0 0 0-3-3.9M16 3.1a3.5 3.5 0 0 1 0 6.8",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  stock: "M3 7l9-4 9 4-9 4-9-4ZM3 7v10l9 4 9-4V7M12 11v10",
  edit2: "M4 5h16M4 10h10M4 15h16M4 20h8",
  truck: "M2 6h12v10H2V6ZM14 10h4l4 3v3h-8v-6ZM6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z",
};

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={onChange}
      className="relative h-7 w-12 shrink-0 rounded-full transition-colors" style={{ background: on ? GREEN : "#C9C5BD" }}>
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "end-1" : "end-6"}`} />
    </button>
  );
}

/* ───────────── login / setup screens ───────────── */
function Shell({ children, fixed }: { children: React.ReactNode; fixed?: boolean }) {
  return <div dir="rtl" className={`relative box-border min-h-screen bg-[#0E2A3A] p-3 sm:p-5 ${fixed ? "lg:h-screen lg:overflow-hidden" : ""} ${font}`}><GlassBackground /><div className="relative z-10 h-full">{children}</div></div>;
}

function SetupScreen({ onBack, onDemo }: { onBack: () => void; onDemo: () => void }) {
  const [copied, setCopied] = useState(false);
  async function copySql() {
    try { await navigator.clipboard.writeText(SCHEMA_SQL); setCopied(true); setTimeout(() => setCopied(false), 2200); } catch { /* clipboard blocked */ }
  }
  const code = "rounded bg-white px-1.5";
  return (
    <Shell>
      <div className="mx-auto mt-6 max-w-xl rounded-[28px] bg-[#F6F4EF] p-8 text-[#1d241f] shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <button type="button" onClick={onBack} className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#6b726c] hover:text-[#1E504D]">→ رجوع إلى تسجيل الدخول</button>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-extrabold">تهيئة قاعدة البيانات</h1>
          <span className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${supabaseConfigured ? "bg-[#E4F5E8] text-[#2F8A4C]" : "bg-[#FDE8E4] text-red-700"}`}>
            <span className={`h-2 w-2 rounded-full ${supabaseConfigured ? "bg-[#2F8A4C]" : "bg-red-600"}`} />{supabaseConfigured ? "متصلة" : "غير متصلة"}
          </span>
        </div>
        <ol className="mt-5 list-decimal space-y-3.5 ps-5 text-base leading-7">
          <li>أنشئ حساباً مجانياً على <b>supabase.com</b> ثم مشروعاً جديداً.</li>
          <li>افتح <b>SQL Editor</b> والصق الكود التالي ثم اضغط Run:
            <div className="mt-2"><button type="button" onClick={copySql} className="akal-btn h-11 px-5 text-sm">{copied ? "تم النسخ ✓" : "نسخ كود SQL"}</button></div>
          </li>
          <li>من <b>Authentication ← Sign In / Providers</b> أوقف خيار <b>Allow new users to sign up</b> حتى لا يستطيع أحد إنشاء حساب بنفسه.</li>
          <li>من <b>Authentication ← Users</b> أضف مستخدماً بريده أي بريد (مثل <code dir="ltr" className={code}>admin@akal.ma</code>) وكلمة مروره <b>طويلة وعشوائية</b> (30 حرفاً أو أكثر). لن يكتبها أحد، فاحفظها للخطوة التالية.</li>
          <li>أنشئ حساب الدخول بالاسم والرمز بتنفيذ هذا في SQL Editor (غيّر القيم):
            <pre dir="ltr" className="mt-2 overflow-x-auto rounded-xl bg-[#1d241f] p-3 text-sm text-white">{`select public.admin_create(\n  'ahmed',                 -- اسم المستخدم\n  '123456',                -- الرمز: 6 أرقام\n  'admin@akal.ma',         -- بريد مستخدم Supabase\n  'THE-LONG-RANDOM-PASSWORD'\n);`}</pre>
          </li>
          <li>من <b>Project Settings ← API</b> انسخ <b>Project URL</b> و<b>anon public key</b> وضعهما في <code dir="ltr" className={code}>.env.local</code>:
            <pre dir="ltr" className="mt-2 overflow-x-auto rounded-xl bg-[#1d241f] p-3 text-sm text-white">{`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...`}</pre>
          </li>
          <li>أعد تشغيل الخادم ثم سجّل الدخول. بعد 5 محاولات خاطئة تُقفل اللوحة، ولإعادة فتحها نفّذ: <code dir="ltr" className={code}>select public.admin_unlock();</code></li>
        </ol>
        <button type="button" onClick={onDemo} className="mt-7 flex h-12 w-full items-center justify-center rounded-2xl border border-black/10 bg-white text-base font-semibold text-[#3a4a3f]">
          معاينة اللوحة الآن (تجريبي، بدون حفظ)
        </button>
      </div>
    </Shell>
  );
}

const MAX_ATTEMPTS = 5;
/** Where "اتصال بالمطور" goes: a WhatsApp link (https://wa.me/212...), tel:+212... or mailto:... set in .env.local. */
const DEVELOPER_CONTACT = process.env.NEXT_PUBLIC_DEVELOPER_CONTACT ?? "";

/**
 * Local TRY-IT mode: only in `next dev` and only while Supabase is not connected (the whole branch is removed from
 * production builds). It mimics the real rules in the browser so you can test the screens: user "ahmed", code 123456.
 * It is NOT security - the real lockout lives in the database (supabase/schema.sql).
 */
const DEV_SIM = process.env.NODE_ENV !== "production" && !supabaseConfigured;
const SIM_KEY = "akal-dev-lock";
const simRead = (): { failures: number; locked: boolean } => {
  try { return JSON.parse(localStorage.getItem(SIM_KEY) ?? "") ?? { failures: 0, locked: false }; } catch { return { failures: 0, locked: false }; }
};
const simWrite = (v: { failures: number; locked: boolean }) => { try { localStorage.setItem(SIM_KEY, JSON.stringify(v)); } catch { /* ignore */ } };

function LoginScreen({ onSetup, onDevLogin }: { onSetup: () => void; onDevLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [noContact, setNoContact] = useState(false);

  // The lock lives in the database: ask it on load so a locked panel stays locked after a refresh.
  useEffect(() => {
    if (DEV_SIM) { if (simRead().locked) setLocked(true); return; }
    const sb = getSupabase();
    if (!sb) return;
    void sb.rpc("admin_is_locked").then(({ data }) => { if (data === true) setLocked(true); });
  }, []);

  function setDigit(i: number, v: string) {
    const d = v.replace(/\D/g, "");
    if (!d) { setDigits((x) => x.map((c, j) => (j === i ? "" : c))); return; }
    setDigits((x) => { const n = [...x]; d.slice(0, 6 - i).split("").forEach((c, k) => { n[i + k] = c; }); return n; });
    pinRefs.current[Math.min(i + d.length, 5)]?.focus();
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr("");
    const pin = digits.join("");
    if (DEV_SIM) {
      if (!username.trim()) { setErr("اكتب اسم المستخدم."); return; }
      if (pin.length !== 6) { setErr("أدخل الرمز السري المكوّن من 6 أرقام."); return; }
      const st = simRead();
      if (st.locked) { setLocked(true); return; }
      if (username.trim().toLowerCase() === "ahmed" && pin === "123456") { simWrite({ failures: 0, locked: false }); onDevLogin(); return; }
      const failures = st.failures + 1, isLocked = failures >= MAX_ATTEMPTS;
      simWrite({ failures, locked: isLocked });
      setDigits(["", "", "", "", "", ""]); pinRefs.current[0]?.focus();
      if (isLocked) { setLocked(true); return; }
      setRemaining(MAX_ATTEMPTS - failures); setErr("الاسم أو الرمز السري غير صحيح.");
      return;
    }
    const sb = getSupabase();
    if (!sb) { setErr("قاعدة البيانات غير مربوطة بعد. اضغط «تهيئة قاعدة البيانات» أدناه."); return; }
    if (!username.trim()) { setErr("اكتب اسم المستخدم."); return; }
    if (pin.length !== 6) { setErr("أدخل الرمز السري المكوّن من 6 أرقام."); return; }
    setBusy(true);
    const { data, error } = await sb.rpc("admin_login", { p_username: username, p_pin: pin });
    if (error || !data) { setErr("تعذّر الاتصال بالخادم. حاول مرة أخرى."); setBusy(false); return; }
    if (data.status === "locked") { setLocked(true); setBusy(false); return; }
    if (data.status !== "ok") {
      setRemaining(data.remaining ?? null);
      setDigits(["", "", "", "", "", ""]); pinRefs.current[0]?.focus();
      setErr("الاسم أو الرمز السري غير صحيح.");
      setBusy(false); return;
    }
    // Right name + code: the database handed out the real (long) Auth password.
    const { error: authErr } = await sb.auth.signInWithPassword({ email: data.email, password: data.secret });
    if (authErr) setErr("تعذّر تسجيل الدخول. تواصل مع مبرمج الواجهة.");
    setBusy(false);
  }

  const wrap = "flex h-14 items-center gap-3 rounded-2xl border border-black/10 bg-white px-4 text-[#8a8f88] transition focus-within:border-[#1E504D] focus-within:text-[#1E504D] focus-within:shadow-[0_0_0_4px_rgba(30,80,77,0.12)]";
  const input = "h-full min-w-0 flex-1 bg-transparent text-base text-[#1d241f] outline-none placeholder:text-[#a3a8a1]";
  const perks = ["إضافة المنتجات وتعديلها وحذفها", "تحديث الأسعار في ثوانٍ", "التحكم في توفر المنتجات في المخزون"];

  return (
    <Shell>
      <div className="flex min-h-[calc(100vh-2.5rem)] items-center justify-center py-6">
        <div className="grid w-full max-w-[960px] overflow-hidden rounded-[28px] bg-[#F6F4EF] shadow-[0_30px_80px_rgba(0,0,0,0.35)] md:grid-cols-[1fr_1.05fr]">
          {/* Brand panel */}
          <div className="relative hidden flex-col justify-between gap-10 overflow-hidden p-10 text-white md:flex" style={{ background: NAVY }}>
            <div aria-hidden="true" className="absolute -bottom-24 -start-24 h-72 w-72 rounded-full opacity-25 blur-3xl" style={{ background: LIME }} />
            <div aria-hidden="true" className="absolute -top-20 -end-16 h-64 w-64 rounded-full opacity-40 blur-3xl" style={{ background: GREEN }} />
            <div className="relative flex items-center gap-3">
              <img src="/assets/akal/logo.svg" alt="" className="h-14 w-14 rounded-full bg-white/10 p-1" />
              <div><p className="text-2xl font-extrabold tracking-tight">AKAL</p><p className="text-sm text-white/60">أكال · منتجات طبيعية</p></div>
            </div>
            <div className="relative">
              <h2 className="text-3xl font-extrabold leading-[1.35]">لوحة تحكم<br />متجر أكال</h2>
              <p className="mt-3 text-base leading-7 text-white/70">أدر متجرك بكل سهولة، من مكان واحد.</p>
              <ul className="mt-7 flex flex-col gap-3.5">
                {perks.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[15px] text-white/90">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#1a220b]" style={{ background: LIME }}><Icon d={ICONS.check} size={14} /></span>{p}
                  </li>
                ))}
              </ul>
            </div>
            <p className="relative text-xs text-white/40">© AKAL — الدخول مخصص للمسؤولين فقط</p>
          </div>

          {locked ? (
            <div className="flex flex-col items-center justify-center gap-4 p-7 text-center sm:p-12">
              <div className="flex h-20 w-20 items-center justify-center rounded-[22px] bg-[#FDE8E4] text-red-600"><Icon d={ICONS.lock} size={36} /></div>
              <h1 className="text-2xl font-extrabold text-[#1d241f]">تم إقفال لوحة التحكم</h1>
              <p className="max-w-xs text-base leading-7 text-[#6b726c]">تجاوزتَ عدد المحاولات المسموح به ({MAX_ATTEMPTS}). للحفاظ على أمان المتجر لن يمكن الدخول حتى تتواصل مع مبرمج الواجهة لإعادة فتحها.</p>
              {DEVELOPER_CONTACT ? (
                <a href={DEVELOPER_CONTACT} target="_blank" rel="noopener noreferrer" className="akal-btn mt-3 h-12 gap-2.5 px-8 text-base"><Icon d={ICONS.phone} size={19} />اتصال بالمطور</a>
              ) : (
                <>
                  <button type="button" onClick={() => setNoContact(true)} className="akal-btn mt-3 h-12 gap-2.5 px-8 text-base"><Icon d={ICONS.phone} size={19} />اتصال بالمطور</button>
                  {noContact && <p className="max-w-xs text-sm text-[#6b726c]">لم يُضبط رابط التواصل بعد. ضع <code dir="ltr" className="rounded bg-white px-1">NEXT_PUBLIC_DEVELOPER_CONTACT</code> في ملف <code dir="ltr" className="rounded bg-white px-1">.env.local</code>.</p>}
                </>
              )}
              {DEV_SIM && (
                <button type="button" onClick={() => { simWrite({ failures: 0, locked: false }); setLocked(false); setRemaining(null); setErr(""); }} className="text-sm font-semibold text-[#7a5a00] underline">
                  (وضع التجربة) إعادة فتح اللوحة
                </button>
              )}
            </div>
          ) : (
          <form onSubmit={submit} className="flex flex-col justify-center p-7 sm:p-12">
            <div className="mb-8 flex items-center gap-3 md:hidden">
              <img src="/assets/akal/logo.svg" alt="" className="h-12 w-12 rounded-full" />
              <p className="text-xl font-extrabold" style={{ color: GREEN }}>AKAL</p>
            </div>
            {DEV_SIM && (
              <p className="mb-5 rounded-2xl bg-[#FFF4D6] px-4 py-3 text-sm font-semibold leading-6 text-[#7a5a00]">
                وضع التجربة المحلي — اسم المستخدم: <b dir="ltr">ahmed</b> · الرمز: <b dir="ltr">123456</b>
              </p>
            )}
            <h1 className="text-3xl font-extrabold text-[#1d241f]">مرحباً بعودتك</h1>
            <p className="mt-2 text-base text-[#6b726c]">أدخل اسم المستخدم والرمز السري</p>

            <div className="mt-8 flex flex-col gap-5">
              <div>
                <label htmlFor="adm-user" className="mb-2 block text-sm font-semibold text-[#3a4a3f]">اسم المستخدم</label>
                <div className={wrap}>
                  <Icon d={ICONS.user} size={20} />
                  <input id="adm-user" autoComplete="username" autoCapitalize="none" placeholder="اسم المستخدم" value={username} onChange={(e) => setUsername(e.target.value)} className={input} />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="adm-pin-0" className="text-sm font-semibold text-[#3a4a3f]">الرمز السري (6 أرقام)</label>
                  <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "إخفاء الرمز" : "إظهار الرمز"} className="text-[#8a8f88] hover:text-[#1E504D]"><Icon d={show ? ICONS.eyeoff : ICONS.eye} size={19} /></button>
                </div>
                <div dir="ltr" className="flex justify-between gap-2">
                  {digits.map((d, i) => (
                    <input key={i} id={`adm-pin-${i}`} ref={(el) => { pinRefs.current[i] = el; }}
                      type={show ? "text" : "password"} inputMode="numeric" autoComplete={i === 0 ? "one-time-code" : "off"} maxLength={6}
                      aria-label={`الرقم ${i + 1}`} value={d}
                      onChange={(e) => setDigit(i, e.target.value)}
                      onFocus={(e) => e.target.select()}
                      onKeyDown={(e) => { if (e.key === "Backspace" && !digits[i] && i > 0) pinRefs.current[i - 1]?.focus(); }}
                      className="h-14 w-full min-w-0 rounded-2xl border border-black/10 bg-white text-center text-2xl font-bold text-[#1d241f] outline-none transition focus:border-[#1E504D] focus:shadow-[0_0_0_4px_rgba(30,80,77,0.12)]" />
                  ))}
                </div>
              </div>
            </div>

            {err && (
              <p role="alert" className="mt-4 rounded-2xl bg-[#FDE8E4] px-4 py-3 text-sm font-semibold text-red-700">
                {err}{remaining !== null && <span className="mt-1 block">{remaining === 1 ? "تبقّت لك محاولة واحدة فقط قبل إقفال اللوحة." : `تبقّى لك ${remaining} محاولات قبل إقفال اللوحة.`}</span>}
              </p>
            )}

            <button disabled={busy} className="akal-btn mt-6 h-14 w-full text-lg disabled:opacity-60">{busy ? "جارٍ الدخول…" : "تسجيل الدخول"}</button>

            <button type="button" onClick={onSetup} className="mt-4 flex h-12 w-full items-center justify-center gap-2.5 rounded-2xl border border-black/10 bg-white text-sm font-semibold text-[#3a4a3f] transition hover:border-[#1E504D] hover:text-[#1E504D]">
              <Icon d={ICONS.db} size={18} />تهيئة قاعدة البيانات
              <span className={`h-2 w-2 rounded-full ${supabaseConfigured ? "bg-[#2F8A4C]" : "bg-red-500"}`} title={supabaseConfigured ? "متصلة" : "غير متصلة"} />
            </button>

            <a href="/" className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-[#6b726c] hover:text-[#1E504D]">
              <Icon d={ICONS.store} size={18} />العودة إلى المتجر
            </a>
          </form>
          )}
        </div>
      </div>
    </Shell>
  );
}

/* ───────────── product editor ───────────── */
function Editor({ initial, isNew, onClose, onSave, upload }: {
  initial: ProductRow; isNew: boolean; onClose: () => void;
  onSave: (r: ProductRow) => Promise<string>; upload: (f: File) => Promise<string>;
}) {
  const [p, setP] = useState<ProductRow>(initial);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof ProductRow>(k: K, v: ProductRow[K]) => setP((x) => ({ ...x, [k]: v }));
  const field = "h-11 w-full rounded-xl border border-black/10 bg-white px-3.5 text-[15px] outline-none focus:border-[#1E504D]";
  const label = "mb-1.5 block text-sm font-semibold text-[#3a4a3f]";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const slug = isNew ? slugify(p.slug || p.name_fr) : p.slug;
    if (!slug) return setErr("أدخل اسم المنتج بالفرنسية.");
    if (!p.sizes.length || p.sizes.some((s) => !s.label.trim())) return setErr("أضف حجماً واحداً على الأقل مع سعره.");
    setBusy(true); setErr("");
    const msg = await onSave({ ...p, slug, badge_fr: p.badge_fr || null, badge_ar: p.badge_ar || null });
    setBusy(false);
    if (msg) setErr(msg); else onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/45 p-3 sm:p-8" onClick={onClose}>
      <form dir="rtl" onClick={(e) => e.stopPropagation()} onSubmit={submit} className={`w-full max-w-3xl rounded-[28px] bg-[#F6F4EF] p-6 sm:p-8 ${font}`}>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1d241f]">{isNew ? "إضافة منتج" : "تعديل المنتج"}</h2>
          <button type="button" onClick={onClose} className="h-10 w-10 rounded-full bg-white text-xl" aria-label="إغلاق">×</button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div><label className={label}>الاسم بالفرنسية *</label><input dir="ltr" className={field} value={p.name_fr} onChange={(e) => set("name_fr", e.target.value)} /></div>
          <div><label className={label}>الاسم بالعربية</label><input className={field} value={p.name_ar} onChange={(e) => set("name_ar", e.target.value)} /></div>
          <div><label className={label}>الفئة (فرنسية)</label><input dir="ltr" className={field} value={p.category_fr} onChange={(e) => set("category_fr", e.target.value)} /></div>
          <div><label className={label}>الفئة (عربية)</label><input className={field} value={p.category_ar} onChange={(e) => set("category_ar", e.target.value)} /></div>
          <div><label className={label}>وصف قصير (فرنسية)</label><input dir="ltr" className={field} value={p.short_fr} onChange={(e) => set("short_fr", e.target.value)} /></div>
          <div><label className={label}>وصف قصير (عربية)</label><input className={field} value={p.short_ar} onChange={(e) => set("short_ar", e.target.value)} /></div>
          <div><label className={label}>الوصف الكامل (فرنسية)</label><textarea dir="ltr" rows={3} className={`${field} h-auto py-3`} value={p.description_fr} onChange={(e) => set("description_fr", e.target.value)} /></div>
          <div><label className={label}>الوصف الكامل (عربية)</label><textarea rows={3} className={`${field} h-auto py-3`} value={p.description_ar} onChange={(e) => set("description_ar", e.target.value)} /></div>
        </div>

        <div className="mt-5">
          <label className={label}>الصورة</label>
          <div className="flex items-center gap-3">
            {p.image && <img src={p.image} alt="" className="h-16 w-16 rounded-xl object-cover" />}
            <input dir="ltr" className={field} placeholder="رابط الصورة" value={p.image} onChange={(e) => set("image", e.target.value)} />
            <label className="flex h-11 shrink-0 cursor-pointer items-center rounded-xl bg-white px-4 text-sm font-semibold">
              رفع صورة
              <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                const f = e.target.files?.[0]; if (!f) return;
                try { set("image", await upload(f)); } catch (x) { setErr((x as Error).message); }
              }} />
            </label>
          </div>
        </div>

        <div className="mt-5">
          <label className={label}>الأحجام والأسعار (بالدرهم)</label>
          <div className="flex flex-col gap-2">
            {p.sizes.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <input dir="ltr" className={field} placeholder="250 g" value={s.label} onChange={(e) => set("sizes", p.sizes.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))} />
                <input dir="ltr" type="number" min={0} className={`${field} max-w-36`} value={s.price} onChange={(e) => set("sizes", p.sizes.map((x, j) => (j === i ? { ...x, price: Number(e.target.value) } : x)))} />
                <button type="button" aria-label="حذف الحجم" onClick={() => set("sizes", p.sizes.filter((_, j) => j !== i))} className="h-11 w-11 shrink-0 rounded-xl bg-white text-red-600"><span className="mx-auto block w-fit"><Icon d={ICONS.trash} size={18} /></span></button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => set("sizes", [...p.sizes, { label: "", price: 0 }])} className="mt-2 text-sm font-semibold text-[#1E504D]">+ إضافة حجم</button>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-2xl bg-white p-4">
          <span className="font-semibold">متوفر في المخزون</span>
          <Toggle on={p.in_stock} onChange={() => set("in_stock", !p.in_stock)} />
        </div>

        {err && <p className="mt-4 text-sm text-red-600">{err}</p>}
        <div className="mt-6 flex gap-3">
          <button disabled={busy} className="akal-btn h-12 flex-1 text-base disabled:opacity-60">{isNew ? "إضافة المنتج" : "حفظ التعديلات"}</button>
          <button type="button" onClick={onClose} className="h-12 rounded-2xl bg-white px-6 font-semibold">إلغاء</button>
        </div>
      </form>
    </div>
  );
}

/* ───────────── dashboard ───────────── */
type View = "products" | "orders" | "stats" | "shipping" | "settings";
const SECTIONS: { id: View; label: string; icon: string }[] = [
  { id: "products", label: "المنتجات", icon: ICONS.box },
  { id: "orders", label: "الطلبات", icon: ICONS.orders },
  { id: "stats", label: "الإحصائيات", icon: ICONS.chart },
  { id: "shipping", label: "التوصيل", icon: ICONS.truck },
  { id: "settings", label: "الإعدادات", icon: ICONS.gear },
];
function Dashboard({ demo, session, onLogout }: { demo: boolean; session: Session | null; onLogout: () => void }) {
  const store = useStore(demo, demo || !!session);
  const [q, setQ] = useState("");
  const [view, setView] = useState<View>("products");
  const meta = (session?.user.user_metadata ?? {}) as { full_name?: string; role?: string };
  const admin = demo
    ? { name: "اسم المدير", role: "المدير العام", email: "demo@akal.ma" }
    : { name: meta.full_name || (session?.user.email ?? "").split("@")[0] || "المدير", role: meta.role || "المدير العام", email: session?.user.email ?? "" };
  const [editing, setEditing] = useState<{ row: ProductRow; isNew: boolean } | null>(null);
  const [toDelete, setToDelete] = useState<ProductRow | null>(null);

  const rows = store.rows;
  const inStock = rows.filter((r) => r.in_stock).length;
  const out = rows.length - inStock;
  const minPrice = (r: ProductRow) => (r.sizes.length ? Math.min(...r.sizes.map((s) => s.price)) : 0);
  const avg = rows.length ? Math.round(rows.reduce((a, r) => a + minPrice(r), 0) / rows.length) : 0;
  const maxP = Math.max(1, ...rows.map(minPrice));
  const top = rows.reduce((b, r) => (minPrice(r) > minPrice(b ?? r) ? r : b), rows[0]);
  const pct = rows.length ? inStock / rows.length : 0;
  const shown = useMemo(() => rows.filter((r) => (r.name_ar + r.name_fr + r.slug).toLowerCase().includes(q.toLowerCase())), [rows, q]);
  const R = 70, C = 2 * Math.PI * R;

  const quickPrice = (r: ProductRow, i: number, v: number) => store.save({ ...r, sizes: r.sizes.map((s, j) => (j === i ? { ...s, price: v } : s)) });

  return (
    <Shell fixed>
      <div className="mx-auto box-border max-w-[1280px] rounded-[28px] bg-[#F6F4EF] shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-3 sm:p-4 lg:h-full">
        <div className="grid gap-4 lg:h-full lg:grid-cols-[230px_1fr] lg:grid-rows-[minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="flex min-w-0 flex-col gap-5 overflow-y-auto rounded-[22px] bg-white p-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="text-xl font-extrabold tracking-tight" style={{ color: GREEN }}>AKAL<sup className="text-xs">®</sup></div>
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full text-3xl font-bold text-white ring-4 ring-[#d8ff7c]" style={{ background: GREEN }}>{admin.name.trim().charAt(0).toUpperCase()}</div>
              <p className="mt-2 max-w-full truncate text-lg font-extrabold text-[#1d241f]">{admin.name}</p>
              <span className="rounded-full px-3 py-1 text-xs font-bold text-[#1a220b]" style={{ background: LIME }}>{admin.role}</span>
              <p dir="ltr" className="mt-1 max-w-full truncate text-xs text-[#8a8f88]">{admin.email}</p>
            </div>            <nav className="flex flex-col gap-1.5 text-[15px] font-semibold">
              {SECTIONS.map((sec) => (
                <button key={sec.id} type="button" onClick={() => setView(sec.id)} aria-current={view === sec.id ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-start ${view === sec.id ? "text-white" : "text-[#6b726c] hover:bg-black/5"}`}
                  style={view === sec.id ? { background: GREEN } : undefined}><Icon d={sec.icon} />{sec.label}</button>
              ))}
              <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#6b726c] hover:bg-black/5"><Icon d={ICONS.store} />عرض المتجر</a>
            </nav>
            <button onClick={onLogout} className="mt-auto flex items-center justify-center gap-2 rounded-2xl border border-black/10 py-3 text-sm font-semibold text-[#6b726c]">
              <Icon d={ICONS.logout} size={18} />{demo ? "خروج من المعاينة" : "تسجيل الخروج"}
            </button>
          </aside>

          {/* Main */}
          <main className="flex min-w-0 flex-col gap-4 lg:min-h-0">
            {view !== "products" ? (
              <section className="flex flex-1 flex-col items-center justify-center gap-4 rounded-[22px] bg-white p-10 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-[22px] text-[#1a220b]" style={{ background: LIME }}><Icon d={SECTIONS.find((x) => x.id === view)!.icon} size={34} /></div>
                <h2 className="text-2xl font-bold text-[#1d241f]">{SECTIONS.find((x) => x.id === view)!.label}</h2>
                <p className="text-lg text-[#6b726c]">هذه الميزة قادمة في أقرب وقت</p>
              </section>
            ) : (<>
            {demo && <div className="shrink-0 rounded-2xl bg-[#FFE9DF] px-4 py-3 text-sm font-semibold text-[#B24A1E]">وضع المعاينة: التعديلات هنا مؤقتة ولا تُحفظ. اربط Supabase لتفعيل الحفظ الحقيقي.</div>}
            {store.error && <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">{store.error}</div>}

            {/* Products table */}
            <section className="flex flex-col rounded-[22px] bg-white p-4 sm:p-5 lg:min-h-0 lg:flex-1">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold text-[#1d241f]">المنتجات</h2>
                <div className="flex flex-1 items-center justify-end gap-2.5">
                  <label className="flex h-11 min-w-0 max-w-64 flex-1 items-center gap-2 rounded-full bg-[#F2F0EA] px-4 text-[#8a8f88]">
                    <Icon d={ICONS.search} size={18} />
                    <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث" className="w-full bg-transparent text-sm text-[#1d241f] outline-none" />
                  </label>
                  <button onClick={() => setEditing({ row: { ...emptyProduct(), position: rows.length }, isNew: true })} className="akal-btn flex h-11 items-center gap-2 px-5 text-sm">
                    <Icon d={ICONS.plus} size={18} />إضافة منتج
                  </button>
                </div>
              </div>

              {!store.loading && !rows.length && (
                <div className="mt-6 rounded-2xl bg-[#F6F4EF] p-6 text-center">
                  <p className="font-semibold">لا توجد منتجات في قاعدة البيانات بعد.</p>
                  <button onClick={store.importStatic} className="akal-btn mt-3 h-11 px-6 text-sm">استيراد منتجات المتجر الحالية ({productDetails.length})</button>
                </div>
              )}

              <div className="mt-3 max-h-[70vh] overflow-auto lg:max-h-none lg:min-h-0 lg:flex-1">
                <table className="w-full min-w-[720px] text-start text-sm">
                  <thead className="sticky top-0 z-10 bg-white [&_th]:bg-white [&_th]:py-3">
                    <tr className="text-[#9a9f98]">
                      <th className="w-10 pb-3 text-start font-medium">#</th>
                      <th className="pb-3 text-start font-medium">المنتج</th>
                      <th className="pb-3 text-start font-medium">الأحجام والأسعار (درهم)</th>
                      <th className="pb-3 text-start font-medium">المخزون</th>
                      <th className="pb-3 text-start font-medium">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shown.map((r, idx) => (
                      <tr key={r.slug} className="border-t border-black/[0.06] align-middle">
                        <td className="py-3 text-[#9a9f98]">{idx + 1}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            {r.image ? <img src={r.image} alt="" className="h-12 w-12 rounded-xl object-cover" /> : <div className="h-12 w-12 rounded-xl bg-[#E4EDE0]" />}
                            <div className="min-w-0"><p className="truncate font-bold text-[#1d241f]">{r.name_ar || r.name_fr}</p><p dir="ltr" className="truncate text-xs text-[#9a9f98]">{r.name_fr}</p></div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex flex-wrap gap-2">
                            {r.sizes.map((s, i) => (
                              <label key={i} className="flex items-center gap-1.5 rounded-full bg-[#F2F0EA] ps-3 pe-1 py-1">
                                <span dir="ltr" className="text-xs text-[#6b726c]">{s.label}</span>
                                <input dir="ltr" type="number" min={0} defaultValue={s.price} key={`${r.slug}-${i}-${s.price}`}
                                  onBlur={(e) => { const v = Number(e.target.value); if (v !== s.price && v >= 0) void quickPrice(r, i, v); }}
                                  onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
                                  className="h-7 w-16 rounded-full bg-white px-2 text-center text-sm font-bold outline-none focus:ring-2 focus:ring-[#1E504D]" />
                              </label>
                            ))}
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <Toggle on={r.in_stock} onChange={() => store.save({ ...r, in_stock: !r.in_stock })} />
                            <span className={`text-xs font-semibold ${r.in_stock ? "text-[#2F8A4C]" : "text-red-600"}`}>{r.in_stock ? "متوفر" : "نفد"}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <button onClick={() => setEditing({ row: r, isNew: false })} aria-label="تعديل" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F2F0EA] text-[#1E504D]"><Icon d={ICONS.edit} size={17} /></button>
                            <button onClick={() => setToDelete(r)} aria-label="حذف" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FDE8E4] text-red-600"><Icon d={ICONS.trash} size={17} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {store.loading && <p className="py-6 text-center text-[#9a9f98]">جارٍ التحميل…</p>}
              </div>
              <p className="mt-3 text-xs text-[#9a9f98]">غيّر السعر مباشرة في الخانة ثم اضغط Enter أو اخرج منها ليُحفظ.</p>
            </section>
            </>)}
          </main>
        </div>
      </div>

      {editing && <Editor initial={editing.row} isNew={editing.isNew} onClose={() => setEditing(null)} onSave={store.save} upload={store.upload} />}

      {toDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4" onClick={() => setToDelete(null)}>
          <div dir="rtl" onClick={(e) => e.stopPropagation()} className={`w-full max-w-sm rounded-[24px] bg-white p-6 text-center ${font}`}>
            <p className="text-lg font-bold">حذف «{toDelete.name_ar || toDelete.name_fr}»؟</p>
            <p className="mt-2 text-sm text-[#6b726c]">لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={async () => { await store.remove(toDelete.slug); setToDelete(null); }} className="h-11 flex-1 rounded-2xl bg-red-600 font-bold text-white">نعم، احذف</button>
              <button onClick={() => setToDelete(null)} className="h-11 flex-1 rounded-2xl bg-[#F2F0EA] font-semibold">إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </Shell>
  );
}

/* ───────────── entry ───────────── */
export default function AdminDashboard() {
  const [demo, setDemo] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    if (qs.has("demo")) setDemo(true);
    const sb = getSupabase();
    if (!sb) { setReady(true); return; }
    void sb.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!ready) return <Shell><p className="mt-24 text-center text-[#6b726c]">…</p></Shell>;
  if (showSetup) return <SetupScreen onBack={() => setShowSetup(false)} onDemo={() => { setShowSetup(false); setDemo(true); }} />;
  if (demo) return <Dashboard demo session={null} onLogout={() => { setDemo(false); window.history.replaceState(null, "", "/admin"); }} />;
  if (!session) return <LoginScreen onSetup={() => setShowSetup(true)} onDevLogin={() => setDemo(true)} />;
  return <Dashboard demo={false} session={session} onLogout={() => void getSupabase()!.auth.signOut()} />;
}
