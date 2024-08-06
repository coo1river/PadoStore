import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  authState: boolean;
  setToken: (newToken: string | null) => void;
  setAuthState: (value: boolean) => void;
}

// 세션 스토리지에서 초기 상태를 가져와 로컬 변수에 저장
const initialState = JSON.parse(sessionStorage.getItem("auth-storage") || "{}");

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      token: initialState.token ?? null,
      authState: !!initialState.token,
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
