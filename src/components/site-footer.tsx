import { Link } from "@tanstack/react-router";

const cols = [
  {
    title: "Maison",
    links: [
      { label: "About", to: "/about" },
      { label: "Our story", to: "/about" },
      { label: "Sustainability", to: "/about" },
      { label: "Press", to: "/about" },
    ],
  },
  {
    title: "Client services",
    links: [
      { label: "Contact", to: "/about" },
      { label: "FAQs", to: "/about" },
      { label: "Shipping policy", to: "/about" },
      { label: "Returns", to: "/about" },
    ],
  },
  {
    title: "Shop",
    links: [
      { label: "Skincare", to: "/products" },
      { label: "Makeup", to: "/products" },
      { label: "Fragrances", to: "/products" },
      { label: "Hair care", to: "/products" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-cocoa text-cream mt-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div>
            <span className="font-display text-3xl tracking-[0.42em]">SEPHORA</span>
            <p className="mt-6 text-sm leading-relaxed text-cream/70 max-w-xs">
              A maison of considered beauty — composed with restraint, made to last.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="eyebrow text-cream/60 mb-6">{c.title}</h4>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="luxe-link text-sm text-cream/85 hover:text-cream">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-cream/15 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-luxe uppercase text-cream/50">
          <span>© {new Date().getFullYear()} SEPHORA Maison</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-cream">Instagram</a>
            <a href="#" className="hover:text-cream">Pinterest</a>
            <a href="#" className="hover:text-cream">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
