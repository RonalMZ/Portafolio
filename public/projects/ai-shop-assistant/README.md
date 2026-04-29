# AI Shop Assistant

Tienda demo de e-commerce con un **Asistente Inteligente** que recomienda productos en español natural usando el **Vercel AI SDK** con **Google Gemini** o **Groq** (ambos con planes gratuitos).

> Hecho en Next.js 15 (App Router) + React 19 + TypeScript + Tailwind + Framer Motion. Funciona 100% en local en **Windows, macOS y Linux**.

---

## Lo que incluye este proyecto

- **Catálogo en memoria** de 12 productos de e-commerce LATAM (sin base de datos).
- **Asistente flotante de chat** con streaming token a token (`@ai-sdk/react`).
- **Panel de recomendaciones IA**: el usuario describe lo que necesita en lenguaje natural y la IA devuelve productos del catálogo + razonamiento.
- **Página de producto** con descripción generada por IA bajo demanda (también en streaming).
- **RAG simple**: el catálogo se inyecta como contexto al modelo, así nunca recomienda productos inexistentes.
- **Modo demo offline**: si no configuras ninguna API key, el proyecto sigue funcionando con respuestas simuladas (perfecto para presentaciones sin internet).
- **Tema claro/oscuro**, animaciones, filtros, búsqueda y diseño responsivo.

---

## Stack

| Capa            | Tecnología                                |
| --------------- | ----------------------------------------- |
| Framework       | Next.js 15 (App Router)                   |
| Lenguaje        | TypeScript                                |
| UI              | Tailwind CSS + componentes tipo shadcn/ui |
| Animaciones     | Framer Motion                             |
| IA              | Vercel AI SDK 4 (`ai`, `@ai-sdk/react`)   |
| Proveedores IA  | Google Gemini · Groq · Mock               |
| Iconos          | lucide-react                              |
| Modo oscuro     | next-themes                               |

---

## Cómo correrlo en tu computadora (Windows / Mac / Linux)

### Requisitos

- **Node.js 18.18 o superior** (recomendado Node 20 LTS).  
  Descarga: https://nodejs.org/es/download
- npm (viene incluido con Node).

Verifica tu versión:

```powershell
node --version
npm --version
```

### Pasos en Windows (PowerShell o CMD)

> En **PowerShell** las instrucciones son línea por línea (no uses `&&`, no es necesario en Windows).

1. **Descomprime** el archivo `ai-shop-assistant.zip` en una carpeta cómoda, por ejemplo `C:\Proyectos\ai-shop-assistant`.

2. **Abre PowerShell** dentro de esa carpeta:
   - Click derecho dentro de la carpeta → **Abrir en Terminal** (Windows 11), o
   - En el explorador escribe `powershell` en la barra de direcciones y Enter.

3. **Instala las dependencias**:

   ```powershell
   npm install
   ```

   La primera vez tarda 1–3 minutos.

4. **(Opcional)** Configura tu API key (ver sección siguiente). Si no quieres configurar nada, puedes saltar este paso y el proyecto correrá en **modo demo** con respuestas simuladas.

5. **Levanta el servidor de desarrollo**:

   ```powershell
   npm run dev
   ```

6. Abre tu navegador en **http://localhost:3000**.

### Pasos en macOS / Linux

```bash
npm install
npm run dev
```

---

### Si ves un error de "scripts deshabilitados" en Windows

Ejecuta una sola vez en PowerShell **como administrador**:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Y vuelve a intentar `npm install`.

---

## Cómo conectar una IA real (gratis)

El proyecto detecta automáticamente qué API key tienes configurada y elige el proveedor en este orden:

1. **Google Gemini** — si existe `GOOGLE_GENERATIVE_AI_API_KEY`
2. **Groq** — si existe `GROQ_API_KEY`
3. **Modo demo** — si no hay ninguna

Puedes forzar uno con `AI_PROVIDER=google | groq | mock`.

### Opción A — Google Gemini (recomendado, totalmente gratis)

1. Ve a **https://aistudio.google.com/app/apikey** (entra con cualquier cuenta de Google).
2. Click en **Create API key** → **Create API key in new project**.
3. Copia la clave (algo tipo `AIzaSy...`).
4. En la raíz del proyecto **renombra** `.env.example` a `.env.local` (es muy importante el `.local`).
5. Pega tu clave:

   ```
   GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...tu-clave...
   ```

