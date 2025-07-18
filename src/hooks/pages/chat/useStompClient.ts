import { useEffect, useRef, useCallback } from "react";
import * as StompJs from "@stomp/stompjs";
import chatEnterApi from "@/api/chat/chatEnterApi";
import chatUserInfoApi from "@/api/chat/chatUserInfoApi";
import { ChatRes } from "@/api/chat/createChatApi";
import { ChatRoomRes } from "@/api/chat/chatEnterApi";

interface UseStompClientProps {
  createData: ChatRes | null;
  setEnterData: React.Dispatch<React.SetStateAction<ChatRoomRes | null>>;
  setChatList: React.Dispatch<React.SetStateAction<Message[]>>;
  chatDetails: () => Promise<void>;
  enterDataRef: React.MutableRefObject<ChatRoomRes | null>;
}

interface Message {
  chat_id: number;
  sender_id: string;
  message: string;
  insert_dt: string;
  chat_room_id: number;
  read_status: string;
}

export const useStompClient = ({
  createData,
  setEnterData,
  setChatList,
  chatDetails,
  enterDataRef,
}: UseStompClientProps) => {
  const client = useRef<StompJs.Client | null>(null);

  // STOMP 구독
  const subscribe = useCallback(() => {
    if (client.current && createData) {
      client.current.subscribe(
        `/sub/chat/${createData.chat_room_id}`,
        async (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("구독 성공", message.body);

          const enterInfo = await chatUserInfoApi(createData.chat_room_id);
          setEnterData(enterInfo);
          enterDataRef.current = enterInfo;

          setChatList((prevChatList) => [
            ...prevChatList,
            { ...receivedMessage },
          ]);
        },
        {
          Authorization: sessionStorage.getItem("userToken")!,
        }
      );
    }
  }, [createData, setChatList, setEnterData, enterDataRef]);

  useEffect(() => {
    if (!createData) return;

    const clientInstance = new StompJs.Client({
      brokerURL: "wss://api-pado.info/connect",
      connectHeaders: {
        Authorization: sessionStorage.getItem("userToken")!,
      },
      onConnect: async () => {
        if (!createData || enterDataRef.current) {
          subscribe();
          return;
        }
        console.log("Connected 성공");

        const enterRes = await chatEnterApi(createData.chat_room_id);
        enterDataRef.current = enterRes;
        setEnterData(enterRes);
        chatDetails();
        subscribe();
      },
      onStompError: (error) => {
        console.error("STOMP error", error);
      },
    });

    client.current = clientInstance;
    clientInstance.activate();

    return () => {
      if (clientInstance) {
        clientInstance.deactivate();
      }
    };
  }, [createData, chatDetails, subscribe, setEnterData, enterDataRef]);

  const publish = useCallback(
    (chats: string) => {
      if (client.current && client.current.connected && createData) {
        client.current.publish({
          destination: "/pub/chat",
          headers: {
            Authorization: sessionStorage.getItem("userToken")!,
          },
          body: JSON.stringify({
            chat_room_id: createData.chat_room_id,
            message: chats,
          }),
        });
      } else {
        console.error("STOMP connection not established.");
      }
    },
    [createData]
  );

  return { client, publish };
};
