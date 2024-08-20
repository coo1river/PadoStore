import { create } from "zustand";
import { ChatRoomRes } from "@/api/chat/chatEnterApi";

interface ChatEnterState {
  enterData: ChatRoomRes | null;
  setEnterData: (data: ChatRoomRes | null) => void;
}

const useChatEnterStore = create<ChatEnterState>((set) => ({
  enterData: null,
  setEnterData: (data) => set({ enterData: data }),
}));

export default useChatEnterStore;
