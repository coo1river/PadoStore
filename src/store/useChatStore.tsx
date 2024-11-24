import { create } from "zustand";

interface ChatStore {
  refresh: boolean;
  chatRoomId: number | null;
  setChatRoomId: (chatRoomId: number | null) => void;
  refreshChatList: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
  refresh: false,
  chatRoomId: null,
  setChatRoomId: (chatRoomId) => set({ chatRoomId }),
  refreshChatList: () =>
    set((state) => ({
      refresh: !state.refresh,
    })),
}));

export default useChatStore;
