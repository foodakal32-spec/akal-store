"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  slug: string;
  name: string;
  size: string;
  price: number; // MAD, unit price
  qty: number;
  image: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  ready: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  add: (item: CartItem) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
};

const KEY = "akal-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

const same = (a: { slug: string; size: string }, b: { slug: string; size: string }) => a.slug === b.slug && a.size === b.size;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  // Load once on the client (localStorage may be unavailable or hold bad data).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(
            parsed.filter(
              (i) => i && typeof i.slug === "string" && typeof i.size === "string" && typeof i.price === "number" && Number.isFinite(i.qty) && i.qty > 0,
            ),
          );
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  // Persist after the first load; sync across tabs.
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, ready]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY || e.newValue == null) return;
      try {
        setItems(JSON.parse(e.newValue));
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((item: CartItem) => {
    setItems((prev) => {
      const found = prev.find((i) => same(i, item));
      if (found) return prev.map((i) => (same(i, item) ? { ...i, qty: Math.min(99, i.qty + item.qty) } : i));
      return [...prev, { ...item, qty: Math.min(99, item.qty) }];
    });
  }, []);

  const setQty = useCallback((slug: string, size: string, qty: number) => {
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => !same(i, { slug, size })) : prev.map((i) => (same(i, { slug, size }) ? { ...i, qty: Math.min(99, qty) } : i)),
    );
  }, []);

  const remove = useCallback((slug: string, size: string) => setItems((prev) => prev.filter((i) => !same(i, { slug, size }))), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      ready,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((n, i) => n + i.qty * i.price, 0),
      add,
      setQty,
      remove,
      clear,
    }),
    [items, ready, isOpen, openCart, closeCart, toggleCart, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
