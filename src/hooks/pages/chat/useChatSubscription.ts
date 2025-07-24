import { useCallback } from "react";
import * as StompJs from "@stomp/stompjs";
import chatUserInfoApi from "@/api/chat/chatUserInfoApi";
import { ChatRes, ChatRoomRes, Message } from "@/types/chat/chat.types";
import { QueryClient } from "@tanstack/react-query";

interface UseChatSubscriptionProps {
  client: React.MutableRefObject<StompJs.Client | null>;
  createData: ChatRes | null;
  setEnterData: React.Dispatch<React.SetStateAction<ChatRoomRes | null>>;
  enterDataRef: React.MutableRefObject<ChatRoomRes | null>;
  getChatQueryKey: (roomId: number) => (string | number)[];
  token: string | null;
  queryClient: QueryClient;
}

export const useChatSubscription = ({
  client,
  createData,
  setEnterData,
  enterDataRef,
  queryClient,
  getChatQueryKey,
  token,
}: UseChatSubscriptionProps) => {
  const handleReceiveMessage = useCallback(
    async (message: StompJs.IMessage) => {
      if (!createData) return;
      const receivedMessage: Message = JSON.parse(message.body);
      console.log("STOMP 수신 메시지:", receivedMessage);

      try {
        const enterInfo = await chatUserInfoApi(createData.chat_room_id);
        setEnterData(enterInfo);
        enterDataRef.current = enterInfo;
      } catch (error) {
        console.error("채팅방 사용자 정보 불러오기 실패:", error);
      }

      queryClient.setQueryData<Message[]>(
        getChatQueryKey(createData.chat_room_id),
        (oldMessages = []) => {
          const isDuplicate = oldMessages.some(
            (m) =>
              m.chat_id === receivedMessage.chat_id ||
              (m.message === receivedMessage.message &&
                m.sender_id === receivedMessage.sender_id &&
                m.insert_dt === receivedMessage.insert_dt)
          );

          return isDuplicate ? oldMessages : [...oldMessages, receivedMessage];
        }
      );
    },
    [createData, queryClient, setEnterData, enterDataRef, getChatQueryKey]
  );

  const subscribe = useCallback(() => {
    if (!client.current || !client.current.connected || !createData || !token) {
      console.warn(
        "클라이언트가 연결되지 않았거나, 채팅 데이터 또는 토큰이 없습니다."
      );
      return;
    }

    client.current.subscribe(
      `/sub/chat/${createData.chat_room_id}`,
      handleReceiveMessage,
      {
        Authorization: token,
      }
    );
  }, [client, createData, handleReceiveMessage, token]);

  return { subscribe, handleReceiveMessage };
};
