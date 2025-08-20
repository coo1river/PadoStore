import { useEffect, useState } from "react";
import useChatStore from "@/store/useChatStore";
import { useQuery } from "@tanstack/react-query";
import {
  ChatDetailReq,
  ChatRes,
  ChatRoomInfoRes,
} from "@/types/chat/chat.types";
import chatDetailApi from "@/api/chat/chatDetailApi";
import createChatApi from "@/api/chat/createChatApi";

export const useChatRoomData = (receiver?: string | string[]) => {
  const [createData, setCreateData] = useState<ChatRes | null>(null);
  const { setChatRoomId } = useChatStore();

  // 채팅방 생성
  useEffect(() => {
    if (!receiver) return;
    const create = async () => {
      try {
        const res = await createChatApi(receiver);
        setCreateData(res);
        setChatRoomId(res.chat_room_id);
      } catch (error) {
        console.error("채팅방 생성에 실패했습니다.", error);
      }
    };

    if (receiver) {
      create();
    }
  }, [receiver, setChatRoomId]);

  const { data: detailData } = useQuery<ChatRoomInfoRes>({
    queryKey: createData ? ["chatDetails", createData.chat_room_id] : [],
    queryFn: async () => {
      if (!createData) {
        throw new Error("채팅방이 생성되지 않았습니다.");
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

  return {
    createData,
    detailData: detailData ?? null,
  };
};
