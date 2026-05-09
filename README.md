# Ronal Angulo — Portafolio Personal

Portafolio personal moderno construido con **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Framer Motion** y el **Vercel AI SDK** para un chatbot que responde sobre el dueño del portafolio.

> Listo para correr **100% en local** en Windows / macOS / Linux. La sección de IA tiene un fallback inteligente, así que el sitio funciona aunque no configures ninguna API key.

---

## Requisitos

- **Node.js 18.18 o superior** (recomendado: 20 LTS)
  - Verifica en PowerShell: `node -v`
  - Si no lo tienes, instálalo desde https://nodejs.org (versión LTS).
- **npm** (viene con Node.js). También puedes usar **pnpm** o **yarn** si los prefieres.
- Un editor — recomendado **VS Code**.

---

## 1) Instalar y correr en local (Windows)

Abre **PowerShell** o **Windows Terminal** dentro de la carpeta del repo:

```powershell
npm install
npm run dev
```

Luego abre tu navegador en:

```
http://localhost:3000
```

> No necesitas Docker, ni base de datos, ni cuenta de Vercel para verlo funcionar.

### Comandos disponibles

| Comando         | Qué hace                                                  |
| --------------- | --------------------------------------------------------- |
| `npm run dev`   | Modo desarrollo con hot-reload (puerto `3000`)            |
| `npm run build` | Compila para producción                                   |
| `npm run start` | Sirve la build de producción                              |
| `npm run lint`  | Verifica el código con ESLint                             |

---

## 2) (Opcional) Activar el chatbot con OpenAI

El chatbot funciona sin API key usando un fallback local con respuestas pre-cargadas. Si quieres respuestas generadas por **GPT-4o-mini**:

1. Copia `.env.example` a `.env.local`:

   ```powershell
   copy .env.example .env.local
   ```

2. Edita `.env.local` y pega tu API key:

   ```env
   OPENAI_API_KEY=sk-...
   ```

   Obtén una en https://platform.openai.com/api-keys.

3. Reinicia `npm run dev`.

---

## 3) Personalizar tu información

Toda la información del portafolio vive en **un solo archivo**:

```
portfolio/lib/data.ts
```

Allí puedes editar:

- Tu **nombre, rol, ubicación, email y redes** (`personalInfo`)
- Tus **stats** del About (`stats`)
- Tus **proyectos** (`projects`) — agrega o quita objetos del arreglo
- Tus **habilidades** y niveles (`skillCategories`)
- Tu **timeline** de experiencia y formación (`timeline`)
- Los **enlaces** del menú (`navLinks`)

> El chatbot lee esa misma información para responder preguntas. Si actualizas `data.ts`, el bot también se actualiza automáticamente.

### Agregar un proyecto nuevo

Abre `lib/data.ts`, busca el arreglo `projects` y añade un nuevo objeto:

```ts
{
  title: "Mi nuevo proyecto",
  description: "Descripción corta de qué hace.",
  tags: ["Next.js", "Stripe"],
  image: "https://images.unsplash.com/photo-...?w=1200&q=80",
  demo: "https://mi-demo.com",
  code: "https://github.com/usuario/mi-repo",
  featured: true, // opcional, lo destaca con un badge
},
```

Para usar imágenes locales en vez de Unsplash:

1. Coloca la imagen en `public/images/projects/mi-proyecto.jpg`.
2. Usa `image: "/images/projects/mi-proyecto.jpg"`.

### Agregar o cambiar tu CV

El botón principal actualmente abre un correo para solicitar el CV. Si quieres
ofrecer descarga directa, coloca tu PDF en:

```
public/cv/Ronal-Angulo-CV.pdf
```

Luego actualiza `lib/data.ts` → `personalInfo.social.cv` con:

```ts
cv: "/cv/Ronal-Angulo-CV.pdf",
```

Y en `components/sections/hero.tsx` puedes volver a usar el atributo `download`
si quieres forzar la descarga desde el navegador.

---

## 4) Estructura del proyecto

```
portfolio/
├── app/
│   ├── api/chat/route.ts      # Endpoint del chatbot (Vercel AI SDK)
│   ├── globals.css            # Variables de tema (light/dark) + Tailwind
│   ├── layout.tsx             # Layout raíz, fuentes, ThemeProvider
│   └── page.tsx               # Home: monta todas las secciones
├── components/
│   ├── ui/                    # Componentes base estilo shadcn/ui
│   ├── sections/              # Hero, About, Projects, Skills, Experience, Contact
│   ├── chatbot.tsx            # Chatbot conversacional
│   ├── navbar.tsx             # Navbar fijo con scroll-aware
│   ├── footer.tsx
│   ├── theme-provider.tsx     # next-themes (light/dark/system)
│   └── theme-toggle.tsx       # Botón de cambio de tema
├── lib/
│   ├── data.ts                # ⭐ Toda tu info editable
│   └── utils.ts               # Helper cn() para clases
├── public/
│   ├── cv/                    # Carpeta para tu CV en PDF, si agregas descarga directa
│   └── images/projects/       # Capturas locales de tus proyectos
├── package.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.mjs
└── tsconfig.json
```

---

## 5) Deploy en Vercel

La forma más rápida:

1. Sube el proyecto a un repositorio de GitHub.
2. Ve a https://vercel.com/new e importa el repo.
3. En **Environment Variables** agrega (opcional):
   - `OPENAI_API_KEY` con tu key de OpenAI.
4. Haz click en **Deploy**.

Vercel detecta Next.js automáticamente — no hace falta configurar nada más.

> Si no agregas `OPENAI_API_KEY`, el chatbot seguirá funcionando con el fallback local.

---

## 6) Stack técnico

- [Next.js 15](https://nextjs.org/) — App Router, Server Components, streaming
- [TypeScript](https://www.typescriptlang.org/) en modo `strict`
- [Tailwind CSS](https://tailwindcss.com/) con variables CSS para el tema
- [shadcn/ui](https://ui.shadcn.com/) — patrones de componentes (sin dependencia, código incluido)
- [Framer Motion](https://www.framer.com/motion/) — animaciones y scroll reveals
- [Vercel AI SDK](https://sdk.vercel.ai/) + `@ai-sdk/openai` — chatbot con streaming
- [next-themes](https://github.com/pacocoursey/next-themes) — dark / light / system
- [Lucide React](https://lucide.dev/) — iconos

---

## Notas para Windows

- Si ves un warning de PowerShell por scripts deshabilitados al usar `npm`, ejecuta una vez como admin:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```
- Los scripts de `package.json` no usan `&&` ni `cp`, así que funcionan igual en CMD, PowerShell y Git Bash.
- Si Windows Defender / antivirus bloquea `node_modules`, agrega la carpeta del proyecto como excepción.

---

Hecho por **Ronal Angulo** — Mazatlán, Sinaloa, México.
