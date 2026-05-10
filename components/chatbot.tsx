"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { Bot, Send, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "¿En qué tecnologías es más fuerte Ronal?",
  "Cuéntame sobre sus proyectos de IA",
  "¿Qué experiencia tiene en e-commerce?",
];

export function Chatbot() {
  const [aiStatus, setAiStatus] = React.useState<{
    configured: boolean;
    provider: string;
    model: string;
  } | null>(null);
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
          "¡Hola! Soy un asistente IA entrenado con la info de Ronal. Pregúntame por sus skills, proyectos o experiencia.",
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

  React.useEffect(() => {
    let active = true;

    fetch("/api/chat", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((status) => {
        if (active && status) {
          setAiStatus(status);
        }
      })
      .catch(() => {
        if (active) {
          setAiStatus({
            configured: false,
            provider: "local",
            model: "modo local",
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const sendSuggestion = (text: string) => {
    void append({ role: "user", content: text });
  };

  return (
    <Card className="flex h-full max-h-[640px] min-h-[480px] flex-col border-border/60 bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3 border-b border-border/60 space-y-0">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-purple-500 text-primary-foreground">
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <CardTitle className="text-base">Pregúntale a la IA</CardTitle>
          <p className="text-xs text-muted-foreground">
            Responde sobre habilidades, proyectos y experiencia.
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          {aiStatus?.configured
            ? `${aiStatus.provider} · ${aiStatus.model}`
            : "modo local"}
        </span>
      </CardHeader>

      <CardContent
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto p-4"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex items-start gap-3",
              m.role === "user" && "flex-row-reverse",
            )}
          >
            <div
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full",
                m.role === "user"
                  ? "bg-muted text-foreground"
                  : "bg-gradient-to-br from-primary to-purple-500 text-primary-foreground",
              )}
            >
              {m.role === "user" ? (
                <User className="h-4 w-4" />
              ) : (
                <Bot className="h-4 w-4" />
              )}
            </div>
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground",
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-purple-500 text-primary-foreground">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl bg-muted px-4 py-2.5">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-foreground/40" />
              </div>
            </div>
          </div>
        )}
      </CardContent>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 px-4 pb-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => sendSuggestion(s)}
              className="rounded-full border border-border/60 bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
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
          placeholder="Escribe tu pregunta…"
          className="flex-1"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading || !input.trim()}
          aria-label="Enviar pregunta al chatbot"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Card>
  );
}
