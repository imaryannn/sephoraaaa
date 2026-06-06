import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart-context";
import { formatINR } from "@/lib/products";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Bag · SEPHORA" }, { name: "description", content: "Your shopping bag." }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal, clear } = useCart();
  const [checkout, setCheckout] = useState(false);
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 8;
  const total = subtotal + shipping;

  if (checkout) return <CheckoutPage total={total} onPlaced={() => { clear(); setCheckout(false); }} />;

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
        <p className="eyebrow mb-4">Your bag</p>
        <h1 className="font-display text-5xl lg:text-6xl text-cocoa">Shopping bag</h1>

        {items.length === 0 ? (
          <div className="py-32 text-center">
            <p className="eyebrow text-clay mb-4">Your bag is quiet</p>
            <p className="font-display text-3xl text-cocoa">Nothing here yet.</p>
            <Link to="/products" className="mt-10 inline-block eyebrow bg-cocoa text-cream px-9 py-4">
              Shop the collection
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-16 mt-16">
            <div className="lg:col-span-2 space-y-10">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-6 border-b border-border pb-10">
                  <Link to="/products/$id" params={{ id: product.id }} className="w-32 h-40 bg-sand/40 shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1">
                    <p className="eyebrow text-clay">{product.brand}</p>
                    <h3 className="font-display text-2xl text-cocoa mt-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center border border-cocoa/30">
                        <button onClick={() => setQty(product.id, quantity - 1)} className="p-2 hover:bg-sand/40"><Minus className="w-3 h-3" /></button>
                        <span className="px-4 text-sm tabular-nums">{quantity}</span>
                        <button onClick={() => setQty(product.id, quantity + 1)} className="p-2 hover:bg-sand/40"><Plus className="w-3 h-3" /></button>
                      </div>
                      <p className="font-display text-xl text-cocoa">{formatINR(product.price * quantity)}</p>
                    </div>
                  </div>
                  <button onClick={() => remove(product.id)} className="self-start text-clay hover:text-cocoa">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <Link to="/products" className="luxe-link eyebrow text-cocoa">← Continue shopping</Link>
            </div>

            <aside className="bg-sand/40 p-10 self-start">
              <p className="eyebrow mb-6">Summary</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Complimentary" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span>Estimated tax</span><span>—</span></div>
              </div>
              <div className="border-t border-cocoa/20 my-6" />
              <div className="flex justify-between font-display text-2xl text-cocoa">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={() => setCheckout(true)}
                className="w-full mt-8 eyebrow bg-cocoa text-cream py-4 hover:bg-clay transition-colors duration-500"
              >
                Checkout
              </button>
              <p className="text-xs text-clay mt-4 text-center">Cash on delivery available</p>
            </aside>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}

function CheckoutPage({ total, onPlaced }: { total: number; onPlaced: () => void }) {
  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-16">
        <p className="eyebrow mb-4">Almost there</p>
        <h1 className="font-display text-5xl text-cocoa">Checkout</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast("Order placed", { description: "Thank you. We've sent a confirmation by email." });
            onPlaced();
          }}
          className="mt-12 space-y-12"
        >
          <fieldset className="space-y-6">
            <legend className="eyebrow mb-6">Contact details</legend>
            <Field label="Full name" />
            <div className="grid sm:grid-cols-2 gap-6">
              <Field label="Email" type="email" />
              <Field label="Phone" type="tel" />
            </div>
          </fieldset>

          <fieldset className="space-y-6">
            <legend className="eyebrow mb-6">Shipping address</legend>
            <Field label="Street address" />
            <div className="grid sm:grid-cols-3 gap-6">
              <Field label="City" />
              <Field label="State / Region" />
              <Field label="Postal code" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow mb-6">Payment</legend>
            <div className="border border-cocoa p-6 bg-sand/30">
              <p className="font-display text-xl text-cocoa">Cash on Delivery</p>
              <p className="text-sm text-muted-foreground mt-2">Pay in cash when your order arrives. No card required.</p>
            </div>
          </fieldset>

          <div className="border-t border-border pt-8 flex justify-between items-center">
            <div>
              <p className="eyebrow">Total</p>
              <p className="font-display text-3xl text-cocoa">${total.toFixed(2)}</p>
            </div>
            <button type="submit" className="eyebrow bg-cocoa text-cream px-10 py-4 hover:bg-clay transition-colors duration-500">
              Place order
            </button>
          </div>
        </form>
      </div>
      <SiteFooter />
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="eyebrow text-clay">{label}</span>
      <input
        type={type}
        required
        className="mt-2 w-full bg-transparent border-b border-cocoa/30 py-3 focus:outline-none focus:border-cocoa text-cocoa"
      />
    </label>
  );
}
