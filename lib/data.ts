import {
  Brain,
  Code2,
  Database,
  Layout,
  Sparkles,
  Wrench,
} from "lucide-react";

export const personalInfo = {
  name: "Ronal Angulo",
  role: "Desarrollador Full Stack Junior",
  specialty: "IA & E-commerce",
  tagline:
    "Construyo experiencias digitales inteligentes con Next.js y IA",
  location: "Mazatlán, Sinaloa, México",
  email: "Ronal_aangulo@hotmail.com",
  bio: "Júnior apasionado por el desarrollo web y la IA aplicada a e-commerce. Busco mi primer rol profesional en Latam o remote, donde pueda aportar energía, ganas de aprender y construir productos que la gente realmente use.",
  longBio:
    "Soy un desarrollador autodidacta con base sólida en JavaScript moderno y el ecosistema de React/Next.js. Me motiva especialmente la intersección entre interfaces bien diseñadas, IA generativa y comercio digital — creo que las tiendas del futuro se sentirán más como conversaciones que como catálogos.",
  social: {
    github: "https://github.com/RonalMZ",
    linkedin: "https://www.linkedin.com/in/ronal-angulo",
    cv: "mailto:Ronal_aangulo@hotmail.com?subject=Solicitud%20de%20CV%20-%20Ronal%20Angulo",
  },
};

export const stats = [
  { label: "Repos públicos", value: "2" },
  { label: "App IA en producción", value: "1" },
  { label: "Stack principal", value: "Next.js" },
  { label: "Modalidad", value: "Remoto" },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  demo?: string;
  code?: string;
  status: string;
  proof: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "AI Shop Assistant",
    description:
      "Asistente de compras con IA desplegado en Vercel. La prioridad fue convertir una búsqueda genérica en una conversación útil con recomendaciones de producto.",
    tags: ["Next.js", "Vercel AI SDK", "Gemini", "Tailwind"],
    image: "/images/projects/ai-shop-assistant.jpg",
    demo: "https://aishopassistantmzt.vercel.app",
    status: "Demo en producción",
    proof: [
      "Despliegue público en Vercel",
      "Endpoint conversacional con modelo Gemini",
      "UI enfocada en recomendación de productos",
    ],
    featured: true,
  },
  {
    title: "Directorio-MZT",
    description:
      "Directorio local para Mazatlán inspirado en el concepto de libro amarillo: negocios, categorías y búsqueda orientada a usuarios reales de la ciudad.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Arquitectura full-stack"],
    code: "https://github.com/RonalMZ/Directorio-MZT",
    status: "Repositorio público",
    proof: [
      "Código público en GitHub",
      "Dominio de negocio local claro",
      "Base para producto de directorio comercial",
    ],
    featured: true,
  },
];

export type SkillCategory = {
  title: string;
  icon: typeof Code2;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      { name: "Next.js (App Router)", level: 85 },
      { name: "React 19", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 75 },
    ],
  },
  {
    title: "Backend",
    icon: Database,
    skills: [
      { name: "Node.js", level: 75 },
      { name: "REST APIs", level: 80 },
      { name: "PostgreSQL", level: 65 },
      { name: "Drizzle / Prisma", level: 60 },
    ],
  },
  {
    title: "IA & Datos",
    icon: Brain,
    skills: [
      { name: "Vercel AI SDK", level: 78 },
      { name: "OpenAI API", level: 80 },
      { name: "Embeddings & RAG", level: 60 },
      { name: "Prompt engineering", level: 75 },
    ],
  },
  {
    title: "Herramientas",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub", level: 88 },
      { name: "VS Code", level: 95 },
      { name: "Vercel", level: 85 },
      { name: "Figma", level: 65 },
    ],
  },
];

export type TimelineItem = {
  title: string;
  organization: string;
  period: string;
  description: string;
  icon: typeof Code2;
};

export const timeline: TimelineItem[] = [
  {
    title: "Curso Completo de Ciberseguridad Defensiva",
    organization: "Udemy — Santiago Hernández",
    period: "2025",
    description:
      "Curso integral de Ciberseguridad Defensiva. Profundicé en criptografía moderna, seguridad de redes, hardening de hosts (EDR/XDR), operaciones SOC con SIEM, PKI y gestión de riesgos mediante MITRE ATT&CK y STRIDE.",
    icon: Code2,
  },
  {
    title: "Especialización en IA con Next.js",
    organization: "Vercel + cursos abiertos",
    period: "2025 — 2026",
    description:
      "Estudio del Vercel AI SDK, integración de modelos de OpenAI y patrones de UI conversacional para productos reales.",
    icon: Sparkles,
  },
  {
    title: "Proyectos freelance",
    organization: "Clientes locales — Sinaloa",
    period: "2024 — actual",
    description:
      "Landing pages, mini-tiendas y dashboards para emprendedores locales. Aprendiendo a entregar, no solo a programar.",
    icon: Layout,
  },
  {
    title: "Preparatoria",
    organization: "CECyTE Villa del Sol — Tijuana, B.C.",
    period: "2017 — 2020",
    description:
      "Formación técnica con primeras bases de programación, lógica y trabajo en equipo.",
    icon: Database,
  },
];

export const navLinks = [
  { href: "#about", label: "Sobre mí" },
  { href: "#projects", label: "Proyectos" },
  { href: "#skills", label: "Habilidades" },
  { href: "#experience", label: "Experiencia" },
  { href: "#contact", label: "Contacto" },
];
