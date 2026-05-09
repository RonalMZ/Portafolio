import { Router, type IRouter, type Request, type Response } from "express";
import { openai } from "@ai-sdk/openai";
import {
  streamText,
  createUIMessageStream,
  pipeUIMessageStreamToResponse,
  convertToModelMessages,
  type UIMessage,
} from "ai";

const router: IRouter = Router();

const personalInfo = {
  name: "Ronal Angulo",
  role: "Desarrollador Full Stack",
  specialty: "Operational Technology",
  location: "Mazatlán, Sinaloa, México",
  email: "Ronal_aangulo@hotmail.com",
};

const SYSTEM_PROMPT = `Eres el asistente IA del portafolio de ${personalInfo.name},
un ${personalInfo.role} ubicado en ${personalInfo.location}, especializado en
${personalInfo.specialty}.

Hablas en español neutro, en tono cercano, breve y profesional. Si te preguntan
algo que NO esté en la información de abajo, dilo con honestidad y sugiere
escribirle a ${personalInfo.email}. Nunca inventes proyectos, empresas, fechas
ni tecnologías.

== PROYECTOS DESTACADOS ==
- ShopAI: Tienda demo con asistente conversacional usando OpenAI
- Mercado Sinaloa: E-commerce para productores locales con Stripe y PostgreSQL
- AI Shop Assistant: Asistente inteligente con Gemini AI y streaming
- DevChat: Chatbot reutilizable para portafolios
- TaskFlow: Gestor de tareas con drag & drop y Framer Motion
- Clima Now: Dashboard meteorológico con OpenWeather API

== HABILIDADES ==
Frontend: Next.js (85%), React 19 (90%), TypeScript (80%), Tailwind CSS (92%), Framer Motion (75%)
Backend: Node.js (75%), REST APIs (80%), PostgreSQL (65%), Drizzle/Prisma (60%)
IA: Vercel AI SDK (78%), OpenAI API (80%), Embeddings & RAG (60%), Prompt engineering (75%)
Herramientas: Git & GitHub (88%), VS Code (95%), Vercel (85%), Figma (65%)

== EXPERIENCIA ==
- 2025: Curso Completo de Ciberseguridad Defensiva (Udemy)
- 2025-2026: Especialización en IA con Next.js (Vercel + cursos abiertos)
- 2024-actual: Proyectos freelance para clientes locales en Sinaloa
- 2017-2020: Preparatoria CECyTE, Tijuana (bases de programación)

== CONTACTO ==
Email: ${personalInfo.email}
GitHub: https://github.com/RonalMZ
LinkedIn: https://www.linkedin.com/in/ronal-angulo

Responde siempre en máximo 4-5 oraciones. Usa listas solo si ayudan. No uses emojis.`;

function localFallback(userMessage: string): string {
  const q = userMessage.toLowerCase();
  if (/proyecto|project|portfolio|portafolio/.test(q)) {
    return `Algunos proyectos destacados de ${personalInfo.name}: ShopAI (asistente de compras con OpenAI), Mercado Sinaloa (e-commerce local), AI Shop Assistant (streaming con Gemini) y TaskFlow (gestor de tareas). Puedes verlos todos en la sección de Proyectos.`;
  }
  if (/ia|inteligencia|ai|chatbot|openai|gpt|gemini/.test(q)) {
    return `${personalInfo.name} trabaja con IA usando el Vercel AI SDK, OpenAI y Gemini. Ha construido proyectos como ShopAI y AI Shop Assistant que usan streaming en tiempo real y embeddings.`;
  }
  if (/e-?commerce|tienda|stripe|venta/.test(q)) {
    return `Tiene experiencia construyendo tiendas con Next.js, integraciones de Stripe en modo test y bases de datos PostgreSQL. Un ejemplo es "Mercado Sinaloa" para productores locales.`;
  }
  if (/skill|habilidad|tecnolog|stack/.test(q)) {
    return `Su stack principal: React 19 + Next.js (frontend), Node.js + PostgreSQL (backend), Vercel AI SDK + OpenAI (IA), y TypeScript + Tailwind CSS en todos los proyectos.`;
  }
  if (/contact|email|correo|hire|contratar/.test(q)) {
    return `Puedes escribirle a ${personalInfo.email} o por LinkedIn. Está abierto a su primer rol profesional, remoto o en LATAM.`;
  }
  if (/hola|buenas|hey|hi|hello/.test(q)) {
    return `¡Hola! Soy el asistente del portafolio de ${personalInfo.name}. Pregúntame por sus proyectos, habilidades, experiencia o cómo contactarlo.`;
  }
  return `Para detalles más específicos te recomiendo escribirle directamente a ${personalInfo.email}. Puedo contarte de sus proyectos, habilidades o experiencia.`;
}

function sendFallback(res: Response, text: string): void {
  const stream = createUIMessageStream({
    execute: (writer) => {
      writer.write({ type: "text-delta", textDelta: text });
    },
  });
  pipeUIMessageStreamToResponse({ response: res, stream });
}

router.post("/chat", async (req: Request, res: Response) => {
  const { messages } = req.body as { messages: UIMessage[] };

  const lastUser = [...(messages ?? [])].reverse().find((m) => m.role === "user");
  const lastUserText =
    typeof lastUser?.content === "string" ? lastUser.content : "";

  if (!process.env.OPENAI_API_KEY) {
    sendFallback(res, localFallback(lastUserText));
    return;
  }

  try {
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: SYSTEM_PROMPT,
      messages: convertToModelMessages(messages ?? []),
      temperature: 0.4,
      maxOutputTokens: 400,
    });
    result.pipeUIMessageStreamToResponse(res);
  } catch (err) {
    req.log.error({ err }, "chat streamText failed, using fallback");
    sendFallback(res, localFallback(lastUserText));
  }
});

export default router;
