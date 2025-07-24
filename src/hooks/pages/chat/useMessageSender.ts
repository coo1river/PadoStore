import { useCallback } from "react";
import * as StompJs from "@stomp/stompjs";
import { ChatRes, Message } from "@/types/chat/chat.types";
import { useQueryClient } from "@tanstack/react-query";

interface UseChatMessageSenderProps {
  client: React.MutableRefObject<StompJs.Client | null>;
  createData: ChatRes | null;
  token: string | null;
  userId: string;
}

export const useChatMessageSender = ({
  client,
  createData,
  token,
  userId,
}: UseChatMessageSenderProps) => {
  const queryClient = useQueryClient();

  const publish = useCallback(
    (message: string) => {
      if (!client.current || !createData || !token) {
        console.error("STOMP가 연결되지 않거나 토큰이 없습니다.");
        return;
      }

      client.current.publish({
        destination: "/pub/chat",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({
          chat_room_id: createData.chat_room_id,
          message,
        }),
      });

      const newMessage: Message = {
        chat_id: Date.now(),
        sender_id: userId,
        message,
        insert_dt: new Date().toISOString(),
        read_status: "false",
        chat_room_id: createData.chat_room_id,
      };

      queryClient.setQueryData<Message[]>(
        ["chatMessages", createData.chat_room_id],
        (oldMessages = []) => [...oldMessages, newMessage]
      );
    },
    [client, createData, token, queryClient, userId]
  );

  return { publish };
};
