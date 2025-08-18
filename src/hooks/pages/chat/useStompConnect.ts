import { useRef, useEffect } from "react";
import * as StompJs from "@stomp/stompjs";

interface UseStompConnectProps {
  brokerURL: string;
  token: string | null;
  reconnectDelay?: number;
  onConnect?: (client: StompJs.Client) => void;
  onStompError?: (error: StompJs.StompHeaders | StompJs.Frame) => void;
}

export const useStompConnect = ({
  brokerURL,
  token,
  reconnectDelay = 5000,
  onConnect,
  onStompError,
}: UseStompConnectProps) => {
  const client = useRef<StompJs.Client | null>(null);

  useEffect(() => {
    if (!token) {
      console.warn("STOMP 연결을 위한 토큰이 없습니다.");
      return;
    }

    if (client.current?.active || client.current?.connected) {
      console.log("이미 STOMP가 활성화 상태입니다.");
      return;
    }

    const connectHeaders = { Authorization: token };
    const clientInstance = new StompJs.Client({
      brokerURL,
      connectHeaders,
      reconnectDelay,
      onConnect: () => {
        console.log("STOMP 연결 성공");
        if (onConnect) {
          onConnect(clientInstance);
        }
      },
      onStompError: (error) => {
        console.error("STOMP 에러", error);
        if (onStompError) {
          onStompError(error);
        }
      },
      onDisconnect: () => {
        console.log("STOMP 연결 해제");
      },
    });

    client.current = clientInstance;
    clientInstance.activate();

    return () => {
      if (clientInstance.connected) {
        clientInstance.deactivate();
      }
    };
  }, [token, brokerURL, onConnect, onStompError, reconnectDelay]);

  return client;
};
