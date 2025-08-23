import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { ChatDetailReq, ChatDetailRes } from "@/types/chat/chat.types";
import chatDetailApi from "@/api/chat/chatDetailApi";

export const useChatQuery = (chatRoomId?: number) => {
  return useInfiniteQuery<
    ChatDetailRes,
    unknown,
    InfiniteData<ChatDetailRes>,
    [string, number],
    number
  >({
    queryKey: ["chatMessages", chatRoomId ?? 0],
    queryFn: async ({ pageParam = 1 }) => {
      const chatParam: ChatDetailReq = {
        chat_room_id: chatRoomId!,
        limit: 15,
        current_page: pageParam,
      };
      const res = await chatDetailApi(chatParam);
      return res;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.chat.length === 0 ? undefined : allPages.length + 1;
    },
    enabled: !!chatRoomId,
  });
};
