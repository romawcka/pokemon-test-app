import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import { favoritesRouter } from "./routes/favorites.js";
import { pokemonRouter } from "./routes/pokemon.js";

const DEFAULT_ALLOWED_ORIGINS = new Set([
  "http://localhost:5173",
  "http://127.0.0.1:5173",
]);

function getConfiguredOrigins(): Set<string> {
  const origins = `${process.env.WEB_ORIGIN ?? ""},${
    process.env.WEB_ORIGINS ?? ""
  }`
    .split(",")
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  return new Set(origins);
}

function isAllowedOrigin(origin: string | undefined): boolean {
  if (!origin) return true;
  if (DEFAULT_ALLOWED_ORIGINS.has(origin)) return true;
  if (getConfiguredOrigins().has(origin)) return true;

  try {
    const { hostname } = new URL(origin);
    return hostname === "vercel.app" || hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: (origin, callback) => {
        callback(null, isAllowedOrigin(origin));
      },
    }),
  );
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.redirect(302, "/api/pokemon");
  });

  app.use("/api/pokemon", pokemonRouter);
  app.use("/api/favorites", favoritesRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use(errorHandler);

  return app;
}

const app = createApp();

export default app;
