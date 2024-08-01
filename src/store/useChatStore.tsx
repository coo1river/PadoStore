import { create } from "zustand";

interface ChatStore {
  refresh: boolean;
  refreshChatList: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
  refresh: false,
  refreshChatList: () =>
    set((state) => ({
      refresh: !state.refresh,
    })),
}));

export default useChatStore;
