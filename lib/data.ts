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
  role: "Desarrollador Full Stack",
  specialty: "Operational Technology",
  tagline:
    "Optimizo procesos operativos mediante soluciones tecnologicas inteligentes",
  location: "Mazatlán, Sinaloa, México",
  email: "Ronal_aangulo@hotmail.com",
  bio: "Júnior apasionado por el desarrollo web y la IA aplicada a e-commerce. Busco mi primer rol profesional en Latam o remote, donde pueda aportar energía, ganas de aprender y construir productos que la gente realmente use.",
  longBio:
    "Soy un desarrollador autodidacta con base sólida en JavaScript moderno y el ecosistema de React/Next.js. Me motiva especialmente la intersección entre interfaces bien diseñadas, IA generativa y comercio digital — creo que las tiendas del futuro se sentirán más como conversaciones que como catálogos.",
  social: {
    github: "https://github.com/RonalMZ",
    linkedin: "https://www.linkedin.com/in/ronal-angulo",
    cv: "/cv/Ronal-Angulo-CV.pdf",
  },
};

export const stats = [
  { label: "Proyectos construidos", value: "12+" },
  { label: "Tecnologías dominadas", value: "15" },
  { label: "Café por día", value: "∞" },
  { label: "Listo para trabajar", value: "100%" },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  demo: string;
  code: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "ShopAI — Asistente de compras",
    description:
      "Tienda demo con un asistente conversacional que recomienda productos en base al gusto del usuario, usando embeddings y la API de OpenAI.",
    tags: ["Next.js", "Vercel AI SDK", "OpenAI", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
    demo: "https://example.com/shopai",
    code: "https://github.com/ronaldejesus/shop-ai",
    featured: true,
  },
  {
    title: "Mercado Sinaloa — Tienda local",
    description:
      "E-commerce sencillo para productores locales, con carrito persistente, checkout simulado y panel de administración básico.",
    tags: ["Next.js", "Stripe (test)", "PostgreSQL", "shadcn/ui"],
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=1200&q=80",
    demo: "https://example.com/mercado-sinaloa",
    code: "https://github.com/ronaldejesus/mercado-sinaloa",
    featured: true,
  },
  {
    title: "DevChat — Chatbot para portafolios",
    description:
      "Componente de chatbot reutilizable que responde preguntas sobre tus skills y proyectos. El mismo que vive en este sitio.",
    tags: ["React", "Vercel AI SDK", "TypeScript"],
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=80",
    demo: "https://example.com/devchat",
    code: "https://github.com/ronaldejesus/devchat",
  },
  {
    title: "TaskFlow — Gestor de tareas",
    description:
      "App de productividad con drag & drop, etiquetas y modo enfoque. Pensada para sentir que el trabajo fluye, no que se acumula.",
    tags: ["React", "Zustand", "Framer Motion"],
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80",
    demo: "https://example.com/taskflow",
    code: "https://github.com/ronaldejesus/taskflow",
  },
  {
    title: "Clima Now — Dashboard del tiempo",
    description:
      "Dashboard meteorológico minimalista con búsqueda por ciudad, gráficas por hora y soporte para geolocalización.",
    tags: ["Next.js", "OpenWeather API", "Recharts"],
    image: "https://images.unsplash.com/photo-1561553873-e8491a564fd0?w=1200&q=80",
    demo: "https://example.com/clima-now",
    code: "https://github.com/ronaldejesus/clima-now",
  },
  {
    title: "Landing Studio — Plantillas",
    description:
      "Colección de landing pages animadas listas para arrancar un negocio. Componentes desacoplados y fáciles de adaptar.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
    demo: "https://example.com/landing-studio",
    code: "https://github.com/ronaldejesus/landing-studio",
  },
  {
  title: "AI Shop Assistant",
  description: "Asistente inteligente de compras con IA que recomienda productos personalizados usando lenguaje natural y streaming en tiempo real.",
  tags: ["Next.js", "Vercel AI SDK", "Gemini", "Tailwind", "shadcn/ui"],
  image: "/images/projects/ai-shop-assistant.jpg", // ← Pega aquí la ruta a tu imagen real
  demo: "https://ai-shop-assistant-mzt.vercel.app/",   // ← Pega aquí tu URL real
  code: "https://github.com/RonalMZ/ai-shop-assistant",
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
    organization: "Udemy - Santiago Hernández",
    period: "2025",
    description:
     "Curso integral de Ciberseguridad Defensiva. Profundicé en criptografía moderna, seguridad de redes y comunicaciones, hardening de hosts (EDR/XDR), operaciones SOC con SIEM, PKI y gestión de riesgos mediante MITRE ATT&CK y STRIDE. Enfoque práctico en herramientas profesionales y entornos cloud.",
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
    title: "Proyectos freelance pequeños",
    organization: "Clientes locales — Sinaloa",
    period: "2024 — actual",
    description:
      "Landing pages, mini-tiendas y dashboards para emprendedores locales. Aprendiendo a entregar, no solo a programar.",
    icon: Layout,
  },
  {
    title: "Preparatoria ",
    organization: "CECyTE villa del sol — Tijuana, Baja California",
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
