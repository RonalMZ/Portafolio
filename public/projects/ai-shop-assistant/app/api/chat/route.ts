import { streamText, type CoreMessage } from "ai";
import { getModel, mockTextStream } from "@/lib/ai";
import {
  productsAsContext,
  searchProducts,
} from "@/lib/products";
import { formatMXN } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `Eres el "Asistente Inteligente" de una tienda demo en
México llamada AI Shop Assistant. Hablas en español neutro, en tono cercano
pero profesional, y en mensajes BREVES (máx. 4-6 oraciones por respuesta).

Tu trabajo es recomendar productos del CATÁLOGO de abajo a partir de lo que el
usuario describe. Reglas importantes:
- NUNCA inventes productos que no estén en el catálogo.
- Cuando recomiendes un producto, escribe su id entre corchetes así: [id-del-producto]
  El frontend usa esos corchetes para mostrar tarjetas. Hazlo SIEMPRE que recomiendes algo.
- Si nada del catálogo encaja bien, dilo con honestidad y propón alternativas
  cercanas dentro del catálogo.
- Cuando el usuario pida descripciones atractivas, sé creativo pero realista
  con las características reales del producto.
- Considera precio, rating, envío y categoría al recomendar.
- Siempre cierra con una pregunta corta para entender mejor (presupuesto,
  estilo, uso, etc.) si la consulta es ambigua.
- No uses emojis. No uses markdown pesado, máximo listas con guiones.

== CATÁLOGO ==
${productsAsContext()}`;

function mockReply(userText: string): string {
  const matches = searchProducts(userText, 3);
  if (matches.length === 0) {
    return `Mmm, no encontré algo del catálogo que encaje 100% con "${userText}". ¿Me cuentas un poco más sobre el uso, presupuesto o estilo? Mientras tanto puedes echar un ojo a [tenis-runner-pro] o [audifonos-bt-noise], que suelen gustar.`;
  }
  const lines = matches.map(
    (p) =>
      `- [${p.id}] — ${formatMXN(p.price)} · ${p.rating}★ · ${p.shortDescription}`,
  );
  return `Te dejo ${matches.length} opciones del catálogo que encajan con lo que buscas:\n${lines.join(
    "\n",
  )}\n\n¿Quieres que filtre por presupuesto o por una característica específica?`;
}

function lastUserText(messages: CoreMessage[]): string {
  const last = [...messages].reverse().find((m) => m.role === "user");
  if (!last) return "";
  if (typeof last.content === "string") return last.content;
  if (Array.isArray(last.content)) {
    return last.content
      .map((p) => ("text" in p ? (p as { text: string }).text : ""))
      .join(" ");
  }
  return "";
}

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: CoreMessage[] };
  const userText = lastUserText(messages);

  const m = getModel();
  if (!m) {
    // Modo demo
    return mockTextStream(mockReply(userText));
  }

  try {
    const result = streamText({
      model: m.model,
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.4,
      maxTokens: 500,
    });
    return result.toDataStreamResponse();
  } catch (err) {
    console.error("[chat] streamText error, fallback:", err);
    return mockTextStream(mockReply(userText));
  }
}

