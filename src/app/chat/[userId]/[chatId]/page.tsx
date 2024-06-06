"use client";
import { ChatInputWrap, ChatRoom, ChatRoomWrap } from "@/styles/chatStyle";
import React, {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "next/navigation";
import IconSend from "@/../public/assets/svgs/free-icon-font-paper-plane.svg";
import * as StompJs from "@stomp/stompjs";
import createChatApi, { ChatRes } from "@/api/chat/createChatApi";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import useInput from "@/hooks/useInput";
import chatDetailApi, { ChatDetail } from "@/api/chat/chatDetailApi";

interface Message {
  chat_id: number;
  sender_id: string;
  message: string;
  insert_dt: string | null;
  chat_room_id: number;
}

export default function UserChat() {
  // useParams 사용하여 URL 매개변수 가져오기
  const params = useParams();
  const receiver = params.chatId;

  const [chatList, setChatList] = useState<Message[]>([]);
  const chat = useInput("");

  // 채팅 리스트 데이터 값 담는 useState
  const [createData, setCreateData] = useState<ChatRes | null>(null);

  // 채팅 상세 데이터 값 담는 useState
  const [detailData, setDetailData] = useState<ChatDetail | null>(null);

  const client = useRef<StompJs.Client | null>(null);

  // 채팅 연결 및 구독 설정
  useEffect(() => {
    // 채팅방 생성
    const fetchData = async () => {
      const createData = await createChatApi(receiver);
      setCreateData(createData);

      if (createData) {
        // 채팅 상세에 보낼 쿼리 파라미터 값
        const chatParam = {
          chat_room_id: createData.chat_room_id,
          limit: 13,
          current_page: 1,
        };
        // 채팅방 상세
        const chatDetails = await chatDetailApi(chatParam);
        setDetailData(chatDetails);
      }
    };
    fetchData();

    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8080/connect",
      connectHeaders: {
        Authorization: sessionStorage.getItem("userToken")!,
      },
      onConnect: () => {
        console.log("Connected 성공");
        subscribe();
      },
      onStompError: (error) => {
        console.error("STOMP error", error);
      },
    });

    client.current.activate();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  // 구독 설정
  const subscribe = () => {
    if (client.current && createData) {
      client.current.subscribe(
        `/sub/chat/${createData.chat_room_id}`,
        (message) => {
          console.log("구독 성공", message.body);
          const json_body = JSON.parse(message.body);
          setChatList((prevChatList) => [...prevChatList, json_body]);
        },
        {
          Authorization: sessionStorage.getItem("userToken")!,
        }
      );
    }
  };

  const publish = (chats: string) => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: "/pub/chat",
        headers: {
          Authorization: sessionStorage.getItem("userToken")!,
        },
        body: JSON.stringify({
          chat_room_id: createData?.chat_room_id,
          message: chats,
        }),
      });

      chat.setValue("");
    } else {
      console.error("STOMP connection not established.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    chat.setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    publish(chat.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <ChatRoomWrap>
      <ChatRoom>
        <div className="message_other_wrap">
          <img className="profile_image" src={ImgProfileBasic.src} />
          <div className="chat message_other">안녕하세요! 구매 가능할까요?</div>
          <div className="time_stamp">12:33</div>
        </div>
        {chatList.map((chatItem, index) => (
          <div key={index} className="message_self_wrap">
            <div className="time_stamp">12:35</div>
            <div className="chat message_self">{chatItem.message}</div>
          </div>
        ))}
      </ChatRoom>

      {/* 채팅 input */}
      <ChatInputWrap>
        <input
          type="text"
          className="input_message"
          onChange={handleChange}
          value={chat.value}
          onKeyDown={handleKeyDown}
        />
        <button className="btn_send" onClick={handleSubmit}>
          <IconSend width="25" height="25" fill="#3EABFA" />
        </button>
      </ChatInputWrap>
    </ChatRoomWrap>
  );
}
