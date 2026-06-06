import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import editorial from "@/assets/editorial.jpg";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Maison · SEPHORA" },
      { name: "description", content: "The story, mission and values of SEPHORA — a maison of considered beauty." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />

      <section className="px-6 lg:px-12 py-28 lg:py-40 max-w-[1100px] mx-auto text-center">
        <p className="eyebrow mb-6">Est. Paris, 1969</p>
        <h1 className="font-display text-5xl md:text-7xl text-cocoa leading-[1.05]">
          A quiet pursuit of <em>beauty</em>.
        </h1>
        <p className="mt-10 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          For over fifty years, SEPHORA has composed beauty as one would compose
          a fragrance — patiently, intuitively, and always with restraint.
        </p>
      </section>

      <section className="grid lg:grid-cols-2 gap-0">
        <img src={hero} alt="" className="w-full h-[70vh] object-cover" />
        <div className="bg-sand/40 px-10 lg:px-20 py-20 flex flex-col justify-center">
          <p className="eyebrow mb-6">Our story</p>
          <h2 className="font-display text-4xl lg:text-5xl text-cocoa leading-tight">
            Slow craft, made to last.
          </h2>
          <p className="mt-8 text-base text-muted-foreground leading-relaxed">
            What began as a small apothecary on rue de Sèvres is today a curated
            maison of skincare, fragrance and color. Every formula is composed in
            our French atelier, in small batches, by hand.
          </p>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            We believe beauty should feel inevitable — never loud, never urgent.
            Worth the time it takes.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-12 py-32 max-w-[1100px] mx-auto">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            { t: "Considered", d: "Each formula refined over years, not seasons." },
            { t: "Honest", d: "Cruelty-free, dermatologist tested, transparent." },
            { t: "Enduring", d: "Composed to last — in vessel, in scent, in memory." },
          ].map((v) => (
            <div key={v.t}>
              <p className="eyebrow mb-4">Value</p>
              <h3 className="font-display text-3xl text-cocoa">{v.t}</h3>
              <p className="mt-4 text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative h-[70vh]">
        <img src={editorial} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-cocoa/30" />
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div className="text-cream max-w-xl">
            <h2 className="font-display text-4xl md:text-5xl">Visit the maison.</h2>
            <p className="mt-6 text-cream/85">12 rue de Sèvres, Paris 75006</p>
            <Link to="/products" className="mt-10 inline-block eyebrow border border-cream px-9 py-4 hover:bg-cream hover:text-cocoa transition-colors duration-500">
              Shop the collection
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
