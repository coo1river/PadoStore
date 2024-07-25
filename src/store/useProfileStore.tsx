import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProfileState {
  listMenu: string;
  setListMenu: (menu: string) => void;
}

const useProfileStore = create(
  persist<ProfileState>(
    (set) => ({
      listMenu: "mySales", // 기본값 설정
      setListMenu: (menu) => set({ listMenu: menu }),
    }),
    {
      name: "profile-storage",
      storage: createJSONStorage(() => sessionStorage), // 세션 스토리지 사용
    }
  )
);

export default useProfileStore;
