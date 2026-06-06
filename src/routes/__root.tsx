import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-cocoa">404</h1>
        <p className="mt-4 eyebrow text-clay">Page not found</p>
        <p className="mt-6 text-sm text-muted-foreground">
          The page you're looking for has drifted away.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="eyebrow border border-cocoa px-8 py-3 inline-block hover:bg-cocoa hover:text-cream transition"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl text-cocoa">Something went wrong</h1>
        <p className="mt-4 text-sm text-muted-foreground">Please try again or return home.</p>
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="eyebrow bg-cocoa text-cream px-8 py-3"
          >
            Try again
          </button>
          <a href="/" className="eyebrow border border-cocoa px-8 py-3">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SEPHORA — Beauty, Refined." },
      { name: "description", content: "A maison of considered beauty. Skincare, makeup, fragrance and hair care, composed with restraint." },
      { property: "og:title", content: "SEPHORA — Beauty, Refined." },
      { property: "og:description", content: "A maison of considered beauty. Skincare, makeup, fragrance and hair care, composed with restraint." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SEPHORA" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Outlet />
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}
