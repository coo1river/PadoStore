import { create } from "zustand";

interface User {
  email: string;
  password: string;
  username: string;
}

interface AuthStore {
  user: User;
  updateUser: (updatedUser: User) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: {
    email: "",
    password: "",
    username: "",
  },
  updateUser: (updatedUser) => set({ user: { ...updatedUser } }),
}));

export default useAuthStore;
