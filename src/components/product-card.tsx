import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { type Product, formatINR } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add, toggleWishlist, inWishlist } = useCart();
  const wished = inWishlist(product.id);

  return (
    <div className="group">
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="block relative bg-sand/40 hover-zoom aspect-[4/5] mb-5"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1000}
          className="w-full h-full object-cover"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 eyebrow bg-cream/90 px-3 py-1.5">New</span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          aria-label="Wishlist"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream/90 flex items-center justify-center hover:bg-cream transition"
        >
          <Heart
            className="w-4 h-4"
            strokeWidth={1.4}
            fill={wished ? "currentColor" : "none"}
          />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            add(product);
            toast("Added to bag", { description: product.name });
          }}
          className="absolute inset-x-4 bottom-4 bg-cocoa text-cream py-3 text-xs tracking-luxe uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hidden md:block"
        >
          Add to bag
        </button>
      </Link>

      <div className="space-y-1.5">
        <p className="eyebrow text-clay">{product.brand}</p>
        <Link to="/products/$id" params={{ id: product.id }}>
          <h3 className="font-display text-xl text-cocoa leading-snug">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-current" />
            <span>{product.rating}</span>
          </div>
          <span>·</span>
          <span>{product.reviews.toLocaleString()} reviews</span>
        </div>
        <p className="text-sm pt-1 text-foreground">{formatINR(product.price)}</p>
      </div>
    </div>
  );
}
