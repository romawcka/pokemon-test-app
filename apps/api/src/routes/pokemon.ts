import { POKEMON_LIST_LIMIT } from "@pokemon/shared";
import { Router } from "express";
import { HttpError } from "../errors.js";
import { getAllPokemonSummaries, getPokemonDetail } from "../pokeapi/service.js";

export const pokemonRouter = Router();

pokemonRouter.get("/", async (_req, res, next) => {
  try {
    const summaries = await getAllPokemonSummaries(POKEMON_LIST_LIMIT);
    res.json(summaries);
  } catch (error) {
    next(error);
  }
});

pokemonRouter.get("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    next(new HttpError(400, "id must be a positive integer"));
    return;
  }
  try {
    const detail = await getPokemonDetail(id);
    res.json(detail);
  } catch (error) {
    next(error);
  }
});
