# Ronal Angulo — Portfolio

A personal developer portfolio for Ronal Angulo, featuring project showcases, skills, experience timeline, and an integrated AI chatbot assistant.

## Run & Operate

- `pnpm --filter @workspace/portfolio run dev` — run the portfolio frontend (Vite)
- `pnpm --filter @workspace/api-server run dev` — run the API server (handles `/api/chat` for the chatbot)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- Optional env: `OPENAI_API_KEY` — enables GPT-4o-mini for the chatbot; falls back to local keyword matching if not set

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19 + Vite + Tailwind CSS v4 + Framer Motion
- API: Express 5 with AI SDK (openai/ai)
- Theme: Purple/cyan gradient, dark mode default, next-themes

## Where things live

- `artifacts/portfolio/` — Vite + React frontend artifact (previewPath: `/`)
- `artifacts/api-server/` — Express backend (previewPath: `/api`)
- `artifacts/portfolio/src/components/sections/` — hero, about, projects, skills, experience, contact
- `artifacts/portfolio/src/components/chatbot.tsx` — AI portfolio chatbot
- `artifacts/portfolio/src/lib/data.ts` — all portfolio content (projects, skills, timeline, personal info)
- `artifacts/api-server/src/routes/chat.ts` — POST `/chat` → streaming AI chatbot route
- `.migration-backup/` — original Next.js source (safe to keep as reference)

## Architecture decisions

- Chatbot calls `${BASE_URL}api/chat` (not hardcoded `/api/chat`) to work with Replit's path-based routing
- Chat route falls back to local keyword matching when `OPENAI_API_KEY` is not set — works 100% without a key
- `next/link` → plain `<a>` tags (single-page portfolio, no routing needed)
- `next/image` → `<img>` tags (Unsplash URLs work fine without Next.js image optimization)
- `"use client"` directives removed (not needed in Vite)

## Product

A dark-mode developer portfolio showcasing Ronal Angulo's work as a Full Stack developer. Includes animated sections (Hero, About, Projects, Skills, Experience, Contact) and an AI chatbot that answers questions about Ronal's skills and experience.

## User preferences

- This Replit is connected to `origin = https://github.com/RonalMZ/Portafolio` — only portfolio code here
- The `restaurant` and `ai-shop-assistant` projects are separate repos/Replits, do NOT add their code here

## Gotchas

- `pnpm dev` at root has no script — run artifact-specific dev commands
- Always restart both api-server and portfolio workflows after code changes
- The `OPENAI_API_KEY` secret is optional — chatbot works in fallback mode without it

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
