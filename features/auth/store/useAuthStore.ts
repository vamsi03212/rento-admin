import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  phoneNumber?: string;
  area?: string;
  city?: string;
  country?: string;
  email?: string;
  upload_document?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (user, token) => {
        set({ user, token });
      },

      logout: () => {
        set({ user: null, token: null });
      },

      updateUser: (updatedUser) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, ...updatedUser }
            : (updatedUser as User),
        })),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => ({
        getItem: async (name: string) => {
          const value = await SecureStore.getItemAsync(name);
          return value ?? null;
        },
        setItem: async (name: string, value: string) => {
          await SecureStore.setItemAsync(name, value);
        },
        removeItem: async (name: string) => {
          await SecureStore.deleteItemAsync(name);
        },
      })),
    }
  )
);
