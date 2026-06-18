# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack
Full-stack web app in a Turborepo + pnpm monorepo.
Frontend: React + TypeScript (Vite). Backend: Node.js + TypeScript (Express).

## Status

Scaffolding in progress per the build plan. Update this file's Commands
section with real install/dev/build/test/lint commands as soon as the
workspace's `package.json` files exist.

## Structure

- `apps/web` — React frontend (Vite)
- `apps/api` — Node backend (Express)
- `packages/shared` — types/contracts shared by web & api (single source of truth)
- `packages/ui` — shared React components
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

Not yet established — no `package.json` exists in this repo. Once the
frontend/backend are scaffolded, replace this section with the actual
install/dev/build/test/lint commands for each package.
