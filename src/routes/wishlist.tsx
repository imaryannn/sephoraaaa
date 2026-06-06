import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist · SEPHORA" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist } = useCart();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <p className="eyebrow mb-4">Saved for later</p>
        <h1 className="font-display text-5xl lg:text-6xl text-cocoa">Wishlist</h1>

        {items.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-display text-3xl text-cocoa">No favorites yet.</p>
            <Link to="/products" className="mt-10 inline-block eyebrow bg-cocoa text-cream px-9 py-4">
              Discover the collection
            </Link>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
