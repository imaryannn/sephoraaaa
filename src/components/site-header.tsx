import { Link } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-context";

const NAV = [
  { to: "/products", label: "Shop" },
  { to: "/products", label: "Skincare", search: { category: "Skincare" } },
  { to: "/products", label: "Makeup", search: { category: "Makeup" } },
  { to: "/products", label: "Fragrances", search: { category: "Fragrances" } },
  { to: "/about", label: "Maison" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-cocoa text-cream text-[11px] tracking-luxe uppercase py-2.5 text-center">
        Complimentary shipping on orders over $75 · Two samples with every purchase
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-cream/95 backdrop-blur-sm border-b border-border" : "bg-cream"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 items-center h-20">
            {/* Left nav */}
            <nav className="hidden lg:flex items-center gap-8 text-xs tracking-luxe uppercase">
              {NAV.slice(0, 4).map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  search={(n as any).search}
                  className="luxe-link text-foreground/70 hover:text-foreground transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <button
              className="lg:hidden justify-self-start"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Link to="/" className="justify-self-center">
              <span className="font-display text-[28px] md:text-[34px] tracking-[0.42em] font-light text-cocoa">
                SEPHORA
              </span>
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-5 justify-self-end text-foreground">
              <button aria-label="Search" className="hidden md:block hover:opacity-60 transition">
                <Search className="w-[18px] h-[18px]" strokeWidth={1.4} />
              </button>
              <Link to="/auth" aria-label="Account" className="hidden md:block hover:opacity-60 transition">
                <User className="w-[18px] h-[18px]" strokeWidth={1.4} />
              </Link>
              <Link to="/wishlist" aria-label="Wishlist" className="hidden md:block hover:opacity-60 transition">
                <Heart className="w-[18px] h-[18px]" strokeWidth={1.4} />
              </Link>
              <Link to="/cart" aria-label="Bag" className="relative hover:opacity-60 transition">
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.4} />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-cocoa text-cream text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-cream animate-fade-in">
          <div className="flex items-center justify-between px-6 h-20 border-b border-border">
            <span className="font-display text-2xl tracking-[0.42em] text-cocoa">SEPHORA</span>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-8 p-10 text-2xl font-display">
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.to}
                search={(n as any).search}
                onClick={() => setOpen(false)}
                className="text-cocoa"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/cart" onClick={() => setOpen(false)} className="text-cocoa">
              Bag
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
