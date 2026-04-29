"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, X, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn, formatMXN } from "@/lib/utils";
import { products as ALL_PRODUCTS } from "@/lib/products";

const SUGGESTIONS = [
  "¿Qué tenis me recomiendas para correr en la playa?",
  "Algo bueno por menos de $1000 para regalo",
  "Necesito audífonos para trabajar remoto",
];

export function FloatingChatbot() {
  const [open, setOpen] = React.useState(false);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "¡Hola! Soy tu Asistente Inteligente de compras. Cuéntame qué buscas y te recomiendo del catálogo. Por ejemplo: \"unos tenis cómodos para correr en la playa\".",
      },
    ],
  });

  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const send = (text: string) => {
    void append({ role: "user", content: text });
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            onClick={() => setOpen(true)}
            aria-label="Abrir asistente IA"
            className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-400 px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/30 transition-transform hover:scale-105"
          >
            <span className="relative grid h-7 w-7 place-items-center rounded-full bg-white/20 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-ping rounded-full bg-white" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-white" />
            </span>
            <span className="hidden sm:inline">Pregúntale al Asistente</span>
            <span className="sm:hidden">IA</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-5 right-5 z-50 flex max-h-[min(640px,calc(100dvh-2.5rem))] w-[min(420px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border/60 bg-background shadow-2xl shadow-black/10"
          >
            <div className="flex items-center gap-3 border-b border-border/60 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-orange-400/10 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold leading-tight">
                  Asistente Inteligente
                </h3>
                <p className="text-xs text-muted-foreground">
                  Te recomienda productos del catálogo en segundos.
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto p-4"
            >
              {messages.map((m) => (
                <Message key={m.id} role={m.role} content={m.content} />
              ))}
              {isLoading && (
                <div className="flex items-center gap-3">
                  <Avatar role="assistant" />
                  <div className="rounded-2xl bg-muted px-4 py-2.5">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 px-4 pb-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="rounded-full border border-border/60 bg-card px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-violet-400/40 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-border/60 p-3"
            >
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Escribe lo que buscas…"
                className="flex-1"
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                aria-label="Enviar"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Avatar({ role }: { role: "user" | "assistant" | "system" | "data" }) {
  return (
    <div
      className={cn(
        "grid h-8 w-8 shrink-0 place-items-center rounded-full",
        role === "user"
          ? "bg-muted text-foreground"
          : "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white",
      )}
    >
      {role === "user" ? (
        <User className="h-4 w-4" />
      ) : (
        <Bot className="h-4 w-4" />
      )}
    </div>
  );
}

function Message({
  role,
  content,
}: {
  role: "user" | "assistant" | "system" | "data";
  content: string;
}) {
  const referenced = role === "assistant" ? findReferenced(content) : [];
  const cleanText = content;

  return (
    <div
      className={cn(
        "flex items-start gap-3",
        role === "user" && "flex-row-reverse",
      )}
    >
      <Avatar role={role} />
      <div
        className={cn(
          "max-w-[85%] space-y-2 text-sm leading-relaxed",
          role === "user" ? "items-end text-right" : "items-start",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5",
            role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground",
          )}
        >
          <p className="whitespace-pre-wrap">{cleanText}</p>
        </div>
        {referenced.length > 0 && (
          <div className="space-y-1.5">
            {referenced.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="flex items-center gap-3 rounded-xl border border-border/60 bg-card p-2 pr-3 transition-colors hover:border-violet-400/50 hover:bg-accent"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-xs font-medium">{p.name}</p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="text-xs font-bold">
                      {formatMXN(p.price)}
                    </span>
                    <Badge variant="success" className="text-[10px]">
                      ★ {p.rating.toFixed(1)}
                    </Badge>
                  </div>
                </div>
                <MessageCircle className="h-3.5 w-3.5 text-violet-500" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Detecta referencias [id] que la IA menciona y devuelve los productos correspondientes. */
function findReferenced(text: string) {
  const matches = Array.from(text.matchAll(/\[([a-z0-9-]+)\]/g)).map(
    (m) => m[1],
  );
  const seen = new Set<string>();
  const result = [];
  for (const id of matches) {
    if (seen.has(id)) continue;
    seen.add(id);
    const p = ALL_PRODUCTS.find((x) => x.id === id);
    if (p) result.push(p);
    if (result.length >= 3) break;
  }
  return result;
}
