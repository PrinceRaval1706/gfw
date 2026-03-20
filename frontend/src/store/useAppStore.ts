import { create } from "zustand";

type State = {
  favoriteShopIds: string[];
  toggleFavoriteShop: (id: string) => void;
};

const KEY = "favoriteShopIds";

function loadFavorites(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export const useAppStore = create<State>((set, get) => ({
  favoriteShopIds: loadFavorites(),

  toggleFavoriteShop: (id) => {
    const current = get().favoriteShopIds;
    const next = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];

    set({ favoriteShopIds: next });
    localStorage.setItem(KEY, JSON.stringify(next));
  },
}));