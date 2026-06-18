import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createFileFavoritesStore, type FavoritesStore } from "./store.js";

describe("createFileFavoritesStore", () => {
  let dir: string;
  let store: FavoritesStore;

  beforeEach(async () => {
    dir = await mkdtemp(path.join(os.tmpdir(), "favorites-test-"));
    store = createFileFavoritesStore(path.join(dir, "favorites.json"));
  });

  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });

  it("starts empty when no file exists yet", async () => {
    expect(await store.getFavorites()).toEqual([]);
  });

  it("adds favorites without duplicating", async () => {
    await store.addFavorite(1);
    await store.addFavorite(2);
    await store.addFavorite(1);

    expect(await store.getFavorites()).toEqual([1, 2]);
  });

  it("removes a favorite", async () => {
    await store.addFavorite(1);
    await store.addFavorite(2);
    await store.removeFavorite(1);

    expect(await store.getFavorites()).toEqual([2]);
  });

  it("serializes concurrent writes without losing updates", async () => {
    await Promise.all([
      store.addFavorite(1),
      store.addFavorite(2),
      store.addFavorite(3),
    ]);

    expect((await store.getFavorites()).toSorted()).toEqual([1, 2, 3]);
  });
});
