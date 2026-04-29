import { ShoppingBag } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/60 bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-2 py-8 text-sm text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
            <ShoppingBag className="h-3 w-3" />
          </span>
          AI Shop Assistant — demo de e-commerce con IA por Ronal de Jesus.
        </div>
        <div>
          Construido con Next.js · Vercel AI SDK · Gemini / Groq · Tailwind
        </div>
      </div>
    </footer>
  );
}
