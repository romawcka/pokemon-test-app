# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack
Full-stack web app in a Turborepo + pnpm monorepo.
Frontend: React + TypeScript (Vite). Backend: Node.js + TypeScript (Express).

## Status

Core build complete: `packages/shared`, `apps/api`, and `apps/web` are all
scaffolded, wired together, and passing `turbo run check-types lint build
test` from the repo root. `packages/ui` was never created — apps/web's
components live in `apps/web/src/components` directly.

## Structure

- `apps/web` — React frontend (Vite)
- `apps/api` — Node backend (Express)
- `packages/shared` — types/contracts shared by web & api (single source of truth)
- `packages/eslint-config` — shared ESLint flat config
- `packages/typescript-config` — shared tsconfig presets


## Assignment

Full requirements live in `.claude/docs/PRD.md` — read that, not the PDF in
the same folder, for the spec (frontend/backend requirements, bonus points,
submission requirements). Key decisions already locked in for this repo:
TanStack Query for frontend server state, Tailwind for styling, a modal
overlay (no router) for Pokémon detail, and file-based JSON for favorites
persistence on the backend.

## Architectural intent

- Two deployable units: a React frontend and a Node.js backend, talking over
  HTTP. The backend is the only thing that calls PokeAPI directly — the
  frontend never calls PokeAPI itself, it calls the backend's proxy routes.
- Favorites are backend state, not frontend state — the frontend's "favorite"
  UI always round-trips through the backend's add/remove/list endpoints
  rather than toggling local-only state.

## Commands

Run from the repo root (pnpm + turbo drive every package):

- `pnpm install` — install all workspace dependencies.
- `pnpm dev` — run `apps/api` (port 4000) and `apps/web` (port 5173) together via `turbo dev`.
- `pnpm build` — build all packages (`turbo build`).
- `pnpm lint` / `pnpm check-types` / `pnpm test` — run across the whole workspace.
- Scope any of the above to one package: `pnpm --filter @pokemon/api <script>` / `pnpm --filter @pokemon/web <script>`.
- Single test file in apps/api: `pnpm --filter @pokemon/api exec vitest run src/favorites/store.test.ts`.
