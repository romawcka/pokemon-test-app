import type { FavoriteRef } from "@pokemon/shared";
import { Router } from "express";
import { favoritesStore } from "../favorites/index.js";
import { HttpError } from "../errors.js";

export const favoritesRouter = Router();

function toRefs(ids: number[]): FavoriteRef[] {
  return ids.map((id) => ({ id }));
}

favoritesRouter.get("/", async (_req, res, next) => {
  try {
    res.json(toRefs(await favoritesStore.getFavorites()));
  } catch (error) {
    next(error);
  }
});

favoritesRouter.post("/", async (req, res, next) => {
  const { id } = req.body as { id?: unknown };
  if (typeof id !== "number" || !Number.isInteger(id) || id <= 0) {
    next(new HttpError(400, "id must be a positive integer"));
    return;
  }
  try {
    res.status(201).json(toRefs(await favoritesStore.addFavorite(id)));
  } catch (error) {
    next(error);
  }
});

favoritesRouter.delete("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    next(new HttpError(400, "id must be a positive integer"));
    return;
  }
  try {
    res.json(toRefs(await favoritesStore.removeFavorite(id)));
  } catch (error) {
    next(error);
  }
});
