import { useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import chatEnterApi from "@/api/chat/chatEnterApi";
import { ChatRes, ChatRoomRes } from "@/types/chat/chat.types";
import { useChatSubscription } from "./useChatSubscription";
import { useChatSender } from "./useMessageSender";
import { useStompConnect } from "./useStompConnect";
import { useUserId } from "@/hooks/common/useUserId";
import useAuthStore from "@/store/useAuthStore";

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
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const createDataRef = useRef(createData);
  const userId = useUserId();

  const getChatKey = (roomId: number) => ["chatMessages", roomId];

  useEffect(() => {
    createDataRef.current = createData;
  }, [createData]);

  // STOMP 연결 성공 시 입장 및 구독
  const handleConnect = useCallback(async () => {
    if (client.current?.active || client.current?.connected) {
      console.log("STOMP 이미 연결된 상태입니다.");
      return;
    }

    if (!createDataRef.current) return;

    if (!enterDataRef.current) {
      const enterRes = await chatEnterApi(createDataRef.current.chat_room_id);
      enterDataRef.current = enterRes;
      setEnterData(enterRes);
      await chatDetails();
    }

    subscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatDetails, setEnterData]);

  // STOMP 연결 훅 사용
  const client = useStompConnect({
    brokerURL: "wss://api-pado.info/connect",
    token,
    onConnect: handleConnect,
    onStompError: (error) => console.error("STOMP 오류 :", error),
  });

  // 채팅 구독 훅 사용
  const { subscribe } = useChatSubscription({
    client,
    createData,
    setEnterData,
    enterDataRef,
    queryClient,
    getChatKey,
    token,
  });

  // 메시지 전송 훅 사용
  const { publish } = useChatSender({
    client,
    createData,
    token,
    userId,
  });

  return { client, publish };
};
