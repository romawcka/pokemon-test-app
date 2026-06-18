import path from "node:path";
import { createFileFavoritesStore } from "./store.js";

const DATA_FILE = path.join(process.cwd(), "data", "favorites.json");

export const favoritesStore = createFileFavoritesStore(DATA_FILE);
