import p1 from "@/assets/product-1.jpg";
import p2 from "@/assets/product-2.jpg";
import p3 from "@/assets/product-3.jpg";
import p4 from "@/assets/product-4.jpg";
import p5 from "@/assets/product-5.jpg";
import p6 from "@/assets/product-6.jpg";
import p7 from "@/assets/product-7.jpg";
import p8 from "@/assets/product-8.jpg";

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Skincare" | "Makeup" | "Fragrances" | "Hair Care" | "Essentials";
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  ingredients: string;
  isNew?: boolean;
  isBestseller?: boolean;
};

export const products: Product[] = [
  {
    id: "velvet-renewal-cream",
    name: "Velvet Renewal Cream",
    brand: "Maison Lumière",
    category: "Skincare",
    price: 128,
    rating: 4.9,
    reviews: 1284,
    image: p1,
    description:
      "A weightless, deeply nourishing cream that restores radiance and softens the appearance of fine lines. Formulated with rare botanical extracts.",
    ingredients:
      "Aqua, Squalane, Niacinamide, Bakuchiol, Hyaluronic Acid, Shea Butter, Rosa Damascena Extract, Tocopherol.",
    isBestseller: true,
  },
  {
    id: "nude-silk-lipstick",
    name: "Nude Silk Lipstick",
    brand: "Atelier No. 9",
    category: "Makeup",
    price: 48,
    rating: 4.8,
    reviews: 2310,
    image: p2,
    description:
      "A buttery satin finish lipstick in a sculptural beige case. Long-wearing pigment with the comfort of a balm.",
    ingredients: "Caprylic Triglyceride, Carnauba Wax, Jojoba Oil, Vitamin E, Mica.",
    isBestseller: true,
  },
  {
    id: "ambre-noir-eau-de-parfum",
    name: "Ambre Noir Eau de Parfum",
    brand: "Maison Lumière",
    category: "Fragrances",
    price: 215,
    rating: 4.9,
    reviews: 642,
    image: p3,
    description:
      "Warm amber, soft vanilla and smoked cedar. An enveloping fragrance composed in Grasse.",
    ingredients: "Alcohol Denat., Parfum, Aqua, Linalool, Coumarin, Benzyl Salicylate.",
    isBestseller: true,
  },
  {
    id: "luminous-glow-serum",
    name: "Luminous Glow Serum",
    brand: "Étude Botanique",
    category: "Skincare",
    price: 96,
    rating: 4.7,
    reviews: 1841,
    image: p4,
    description:
      "A vitamin-rich serum that visibly brightens and evens tone. Lightweight, fast-absorbing, deeply restorative.",
    ingredients: "Aqua, Ascorbic Acid, Ferulic Acid, Glycerin, Sodium Hyaluronate.",
    isNew: true,
  },
  {
    id: "soft-focus-powder",
    name: "Soft Focus Powder",
    brand: "Atelier No. 9",
    category: "Makeup",
    price: 64,
    rating: 4.6,
    reviews: 921,
    image: p5,
    description:
      "An airbrushed finish powder that blurs imperfections and softens light, never settling into lines.",
    ingredients: "Talc, Silica, Mica, Tocopheryl Acetate, Iron Oxides.",
  },
  {
    id: "lash-noir-mascara",
    name: "Lash Noir Mascara",
    brand: "Atelier No. 9",
    category: "Makeup",
    price: 38,
    rating: 4.5,
    reviews: 1502,
    image: p6,
    description:
      "Volumizing mascara with a sculpting brush. Buildable, smudge-resistant, easily removed.",
    ingredients: "Aqua, Iron Oxides, Beeswax, Panthenol, Carnauba Wax.",
    isNew: true,
  },
  {
    id: "ritual-cleansing-oil",
    name: "Ritual Cleansing Oil",
    brand: "Étude Botanique",
    category: "Skincare",
    price: 72,
    rating: 4.8,
    reviews: 1107,
    image: p7,
    description:
      "An emulsifying oil cleanser that melts away makeup and impurities while leaving skin supple.",
    ingredients: "Caprylic Triglyceride, Camellia Oleifera Oil, Squalane, Tocopherol.",
  },
  {
    id: "golden-hour-hair-elixir",
    name: "Golden Hour Hair Elixir",
    brand: "Maison Lumière",
    category: "Hair Care",
    price: 89,
    rating: 4.7,
    reviews: 738,
    image: p8,
    description:
      "A weightless hair oil with marula and argan. Restores shine and tames frizz instantly.",
    ingredients: "Argania Spinosa Oil, Sclerocarya Birrea Oil, Tocopherol, Parfum.",
    isNew: true,
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatINR = (usd: number) =>
  `₹${Math.round(usd * 83).toLocaleString("en-IN")}`;
