import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";
import { favoritesRouter } from "./routes/favorites.js";
import { pokemonRouter } from "./routes/pokemon.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.WEB_ORIGIN ?? "http://localhost:5173" }));
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
