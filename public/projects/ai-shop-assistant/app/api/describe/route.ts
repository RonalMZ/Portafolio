import { streamText } from "ai";
import { getModel, mockPlainStream } from "@/lib/ai";
import { products } from "@/lib/products";

export const runtime = "nodejs";
export const maxDuration = 30;

function mockDescribe(name: string, tags: string[]): string {
  const t = tags.slice(0, 3).join(", ");
  return `Diseñado para quienes buscan algo más que un producto cualquiera, el ${name} combina calidad y estilo en partes iguales. Pensado con un enfoque en ${t || "uso diario"}, es perfecto tanto para regalar como para darte un gusto. Cada detalle suma a una experiencia que vas a notar desde el primer uso, sin pagar de más por ello.`;
}

export async function POST(req: Request) {
  const { productId } = (await req.json()) as { productId?: string };
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return new Response("Producto no encontrado", { status: 404 });
  }

  const m = getModel();
  if (!m) {
    return mockPlainStream(mockDescribe(product.name, product.tags));
  }

  const prompt = `Escribe una descripción de venta MUY breve (máx. 3 oraciones, ~70 palabras) para este producto, en español neutro, tono cercano y sin emojis. NO repitas el precio. NO inventes características que no estén listadas.

Producto: ${product.name}
Marca: ${product.brand}
Categoría: ${product.category}
Resumen corto existente: ${product.shortDescription}
Detalles existentes: ${product.longDescription}
Tags: ${product.tags.join(", ")}`;

  try {
    const result = streamText({
      model: m.model,
      prompt,
      temperature: 0.7,
      maxTokens: 220,
    });
    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[describe] streamText error, fallback:", err);
    return mockPlainStream(mockDescribe(product.name, product.tags));
  }
}
