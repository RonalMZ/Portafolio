import { streamText } from "ai";
import { getModel, mockPlainStream } from "@/lib/ai";
import { products, productsAsContext, searchProducts } from "@/lib/products";
import { formatMXN } from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM = `Eres un experto curador de e-commerce para una tienda demo en
México. Recibes una intención del usuario y devuelves una recomendación
razonada SOLO con productos del CATÁLOGO.

Formato de salida ESTRICTO:
1) Primero, escribe un párrafo corto (3-5 oraciones) explicando por qué
   elegiste esos productos para esta persona, en tono cercano y útil.
2) Luego, en una nueva línea, escribe un bloque JSON entre triple backticks
   con esta forma exacta:

\`\`\`json
{
  "productIds": ["id-1", "id-2", "id-3"],
  "reason": "Resumen muy breve (1 oración) de por qué encajan."
}
\`\`\`

Reglas:
- Devuelve entre 2 y 4 productIds, ordenados del mejor al menos relevante.
- USA EXCLUSIVAMENTE ids que existan en el catálogo.
- Considera precio, rating, envío, categoría y tags.
- No uses emojis.

== CATÁLOGO ==
${productsAsContext()}`;

function mockRecommendation(prompt: string): string {
  const matches = searchProducts(prompt, 3);
  const ids = (matches.length > 0 ? matches : products.slice(0, 3)).map(
    (p) => p.id,
  );
  const list = (matches.length > 0 ? matches : products.slice(0, 3))
    .map((p) => `${p.name} (${formatMXN(p.price)})`)
    .join(", ");

  const reasoning = `Para "${prompt}" te recomiendo principalmente: ${list}. Estas opciones combinan buen rating, precio competitivo y características que encajan con lo que describes. Si me das más detalle (presupuesto exacto, color o uso preferido) puedo afinar más la selección.`;

  const json = JSON.stringify(
    {
      productIds: ids,
      reason: `Mejor balance de precio, rating y relevancia para "${prompt}".`,
    },
    null,
    2,
  );

  return `${reasoning}\n\n\`\`\`json\n${json}\n\`\`\``;
}

export async function POST(req: Request) {
  const { prompt } = (await req.json()) as { prompt?: string };
  const userPrompt = (prompt ?? "").trim();
  if (!userPrompt) {
    return new Response("Falta prompt", { status: 400 });
  }

  const m = getModel();
  if (!m) {
    return mockPlainStream(mockRecommendation(userPrompt));
  }

  try {
    const result = streamText({
      model: m.model,
      system: SYSTEM,
      prompt: userPrompt,
      temperature: 0.5,
      maxTokens: 600,
    });
    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[recommend] streamText error, fallback:", err);
    return mockPlainStream(mockRecommendation(userPrompt));
  }
}
