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
  getChatKey: (roomId: number) => (string | number)[];
  token: string | null;
  queryClient: QueryClient;
}

export const useChatSubscription = ({
  client,
  createData,
  setEnterData,
  enterDataRef,
  queryClient,
  getChatKey,
  token,
}: UseChatSubscriptionProps) => {
  const handleReceive = useCallback(
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
        getChatKey(createData.chat_room_id),
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
    [createData, queryClient, setEnterData, enterDataRef, getChatKey]
  );

  const subscribe = useCallback(() => {
    if (!client.current?.connected || !createData || !token) return;

    client.current.subscribe(
      `/sub/chat/${createData.chat_room_id}`,
      handleReceive,
      {
        Authorization: token,
      }
    );
  }, [client, handleReceive, token, createData]);

  return { subscribe };
};
