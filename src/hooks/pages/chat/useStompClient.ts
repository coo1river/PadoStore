import { useEffect, useRef, useCallback } from "react";
import * as StompJs from "@stomp/stompjs";
import chatEnterApi from "@/api/chat/chatEnterApi";
import chatUserInfoApi from "@/api/chat/chatUserInfoApi";
import { useQueryClient } from "@tanstack/react-query";
import { ChatRes, ChatRoomRes, Message } from "@/types/chat/chat.types";

interface UseStompClientProps {
  createData: ChatRes | null;
  setEnterData: React.Dispatch<React.SetStateAction<ChatRoomRes | null>>;
  chatDetails: () => Promise<void>;
  enterDataRef: React.MutableRefObject<ChatRoomRes | null>;
}

export const useStompClient = ({
  createData,
  setEnterData,
  chatDetails,
  enterDataRef,
}: UseStompClientProps) => {
  const client = useRef<StompJs.Client | null>(null);
  const queryClient = useQueryClient();

  const getChatQueryKey = (roomId: number) => ["chatMessages", roomId];

  // STOMP 구독 함수
  const subscribe = useCallback(() => {
    if (!client.current || !createData) return;

    client.current.subscribe(
      `/sub/chat/${createData.chat_room_id}`,
      async (message) => {
        const receivedMessage: Message = JSON.parse(message.body);
        console.log("STOMP 수신 메시지:", receivedMessage);

        const enterInfo = await chatUserInfoApi(createData.chat_room_id);
        setEnterData(enterInfo);
        enterDataRef.current = enterInfo;

        // React Query 캐시에 메시지 추가
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

            if (isDuplicate) return oldMessages;

            return [...oldMessages, receivedMessage];
          }
        );
      },
      {
        Authorization: sessionStorage.getItem("userToken")!,
      }
    );
  }, [createData, queryClient, setEnterData, enterDataRef]);

  // STOMP 클라이언트 초기화 및 연결
  useEffect(() => {
    if (!createData) return;

    const clientInstance = new StompJs.Client({
      brokerURL: "wss://api-pado.info/connect",
      connectHeaders: {
        Authorization: sessionStorage.getItem("userToken")!,
      },
      reconnectDelay: 5000,
      onConnect: async () => {
        console.log("STOMP 연결 성공");

        // 첫 진입 시 채팅방 입장 처리
        if (!enterDataRef.current) {
          const enterRes = await chatEnterApi(createData.chat_room_id);
          enterDataRef.current = enterRes;
          setEnterData(enterRes);

          await chatDetails();
        }

        subscribe();
      },
      onStompError: (error) => {
        console.error("STOMP 오류", error);
      },
    });

    client.current = clientInstance;
    clientInstance.activate();

    return () => {
      clientInstance.deactivate();
      client.current = null;
    };
  }, [createData, chatDetails, setEnterData, enterDataRef, subscribe]);

  // 메시지 전송 함수
  const publish = useCallback(
    (message: string) => {
      if (client.current && client.current.connected && createData) {
        client.current.publish({
          destination: "/pub/chat",
          headers: {
            Authorization: sessionStorage.getItem("userToken")!,
          },
          body: JSON.stringify({
            chat_room_id: createData.chat_room_id,
            message,
          }),
        });
      } else {
        console.error("STOMP 연결되지 않음.");
      }
    },
    [createData]
  );

  return { client, publish };
};