6. Detén el servidor con `Ctrl + C` y vuelve a correr `npm run dev`.

> El modelo usado es `gemini-1.5-flash` (gratuito, rápido, perfecto para esto).

### Opción B — Groq (también gratis, ultrarrápido)

1. Crea cuenta en **https://console.groq.com/login**.
2. Ve a **API Keys** → **Create API Key** y copia el valor.
3. En tu `.env.local`:

   ```
   GROQ_API_KEY=gsk_...tu-clave...
   ```

4. Reinicia el servidor.

> El modelo usado es `llama-3.1-8b-instant`.

### Opción C — Sin API key (modo demo)

No hagas nada. El proyecto correrá con **respuestas simuladas** (sigue siendo útil como demo: el chatbot busca en el catálogo con un ranker léxico y simula streaming token a token). Verás una experiencia muy parecida a tener IA real.

---

## Cómo probarlo (preguntas de ejemplo)

Una vez abierto en `http://localhost:3000`, prueba a:

- Hacer click en el **botón flotante "Pregúntale al Asistente"** (esquina inferior derecha) y preguntar:
  - _"¿Qué tenis me recomiendas para correr en la playa de Mazatlán?"_
  - _"Busco un regalo para alguien que ama el café por menos de $500"_
  - _"Necesito audífonos para trabajar remoto en cafeterías ruidosas"_
  - _"Algo fresco para el calor de Sinaloa"_

- Bajar al **panel de recomendaciones** (sección morada) y describir lo que buscas: la IA devuelve un razonamiento + tarjetas de producto.

- Entrar a cualquier producto y pulsar **"Generar"** dentro del recuadro morado para ver una descripción nueva escrita por la IA en streaming.

---

## Estructura del proyecto

```
ai-shop-assistant/
├── app/
│   ├── api/
│   │   ├── chat/route.ts          # Endpoint del chat (RAG + streaming protocolado)
│   │   ├── recommend/route.ts     # Endpoint del panel de recomendaciones
│   │   └── describe/route.ts      # Endpoint de descripción de producto
│   ├── product/[id]/
│   │   ├── page.tsx               # Detalle del producto
│   │   └── ai-description.tsx     # Botón "Generar descripción IA"
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                   # Home: hero + recomendaciones + catálogo
├── components/
│   ├── sections/
│   │   ├── hero.tsx
│   │   └── catalog.tsx
│   ├── ui/                        # Botones, cards, badges, inputs… (shadcn-style)
│   ├── floating-chatbot.tsx       # Chatbot flotante con useChat
│   ├── recommendation-panel.tsx
│   ├── product-card.tsx
│   ├── catalog-filters.tsx
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
├── lib/
│   ├── ai.ts                      # Selección de proveedor + streams mock
│   ├── products.ts                # Catálogo en memoria + funciones RAG
│   └── utils.ts
├── .env.example
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Comandos disponibles

| Comando         | Qué hace                                       |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Servidor de desarrollo en http://localhost:3000|
| `npm run build` | Compila la versión optimizada de producción    |
| `npm run start` | Sirve la build de producción (tras `build`)    |
| `npm run lint`  | Ejecuta ESLint                                 |

---

## Notas técnicas

- El **catálogo** vive en memoria (`lib/products.ts`). Para conectarlo a una base de datos real solo hay que cambiar las funciones `getProduct`, `searchProducts` y `productsAsContext`.
- La **función RAG** es muy simple: se inyecta el catálogo entero como texto en el prompt del sistema (caben los 12 productos sin problema). Para catálogos más grandes deberías usar embeddings + búsqueda vectorial (pgvector, Pinecone, etc.).
- El **chatbot** usa el _data stream protocol_ del Vercel AI SDK; el panel y la descripción usan stream de **texto plano** porque se consumen con `fetch + ReadableStream`.
- El **modo mock** simula streaming token a token con un `ReadableStream` real, así la UX es idéntica con o sin API key.

---

Hecho con cariño por **Ronal de Jesus** — Sinaloa, México.
