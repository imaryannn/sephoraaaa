import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import heroImg from "@/assets/hero.jpg";
import editorialImg from "@/assets/editorial.jpg";
import catSkin from "@/assets/category-skincare.jpg";
import catMakeup from "@/assets/category-makeup.jpg";
import catFrag from "@/assets/category-fragrance.jpg";
import catHair from "@/assets/category-hair.jpg";
import catEss from "@/assets/category-essentials.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SEPHORA — Beauty, Refined." },
      { name: "description", content: "Considered beauty: skincare, makeup, fragrance and hair care from a curated maison." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const categories = [
  { name: "Skincare", image: catSkin },
  { name: "Makeup", image: catMakeup },
  { name: "Fragrances", image: catFrag },
  { name: "Hair Care", image: catHair },
  { name: "Essentials", image: catEss },
];

function Index() {
  const bestsellers = products.filter((p) => p.isBestseller);
  const newArrivals = products.filter((p) => p.isNew).concat(products).slice(0, 6);

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-cream">
        <div className="grid lg:grid-cols-12 h-full">
          {/* Text — overlay on mobile, column on desktop */}
          <div className="lg:col-span-5 lg:relative absolute inset-0 lg:inset-auto z-10 flex items-center px-6 lg:px-16 h-full">
            {/* Mobile-only soft scrim for legibility */}
            <div className="lg:hidden absolute inset-0 bg-gradient-to-r from-cream/85 via-cream/50 to-transparent" />
            <div className="relative max-w-md animate-fade-up">
              <p className="eyebrow mb-6 lg:mb-8">Autumn Edit · 2026</p>
              <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-cocoa">
                Beauty,
                <br />
                <em>Refined.</em>
              </h1>
              <p className="mt-6 lg:mt-8 text-base leading-relaxed text-cocoa/80 max-w-sm">
                A curated maison of skincare, fragrance and quiet luxury — composed
                slowly, made to last a lifetime.
              </p>
              <div className="mt-8 lg:mt-12 flex flex-wrap items-center gap-6">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-3 bg-cocoa text-cream px-9 py-4 text-xs tracking-luxe uppercase hover:bg-clay transition-colors duration-500"
                >
                  Shop Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.4} />
                </Link>
                <Link
                  to="/products"
                  className="luxe-link text-xs tracking-luxe uppercase text-cocoa"
                >
                  Explore Products
                </Link>
              </div>
            </div>
          </div>
          {/* Image — full bleed on mobile, right column on desktop */}
          <div className="lg:col-span-7 absolute inset-0 lg:relative lg:inset-auto h-full">
            <img
              src={heroImg}
              alt="Luxury skincare composition"
              className="w-full h-full object-cover animate-fade-in"
            />
          </div>
        </div>
      </section>



      {/* Marquee */}
      <section className="border-y border-border py-5 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-marquee">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex gap-16 eyebrow text-clay">
              <span>Maison Lumière</span><span>·</span>
              <span>Atelier No. 9</span><span>·</span>
              <span>Étude Botanique</span><span>·</span>
              <span>Grasse Apothicaire</span><span>·</span>
              <span>Maison Lumière</span><span>·</span>
              <span>Atelier No. 9</span><span>·</span>
              <span>Étude Botanique</span><span>·</span>
              <span>Grasse Apothicaire</span><span>·</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-6 lg:px-12 py-28 lg:py-40 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow mb-5">The Edit</p>
            <h2 className="font-display text-5xl lg:text-6xl text-cocoa max-w-xl leading-[1.05]">
              Curated by category
            </h2>
          </div>
          <Link to="/products" className="luxe-link eyebrow text-cocoa">View all →</Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-5">
          {categories.map((c, i) => (
            <Link
              key={c.name}
              to="/products"
              className={`group hover-zoom relative aspect-[3/4] block ${
                i === 0 ? "lg:row-span-2 lg:aspect-auto" : ""
              }`}
            >
              <img src={c.image} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/40 to-transparent" />
              <div className="absolute inset-0 flex items-end p-6">
                <span className="font-display text-2xl lg:text-3xl text-cream">{c.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="px-6 lg:px-12 pb-28 lg:pb-40 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow mb-5">Most loved</p>
            <h2 className="font-display text-5xl lg:text-6xl text-cocoa">Best sellers</h2>
          </div>
          <Link to="/products" className="luxe-link eyebrow text-cocoa">Shop all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
          {bestsellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* EDITORIAL BANNER */}
      <section className="relative">
        <div className="relative h-[80vh] hover-zoom">
          <img
            src={editorialImg}
            alt="Editorial collection"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-cocoa/25" />
          <div className="relative h-full flex items-center justify-center text-center px-6">
            <div className="max-w-2xl text-cream">
              <p className="eyebrow text-cream/80 mb-6">The Bronze Collection</p>
              <h2 className="font-display text-5xl md:text-7xl leading-[1.05]">
                A study in warmth.
              </h2>
              <p className="mt-8 text-base text-cream/85 max-w-md mx-auto leading-relaxed">
                Twelve pieces, composed in earth pigment and silk. Available exclusively
                at the maison through November.
              </p>
              <Link
                to="/products"
                className="mt-10 inline-block eyebrow border border-cream px-9 py-4 hover:bg-cream hover:text-cocoa transition-colors duration-500"
              >
                Discover the collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS scroll */}
      <section className="py-28 lg:py-40">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between items-end mb-12">
          <div>
            <p className="eyebrow mb-5">Just arrived</p>
            <h2 className="font-display text-5xl lg:text-6xl text-cocoa">New arrivals</h2>
          </div>
          <Link to="/products" className="luxe-link eyebrow text-cocoa hidden md:block">View all →</Link>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-6 px-6 lg:px-12 pb-4 snap-x">
            {newArrivals.map((p) => (
              <div key={p.id} className="min-w-[280px] md:min-w-[340px] snap-start">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="px-6 lg:px-12 py-28 lg:py-40 max-w-[1100px] mx-auto text-center">
        <p className="eyebrow mb-8">The maison</p>
        <h2 className="font-display text-4xl md:text-6xl text-cocoa leading-[1.1]">
          "Beauty should feel inevitable —
          <br />
          quiet, considered, entirely yours."
        </h2>
        <p className="mt-10 text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Founded in Paris in 1969, SEPHORA composes beauty as one would compose
          a fragrance — patiently, intuitively, and always with restraint.
        </p>
        <Link to="/about" className="mt-12 inline-block eyebrow border border-cocoa px-9 py-4 hover:bg-cocoa hover:text-cream transition-colors duration-500">
          Our story
        </Link>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-sand/50 py-28 lg:py-36 px-6">
        <div className="max-w-xl mx-auto text-center">
          <p className="eyebrow mb-6">Correspondence</p>
          <h2 className="font-display text-4xl md:text-5xl text-cocoa">
            Letters from the maison
          </h2>
          <p className="mt-6 text-muted-foreground">
            Receive private previews, editorial notes and quiet invitations.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 bg-transparent border-b border-cocoa/40 px-1 py-3 text-sm placeholder:text-clay/60 focus:outline-none focus:border-cocoa"
            />
            <button
              type="submit"
              className="eyebrow bg-cocoa text-cream px-8 py-3 hover:bg-clay transition-colors duration-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
