import { useEffect, useState, useCallback } from "react";
import useChatStore from "@/store/useChatStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ChatDetailReq,
  ChatRes,
  ChatRoomInfoRes,
  Message,
} from "@/types/chat/chat.types";
import chatDetailApi from "@/api/chat/chatDetailApi";
import createChatApi from "@/api/chat/createChatApi";

interface UseChatRoomDataProps {
  receiver: string | string[];
  initialPage?: number;
}

interface UseChatRoomDataReturn {
  createData: ChatRes | null;
  detailData: ChatRoomInfoRes | null;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchChatDetails: (page: number, chatRoomId: number) => Promise<void>;
}

export const useChatRoomData = ({
  receiver,
  initialPage = 1,
}: UseChatRoomDataProps): UseChatRoomDataReturn => {
  const [createData, setCreateData] = useState<ChatRes | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const { setChatRoomId } = useChatStore();
  const queryClient = useQueryClient();

  const CHAT_DETAILS_QUERY_KEY = (chatRoomId: number) => [
    "chatDetails",
    chatRoomId,
  ];
  const CHAT_MESSAGES_QUERY_KEY = (roomId: number) => ["chatMessages", roomId];

  // 채팅방 생성
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await createChatApi(receiver);
        setCreateData(res);
        setChatRoomId(res.chat_room_id);
      } catch (error) {
        console.error("채팅방 생성에 실패했습니다.", error);
      }
    };

    if (receiver) {
      fetchData();
    }
  }, [receiver, setChatRoomId]);

  const { data: detailData } = useQuery<ChatRoomInfoRes>({
    queryKey: createData ? CHAT_DETAILS_QUERY_KEY(createData.chat_room_id) : [],
    queryFn: async () => {
      if (!createData) {
        throw new Error("Chat room not created yet.");
      }
      const chatParam: ChatDetailReq = {
        chat_room_id: createData.chat_room_id,
        limit: 15,
        current_page: 1,
      };
      const chatDetailsRes = await chatDetailApi(chatParam);
      if (!chatDetailsRes) {
        throw new Error("채팅 상세 정보를 불러오지 못했습니다.");
      }

      queryClient.setQueryData<Message[]>(
        CHAT_MESSAGES_QUERY_KEY(createData.chat_room_id),
        chatDetailsRes.chat.reverse()
      );
      return {
        chat_room_id: chatDetailsRes.chat_room_id,
        product_id: chatDetailsRes.product_id,
        user1: chatDetailsRes.user1,
        user2: chatDetailsRes.user2,
      };
    },
    enabled: !!createData,
    staleTime: Infinity,
  });

  const fetchChatDetails = useCallback(
    async (page: number, chatRoomId: number) => {
      const chatParam: ChatDetailReq = {
        chat_room_id: chatRoomId,
        limit: 15,
        current_page: page,
      };
      try {
        const chatDetailsRes = await chatDetailApi(chatParam);
        if (chatDetailsRes) {
          queryClient.setQueryData<Message[]>(
            CHAT_MESSAGES_QUERY_KEY(chatRoomId),
            (oldMessages = []) => {
              const newMessages = chatDetailsRes.chat.reverse();
              const combinedMessages = [...newMessages, ...oldMessages];

              const uniqueMessagesMap = new Map<number | string, Message>();
              for (const msg of combinedMessages) {
                const key = `${msg.chat_id}-${msg.insert_dt}`;
                uniqueMessagesMap.set(key, msg);
              }

              return Array.from(uniqueMessagesMap.values()).sort(
                (a, b) =>
                  new Date(a.insert_dt).getTime() -
                  new Date(b.insert_dt).getTime()
              );
            }
          );
        }
      } catch (error) {
        console.error(
          "채팅 상세 정보를 불러오는 중 오류가 발생했습니다.",
          error
        );
      }
    },
    [queryClient]
  );

  return {
    createData,
    detailData: detailData ?? null,
    currentPage,
    setCurrentPage,
    fetchChatDetails,
  };
};
