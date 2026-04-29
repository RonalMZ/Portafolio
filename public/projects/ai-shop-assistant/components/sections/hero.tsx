"use client";

import { motion } from "framer-motion";
import { Sparkles, Truck, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { value: "500+", label: "recomendaciones generadas" },
  { value: "12", label: "productos en catálogo" },
  { value: "4.6★", label: "rating promedio" },
  { value: "100%", label: "envío gratis" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-violet-500/15 blur-[120px]" />
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[100px]" />
        <div className="absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-orange-400/15 blur-[100px]" />
      </div>

      <div className="container py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto inline-flex w-full max-w-3xl flex-col items-center text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-3 py-1 text-xs font-medium text-violet-700 dark:text-violet-300">
            <Sparkles className="h-3.5 w-3.5" /> Powered by Gemini · Groq · Vercel AI SDK
          </span>

          <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            La tienda donde la{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
              IA encuentra por ti
            </span>{" "}
            lo que ni sabías que querías.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Describe lo que necesitas en español natural. El asistente cruza tu
            intención con un catálogo curado, recomienda los mejores productos
            y te explica el porqué — todo con streaming en vivo.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <a href="#recomendaciones">
                <Sparkles /> Probar la IA ahora
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#catalogo">Ver el catálogo</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border/60 bg-card/70 p-4 text-center shadow-sm backdrop-blur"
            >
              <div className="text-2xl font-bold tracking-tight">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
        >
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-emerald-500" /> Envíos a todo
            México
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Compra
            protegida (demo)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500" /> Streaming token a
            token
          </span>
        </motion.div>
      </div>
    </section>
  );
}
