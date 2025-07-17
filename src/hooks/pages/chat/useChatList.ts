import { useQuery } from "@tanstack/react-query";
import chatListApi, { ListRes } from "@/api/chat/chatListApi";

export const useChatList = () => {
  return useQuery<ListRes>({
    queryKey: ["chatList"],
    queryFn: chatListApi,
    staleTime: 1000 * 10,
    refetchOnWindowFocus: false,
  });
};
