# Proyecto Portafolio

Monorepo de proyectos de portafolio de Ronal de Jesus. Reune el sitio personal, demos con IA, una aplicacion de restaurante y paquetes compartidos para mostrar trabajo full-stack real con una estructura mantenible.

## Contenido

| Ruta | Tipo | Descripcion |
| --- | --- | --- |
| `apps/portfolio` | App Next.js | Portafolio personal con secciones, proyectos, chatbot y contenido editable. Es un repositorio anidado. |
| `apps/ai-shop-assistant` | App Next.js | Demo de e-commerce con asistente de compras IA, catalogo local y modo mock. Es un repositorio anidado. |
| `apps/restaurant` | App Node.js | RestaurantBot: backend Express, SQLite/Sequelize, chat tipo WhatsApp, panel admin y API REST. |
| `packages/ui` | Paquete compartido | Utilidades UI reutilizables, actualmente `cn()` para clases Tailwind. |

## Stack principal

- Monorepo con `pnpm` workspaces y Turbo.
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Radix/shadcn-style.
- Backend: Node.js, Express, Sequelize, SQLite.
- IA: Vercel AI SDK con proveedores por app y fallback local donde aplica.

## Requisitos

- Node.js 20 LTS o superior.
- pnpm 9.15.0.

Instalacion recomendada:

```powershell
corepack enable
corepack prepare pnpm@9.15.0 --activate
pnpm install
```

## Comandos desde la raiz

```powershell
pnpm dev
pnpm build
pnpm lint
pnpm type-check
```

Tambien puedes ejecutar una app puntual con filtros:

```powershell
pnpm --filter portfolio dev
pnpm --filter ai-shop-assistant dev
pnpm --filter @workspace/restaurant dev
```

## Estructura

```text
Proyecto Portafolio/
├── apps/
│   ├── portfolio/           # Portafolio personal (repo anidado)
│   ├── ai-shop-assistant/   # Demo IA de compras (repo anidado)
│   └── restaurant/          # RestaurantBot Express + SQLite
├── packages/
│   └── ui/                  # Utilidades UI compartidas
├── package.json             # Scripts del workspace
├── pnpm-workspace.yaml      # Apps y packages incluidos
├── pnpm-lock.yaml           # Lockfile unico del monorepo
├── turbo.json               # Pipeline de tareas
└── tsconfig.json            # Configuracion TypeScript base
```

## Notas de arquitectura

- La raiz documenta y orquesta el workspace completo. La documentacion especifica de cada producto vive dentro de su app.
- `apps/portfolio` y `apps/ai-shop-assistant` tienen su propio historial Git; por eso el repo raiz los ve como gitlinks.
- El lockfile principal del workspace es `pnpm-lock.yaml`. Evita agregar nuevos `package-lock.json` al monorepo.
- `packages/ui` debe mantenerse pequeno y solo recibir codigo realmente compartido por mas de una app.

## Documentacion por app

- [Portfolio](./apps/portfolio/README.md)
- [AI Shop Assistant](./apps/ai-shop-assistant/README.md)
- [RestaurantBot](./apps/restaurant/README.md)
- [RestaurantBot API](./apps/restaurant/docs/API.md)
- [RestaurantBot despliegue](./apps/restaurant/docs/DEPLOYMENT.md)
- [RestaurantBot flujos](./apps/restaurant/docs/FLOWS.md)
