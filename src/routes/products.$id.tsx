import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Star, Truck, Shield, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} · SEPHORA` },
          { name: "description", content: loaderData.product.description },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p>Product not found</p>
    </div>
  ),
  component: ProductPage,
});

const reviews = [
  { author: "Camille R.", rating: 5, text: "Exquisite finish, lasts all day. Worth every penny." },
  { author: "Yara K.", rating: 5, text: "Packaging alone feels like a gift. Formula is sublime." },
  { author: "Anaïs T.", rating: 4, text: "Beautiful product, would love a refill option." },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add, toggleWishlist, inWishlist } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "ing" | "rev">("desc");
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const wished = inWishlist(product.id);

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 pt-10">
        <nav className="eyebrow text-clay flex gap-2">
          <Link to="/" className="hover:text-cocoa">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-cocoa">Shop</Link>
          <span>/</span>
          <span className="text-cocoa">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mt-10">
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-sand/40 aspect-[4/5]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="bg-sand/40 aspect-square">
                  <img src={src} alt="" className="w-full h-full object-cover opacity-90" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-32 lg:self-start lg:max-h-[calc(100vh-8rem)]">
            <p className="eyebrow text-clay">{product.brand}</p>
            <h1 className="font-display text-4xl lg:text-5xl text-cocoa mt-3 leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5"
                    fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                    strokeWidth={1.2}
                  />
                ))}
              </div>
              <span>{product.rating} · {product.reviews.toLocaleString()} reviews</span>
            </div>

            <p className="font-display text-3xl mt-8 text-cocoa">${product.price}</p>

            <p className="mt-8 text-base text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex items-center border border-cocoa">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3 hover:bg-sand/40">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-6 text-sm tabular-nums">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="p-3 hover:bg-sand/40">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                onClick={() => {
                  add(product, qty);
                  toast("Added to bag", { description: product.name });
                }}
                className="flex-1 eyebrow bg-cocoa text-cream py-4 hover:bg-clay transition-colors duration-500"
              >
                Add to bag
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="border border-cocoa p-4 hover:bg-sand/40 transition"
                aria-label="Wishlist"
              >
                <Heart className="w-4 h-4" fill={wished ? "currentColor" : "none"} strokeWidth={1.4} />
              </button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 text-xs text-clay">
              <div className="flex flex-col items-start gap-2"><Truck className="w-4 h-4" /><span>Free shipping over $75</span></div>
              <div className="flex flex-col items-start gap-2"><Shield className="w-4 h-4" /><span>30-day returns</span></div>
              <div className="flex flex-col items-start gap-2"><Sparkles className="w-4 h-4" /><span>Two samples free</span></div>
            </div>

            <div className="mt-14 border-t border-border pt-8">
              <div className="flex gap-8 eyebrow">
                <button onClick={() => setTab("desc")} className={tab === "desc" ? "text-cocoa border-b border-cocoa pb-2" : "text-clay pb-2"}>Description</button>
                <button onClick={() => setTab("ing")} className={tab === "ing" ? "text-cocoa border-b border-cocoa pb-2" : "text-clay pb-2"}>Ingredients</button>
                <button onClick={() => setTab("rev")} className={tab === "rev" ? "text-cocoa border-b border-cocoa pb-2" : "text-clay pb-2"}>Reviews</button>
              </div>
              <div className="mt-6 text-sm text-muted-foreground leading-relaxed min-h-32">
                {tab === "desc" && <p>{product.description} Crafted in small batches in our French atelier. Cruelty-free and dermatologist tested.</p>}
                {tab === "ing" && <p>{product.ingredients}</p>}
                {tab === "rev" && (
                  <div className="space-y-6">
                    {reviews.map((r, i) => (
                      <div key={i} className="border-b border-border pb-5 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className="w-3 h-3" fill={j < r.rating ? "currentColor" : "none"} strokeWidth={1.2} />
                          ))}
                        </div>
                        <p className="text-cocoa">"{r.text}"</p>
                        <p className="eyebrow text-clay mt-2">— {r.author}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-32">
            <h2 className="font-display text-4xl text-cocoa mb-12">You may also love</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
