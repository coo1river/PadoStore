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
      token: sessionStorage.getItem("userToken") || null,
      authState: !!sessionStorage.getItem("userToken"),
      setToken: (newToken) => {
        set({ token: newToken });
        set({ authState: !!newToken });
        if (newToken) {
          sessionStorage.setItem("userToken", newToken);
        } else {
          sessionStorage.removeItem("userToken");
        }
      },
      setAuthState: (value) => set({ authState: value }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      serialize: (state) => JSON.stringify(state),
      deserialize: (str) => JSON.parse(str),
    }
  )
);

export default useAuthStore;
