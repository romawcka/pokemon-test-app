import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export interface FavoritesStore {
  getFavorites(): Promise<number[]>;
  addFavorite(id: number): Promise<number[]>;
  removeFavorite(id: number): Promise<number[]>;
}

export function createFileFavoritesStore(filePath: string): FavoritesStore {
  // Serializes reads/writes through one promise chain so concurrent
  // add/remove requests can't interleave and corrupt the JSON file.
  let queue: Promise<unknown> = Promise.resolve();
  function enqueue<T>(task: () => Promise<T>): Promise<T> {
    const result = queue.then(task);
    queue = result.catch(() => undefined);
    return result;
  }

  async function readIds(): Promise<number[]> {
    try {
      const contents = await readFile(filePath, "utf-8");
      return JSON.parse(contents) as number[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw error;
    }
  }

  async function writeIds(ids: number[]): Promise<void> {
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, JSON.stringify(ids, null, 2), "utf-8");
  }

  return {
    getFavorites: () => enqueue(readIds),
    addFavorite: (id: number) =>
      enqueue(async () => {
        const ids = await readIds();
        if (!ids.includes(id)) ids.push(id);
        await writeIds(ids);
        return ids;
      }),
    removeFavorite: (id: number) =>
      enqueue(async () => {
        const ids = (await readIds()).filter((existing) => existing !== id);
        await writeIds(ids);
        return ids;
      }),
  };
}
