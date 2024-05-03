import { useEffect } from "react";
import { create } from "zustand";

interface AuthStore {
  token: string | null;
  authState: boolean;
  setToken: (newToken: string | null) => void;
  setAuthState: (value: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => {
  // sessionStorage에서 userToken 값 가져오기

  let storedToken: string | null = null;

  useEffect(() => {
    // Perform localStorage action
    storedToken = sessionStorage.getItem("key");
  }, []);

  return {
    token: storedToken,
    // sessionStorage에 userToken 값이 있는 경우 true로 설정
    authState: !!storedToken,
    setToken: (newToken) => set({ token: newToken }),
    setAuthState: (value) => set({ authState: value }),
  };
});
export default useAuthStore;
