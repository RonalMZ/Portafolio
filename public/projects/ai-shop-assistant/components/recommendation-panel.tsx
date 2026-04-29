"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Wand2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { products as ALL_PRODUCTS, type Product } from "@/lib/products";

const SUGGESTIONS = [
  "Quiero unos tenis cómodos para correr en la playa de Mazatlán",
  "Busco un regalo para alguien que ama el café por menos de $500",
  "Necesito accesorios para trabajar remoto fuera de casa",
  "Algo fresco para el calor de Sinaloa",
];

type Result = {
  productIds: string[];
  reason: string;
};

export function RecommendationPanel() {
  const [input, setInput] = React.useState("");
  const [streamingText, setStreamingText] = React.useState("");
  const [result, setResult] = React.useState<Result | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (text?: string) => {
    const prompt = (text ?? input).trim();
    if (!prompt) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setStreamingText("");

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok || !res.body) throw new Error("Error de servidor");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setStreamingText(acc);
      }

      // Extraer JSON al final del stream: ```json{...}``` o {... "productIds": [...] ...}
      const parsed = parseRecommendation(acc);
      setResult(parsed);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Algo salió mal generando tus recomendaciones",
      );
    } finally {
      setLoading(false);
    }
  };

  const recommended: Product[] = React.useMemo(() => {
    if (!result) return [];
    return result.productIds
      .map((id) => ALL_PRODUCTS.find((p) => p.id === id))
      .filter((p): p is Product => Boolean(p));
  }, [result]);

  return (
    <section
      id="recomendaciones"
      className="container scroll-mt-20 py-12 sm:py-16"
    >
      <div className="overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.06] via-fuchsia-500/[0.04] to-orange-400/[0.04] p-6 shadow-xl shadow-violet-500/5 sm:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Badge variant="outline" className="border-violet-500/30 text-violet-600 dark:text-violet-400">
              <Sparkles className="mr-1 h-3 w-3" /> Recomendaciones IA
            </Badge>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Cuéntale a la IA qué necesitas, y te arma el carrito.
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Describe lo que buscas en lenguaje natural — el clima, el uso, la
              ocasión, tu presupuesto. La IA cruza tu intención con el catálogo
              y te explica por qué te conviene cada producto.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s);
                    submit(s);
                  }}
                  className="rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-violet-400/50 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <Card className="border-border/60 bg-background/80 p-5 backdrop-blur">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej: Quiero algo cómodo para trabajar desde un café…"
              rows={4}
              className="resize-none"
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Streaming en vivo · respuesta segundos.
              </p>
              <Button onClick={() => submit()} disabled={loading || !input.trim()}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Pensando…
                  </>
                ) : (
                  <>
                    <Wand2 /> Generar
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        <AnimatePresence>
          {(streamingText || error) && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 rounded-2xl border border-border/60 bg-background/80 p-5 backdrop-blur"
            >
              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : (
                <>
                  <div className="mb-2 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-violet-500">
                    <Sparkles className="h-3 w-3" /> Razonamiento de la IA
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                    {result?.reason || stripJson(streamingText)}
                    {loading && (
                      <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-violet-500/60 align-middle" />
                    )}
                  </p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {recommended.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Productos recomendados para ti
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {recommended.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  index={i}
                  highlight="Recomendado IA"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function stripJson(text: string): string {
  // Quita el bloque JSON final para mostrar solo el razonamiento mientras se hace stream.
  const jsonStart = text.indexOf("```json");
  if (jsonStart > -1) return text.slice(0, jsonStart).trim();
  const braceStart = text.lastIndexOf("{");
  if (braceStart > 50 && text.slice(braceStart).includes("productIds")) {
    return text.slice(0, braceStart).trim();
  }
  return text;
}

function parseRecommendation(raw: string): Result {
  // Intenta extraer un objeto JSON con { productIds: [], reason: "" }
  const fenced = raw.match(/```json\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1] : extractJsonObject(raw);
  if (candidate) {
    try {
      const obj = JSON.parse(candidate);
      if (Array.isArray(obj.productIds)) {
        return {
          productIds: obj.productIds.slice(0, 6),
          reason:
            typeof obj.reason === "string"
              ? obj.reason
              : stripJson(raw),
        };
      }
    } catch {
      /* ignore */
    }
  }
  return { productIds: [], reason: raw };
}

function extractJsonObject(text: string): string | null {
  const start = text.lastIndexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  return text.slice(start, end + 1);
}
