import os from "node:os";
import path from "node:path";
import { createFileFavoritesStore } from "./store.js";

const DATA_DIR = process.env.VERCEL
  ? path.join(os.tmpdir(), "pokemon-test-app")
  : path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "favorites.json");

export const favoritesStore = createFileFavoritesStore(DATA_FILE);
