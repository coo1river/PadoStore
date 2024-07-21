import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  authState: boolean;
  setToken: (newToken: string | null) => void;
  setAuthState: (value: boolean) => void;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: null,
      authState: false,
      setToken: (newToken) => {
        set({ token: newToken });
        set({ authState: !!newToken });
      },
      setAuthState: (value) => set({ authState: value }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
