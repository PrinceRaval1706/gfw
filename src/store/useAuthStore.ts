import { create } from "zustand";
import { getSession, logout as doLogout } from "../services/auth";

type SessionUser = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
};

type State = {
  user: SessionUser | null;
  hydrate: () => void;
  setUser: (u: SessionUser | null) => void;
  logout: () => void;
};

export const useAuthStore = create<State>((set) => ({
  user: null,
  hydrate: () => set({ user: getSession() }),
  setUser: (u) => set({ user: u }),
  logout: () => {
    doLogout();
    set({ user: null });
  },
}));