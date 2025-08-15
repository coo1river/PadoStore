import { useCallback } from "react";
import * as StompJs from "@stomp/stompjs";
import { ChatDetailRes, ChatRes, Message } from "@/types/chat/chat.types";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";

interface UseChatSenderProps {
  client: React.MutableRefObject<StompJs.Client | null>;
  createData: ChatRes | null;
  token: string | null;
  userId: string;
}

export const useChatSender = ({
  client,
  createData,
  token,
  userId,
}: UseChatSenderProps) => {
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

      queryClient.setQueryData<InfiniteData<ChatDetailRes>>(
        ["chatMessages", createData.chat_room_id],
        (oldData) => {
          if (!oldData) {
            return undefined;
          }

          const updatedPages = oldData.pages.map((page, index) => {
            if (index === 0) {
              return {
                ...page,
                chat: [newMessage, ...page.chat],
              };
            }
            return page;
          });

          return {
            ...oldData,
            pages: updatedPages,
          };
        }
      );
    },
    [client, createData, token, queryClient, userId]
  );

  return { publish };
};
