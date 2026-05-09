import { openai } from "@ai-sdk/openai";
import { streamText, type CoreMessage } from "ai";
import { personalInfo, projects, skillCategories, timeline } from "@/lib/data";

export const runtime = "nodejs";
export const maxDuration = 30;

const SYSTEM_PROMPT = `Eres el asistente IA del portafolio de ${personalInfo.name},
un ${personalInfo.role} ubicado en ${personalInfo.location}, especializado en
${personalInfo.specialty}.

Hablas en español neutro, en tono cercano, breve y profesional. Si te preguntan
algo que NO esté en la información de abajo, dilo con honestidad y sugiere
escribirle a ${personalInfo.email}. Nunca inventes proyectos, empresas, fechas
ni tecnologías.

== BIO ==
${personalInfo.bio}
${personalInfo.longBio}

== PROYECTOS ==
${projects
  .map(
    (p) =>
      `- ${p.title}: ${p.description} [tecnologías: ${p.tags.join(", ")}]`,
  )
  .join("\n")}

== HABILIDADES ==
${skillCategories
  .map(
    (c) =>
      `- ${c.title}: ${c.skills.map((s) => `${s.name} (${s.level}%)`).join(", ")}`,
  )
  .join("\n")}

== EXPERIENCIA Y FORMACIÓN ==
${timeline
  .map((t) => `- ${t.period} — ${t.title} en ${t.organization}: ${t.description}`)
  .join("\n")}

== CONTACTO ==
Email: ${personalInfo.email}
GitHub: ${personalInfo.social.github}
LinkedIn: ${personalInfo.social.linkedin}

Responde siempre en máximo 4-5 oraciones, salvo que pidan detalle. Usa listas
solo si ayudan. No uses emojis.`;

/**
 * Smart fallback used when no OPENAI_API_KEY is configured.
 * Keeps the demo working 100% locally without external services.
 */
function localFallback(userMessage: string): string {
  const q = userMessage.toLowerCase();

  if (/proyecto|project|portfolio|portafolio/.test(q)) {
    const list = projects
      .slice(0, 3)
      .map((p) => `• ${p.title} — ${p.tags.slice(0, 3).join(", ")}`)
      .join("\n");
    return `Estos son algunos proyectos destacados de ${personalInfo.name}:\n\n${list}\n\nPuedes verlos todos más arriba en la sección de Proyectos.`;
  }
  if (/ia|inteligencia|ai|chatbot|openai|gpt|gemini/.test(q)) {
    const aiProjects = projects.filter((p) =>
      p.tags.some((t) => /AI|OpenAI|Vercel AI|Gemini/i.test(t)),
    );
    return `${personalInfo.name} trabaja con IA usando el Vercel AI SDK con OpenAI y Google Gemini. ${
      aiProjects.length
        ? `Proyectos con IA: ${aiProjects.map((p) => p.title).join(", ")}.`
        : ""
    }`;
  }
  if (/e-?commerce|tienda|stripe|venta/.test(q)) {
    return `Tiene experiencia construyendo tiendas con Next.js, integración de Stripe en modo test y bases de datos PostgreSQL. Un ejemplo real es "AI Shop Assistant" con recomendaciones en tiempo real.`;
  }
  if (/skill|habilidad|tecnolog|stack/.test(q)) {
    const top = skillCategories
      .map(
        (c) =>
          `${c.title}: ${c.skills
            .map((s) => s.name)
            .slice(0, 3)
            .join(", ")}`,
      )
      .join(" · ");
    return `Su stack principal: ${top}.`;
  }
  if (/contact|email|correo|hire|contratar/.test(q)) {
    return `Puedes escribirle directo a ${personalInfo.email} o por LinkedIn (${personalInfo.social.linkedin}). Está abierto a su primer rol profesional, remoto o en LATAM.`;
  }
  if (/ubicaci|donde|d[oó]nde|sinaloa|m[eé]xico|mazatl/.test(q)) {
    return `Está en ${personalInfo.location}. Trabaja remoto sin problema y disponible para zonas horarias de América.`;
  }
  if (/experiencia|trabajo|empleo|freelance|cv|currículum/.test(q)) {
    const last = timeline[0];
    return `Su experiencia más reciente: ${last.title} en ${last.organization} (${last.period}). También ha hecho freelance con clientes locales en Sinaloa. Puedes solicitar su CV desde el botón en la sección principal.`;
  }
  if (/hola|buenas|hey|hi|hello/.test(q)) {
    return `¡Hola! Soy el asistente del portafolio de ${personalInfo.name}. Pregúntame sobre sus proyectos, habilidades, experiencia o cómo contactarlo.`;
  }
  return `Buena pregunta. Para detalles más específicos te recomiendo escribirle directamente a ${personalInfo.email}. Mientras tanto puedo contarte de sus proyectos, habilidades o experiencia.`;
}

function fallbackStream(text: string): Response {
  // Encode as the AI SDK "data stream" protocol so useChat parses it correctly.
  // Each text chunk: 0:"<json-string>"\n
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = text.split(/(\s+)/);
      for (const w of words) {
        controller.enqueue(encoder.encode(`0:${JSON.stringify(w)}\n`));
        await new Promise((r) => setTimeout(r, 18));
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

export async function POST(req: Request) {
  const { messages } = (await req.json()) as { messages: CoreMessage[] };

  const lastUser = [...messages]
    .reverse()
    .find((m) => m.role === "user");
  const lastUserText =
    typeof lastUser?.content === "string"
      ? lastUser.content
      : Array.isArray(lastUser?.content)
        ? lastUser!.content
            .map((c) => ("text" in c ? (c as { text: string }).text : ""))
            .join(" ")
        : "";

  if (!process.env.OPENAI_API_KEY) {
    return fallbackStream(localFallback(lastUserText));
  }

  try {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.4,
      maxTokens: 400,
    });
    return result.toDataStreamResponse();
  } catch (err) {
    console.error("[chat] streamText failed, using fallback:", err);
    return fallbackStream(localFallback(lastUserText));
  }
}
