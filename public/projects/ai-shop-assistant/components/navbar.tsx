"use client";

import * as React from "react";
import Link from "next/link";
import { Sparkles, ShoppingBag } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-30 transition-all",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 text-white shadow-lg shadow-fuchsia-500/20">
            <ShoppingBag className="h-4 w-4" />
          </span>
          <span className="text-base tracking-tight">
            AI Shop <span className="text-muted-foreground">Assistant</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="#recomendaciones"
            className="hidden items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent sm:inline-flex"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-500" /> Recomiéndame con IA
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
