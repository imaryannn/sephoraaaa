import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Account · SEPHORA" }] }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="bg-cream min-h-screen">
      <SiteHeader />
      <div className="max-w-md mx-auto px-6 py-24">
        <p className="eyebrow mb-4 text-center">Account</p>
        <h1 className="font-display text-5xl text-cocoa text-center">
          {mode === "login" ? "Welcome back" : "Create account"}
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast(mode === "login" ? "Signed in" : "Account created");
          }}
          className="mt-12 space-y-6"
        >
          {mode === "signup" && <Field label="Name" />}
          <Field label="Email" type="email" />
          <Field label="Password" type="password" />
          <button className="w-full eyebrow bg-cocoa text-cream py-4 hover:bg-clay transition-colors duration-500">
            {mode === "login" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {mode === "login" ? "New here? " : "Have an account? "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="luxe-link text-cocoa"
          >
            {mode === "login" ? "Create an account" : "Sign in"}
          </button>
        </p>

        <p className="mt-4 text-center text-xs text-clay">
          <Link to="/" className="luxe-link">Return to maison</Link>
        </p>
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
