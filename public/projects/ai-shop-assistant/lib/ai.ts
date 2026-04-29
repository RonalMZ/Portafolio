/**
 * Wrapper centralizado del proveedor de IA.
 * Detecta automáticamente qué API key está disponible y elige proveedor:
 *   1. Google Gemini (si GOOGLE_GENERATIVE_AI_API_KEY)
 *   2. Groq        (si GROQ_API_KEY)
 *   3. mock        (sin API key — modo demo)
 *
 * Permite forzar uno con AI_PROVIDER=google | groq | mock | auto
 */

import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import type { LanguageModelV1 } from "ai";

export type ProviderName = "google" | "groq" | "mock";

export function resolveProvider(): ProviderName {
  const forced = (process.env.AI_PROVIDER || "auto").toLowerCase();
  if (forced === "google" || forced === "groq" || forced === "mock") {
    return forced;
  }
  if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) return "google";
  if (process.env.GROQ_API_KEY) return "groq";
  return "mock";
}

export function getModel(): { model: LanguageModelV1; provider: ProviderName } | null {
  const provider = resolveProvider();
  if (provider === "google") {
    return { model: google("gemini-1.5-flash"), provider };
  }
  if (provider === "groq") {
    return { model: groq("llama-3.1-8b-instant"), provider };
  }
  return null; // mock
}

/**
 * Stream con el "data stream protocol" del Vercel AI SDK.
 * Sirve para el modo demo: simula streaming token a token.
 */
export function mockTextStream(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const chunks = text.split(/(\s+)/);
      for (const c of chunks) {
        controller.enqueue(encoder.encode(`0:${JSON.stringify(c)}\n`));
        await new Promise((r) => setTimeout(r, 22));
      }
      controller.enqueue(
        encoder.encode(
          `d:${JSON.stringify({
            finishReason: "stop",
            usage: { promptTokens: 0, completionTokens: 0 },
          })}\n`,
        ),
      );
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "x-vercel-ai-data-stream": "v1",
    },
  });
}

/**
 * Stream de texto plano (no protocolo) para endpoints que NO usan useChat,
 * como /api/recommend que se consume con fetch + ReadableStream.
 */
export function mockPlainStream(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const chunks = text.split(/(\s+)/);
      for (const c of chunks) {
        controller.enqueue(encoder.encode(c));
        await new Promise((r) => setTimeout(r, 22));
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
