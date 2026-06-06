import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { products, type Product } from "@/lib/products";
import { Search } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Shop · SEPHORA" },
      { name: "description", content: "Browse the full SEPHORA collection — skincare, makeup, fragrance and hair care." },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: ProductsPage,
});

const CATS = ["All", "Skincare", "Makeup", "Fragrances", "Hair Care", "Essentials"] as const;
const SORTS = [
  { v: "popular", l: "Popularity" },
  { v: "low", l: "Price: Low to High" },
  { v: "high", l: "Price: High to Low" },
  { v: "new", l: "Newest" },
] as const;

function ProductsPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]["v"]>("popular");
  const [max, setMax] = useState(300);

  const filtered = useMemo(() => {
    let list: Product[] = [...products];
    if (cat !== "All") list = list.filter((p) => p.category === cat);
    if (q) list = list.filter((p) => (p.name + p.brand).toLowerCase().includes(q.toLowerCase()));
    list = list.filter((p) => p.price <= max);
    list.sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "new") return Number(!!b.isNew) - Number(!!a.isNew);
      return b.reviews - a.reviews;
    });
    return list;
  }, [cat, q, sort, max]);

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <div className="px-6 lg:px-12 max-w-[1440px] mx-auto pt-16 lg:pt-24">
        <p className="eyebrow mb-5">The collection</p>
        <h1 className="font-display text-5xl lg:text-7xl text-cocoa leading-[1.05]">All products</h1>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-b border-border pb-6">
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-xs tracking-luxe uppercase">
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`pb-1 border-b transition-colors ${
                  cat === c ? "border-cocoa text-cocoa" : "border-transparent text-clay hover:text-cocoa"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="relative">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-clay" strokeWidth={1.4} />
              <input
                placeholder="Search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="bg-transparent border-b border-border pl-6 pr-2 py-2 text-sm w-48 focus:outline-none focus:border-cocoa"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as any)}
              className="bg-transparent text-xs tracking-luxe uppercase border-b border-border py-2 focus:outline-none focus:border-cocoa"
            >
              {SORTS.map((s) => (
                <option key={s.v} value={s.v}>Sort · {s.l}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4 text-xs text-clay">
          <span className="eyebrow">Max price</span>
          <input
            type="range"
            min={20}
            max={300}
            step={10}
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="flex-1 max-w-xs accent-cocoa"
          />
          <span>${max}</span>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="eyebrow mb-4">No matches</p>
            <p className="font-display text-3xl text-cocoa">Try a different filter</p>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
