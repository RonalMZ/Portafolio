"use client";

import * as React from "react";
import { Sparkles, Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIDescription({ productId }: { productId: string }) {
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setText("");
    try {
      const res = await fetch("/api/describe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok || !res.body) throw new Error("No se pudo generar");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setText(acc);
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Algo falló generando la descripción",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5 rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.06] to-fuchsia-500/[0.04] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-300">
          <Sparkles className="h-3.5 w-3.5" /> Descripción generada por IA
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={generate}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Generando…
            </>
          ) : text ? (
            <>
              <RefreshCcw /> Regenerar
            </>
          ) : (
            <>
              <Sparkles /> Generar
            </>
          )}
        </Button>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {text ? (
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
          {text}
          {loading && (
            <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-violet-500/60 align-middle" />
          )}
        </p>
      ) : (
        !loading &&
        !error && (
          <p className="mt-3 text-sm text-muted-foreground">
            Pulsa <span className="font-medium text-foreground">Generar</span>{" "}
            para crear una descripción única para este producto en streaming.
          </p>
        )
      )}
    </div>
  );
}
