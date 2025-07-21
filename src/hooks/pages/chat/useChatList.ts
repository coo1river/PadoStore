import { useQuery } from "@tanstack/react-query";
import { ChatListRes } from "@/types/chat/chat.types";
import chatListApi from "@/api/chat/chatListApi";

export const useChatList = () => {
  return useQuery<ChatListRes>({
    queryKey: ["chatList"],
    queryFn: chatListApi,
    staleTime: 1000 * 10,
    refetchOnWindowFocus: false,
  });
};
