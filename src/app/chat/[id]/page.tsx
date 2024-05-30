"use client";

import { ChatList, ChatMain, ChatRoom } from "@/styles/chatStyle";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import StompJs from "@stomp/stompjs";

interface Message {
  userId: number;
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const userId = useRef<number>(Date.now());
  const client = useRef<Client | null>(null);

  useEffect(() => {
    // STOMP 클라이언트 설정
    client.current = new Client({
      brokerURL: "ws://localhost:8080/chat", // STOMP 웹소켓 서버 URL
      connectHeaders: {
        login: "user",
        passcode: "password",
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => {
        return new StompJs("http://localhost:8080/ws");
      },
      onConnect: () => {
        setIsConnected(true);
        client.current?.subscribe("/sub/chat/", (message: IMessage) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            JSON.parse(message.body),
          ]);
        });
      },
      onDisconnect: () => {
        setIsConnected(false);
      },
    });

    client.current.activate();

    return () => {
      client.current?.deactivate();
    };
  }, []);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (client.current?.connected) {
      client.current.publish({
        destination: "/pub/chat",
        headers: {
          Authorization: sessionStorage.getItem("userToken")!,
        },
        body: JSON.stringify({
          userId: userId.current,
          content: currentMessage,
        }),
      });
      setCurrentMessage("");
    }
  };

  return (
    <ChatMain>
      {/* 채팅방 목록 */}
      <ChatList>
        <div className="user_wrap">
          <img className="profile_img" src={ImgProfileBasic.src} />
          <div className="nickname_chat_wrap">
            <p className="nickname">알파카</p>
            <p>감사합니다 잘 받았어요~</p>
          </div>
        </div>
        <div className="user_wrap">
          <img className="profile_img" src={ImgProfileBasic.src} />
          <div className="nickname_chat_wrap">
            <p className="nickname">거래123</p>
            <p>혹시 이거 구매 가능한가요?</p>
          </div>
        </div>
      </ChatList>

      {/* 채팅방 */}
      <ChatRoom>
        <div className="message_other_wrap">
          <img className="profile_image" src={ImgProfileBasic.src} />
          <div className="chat message_other">안녕하세요! 구매 가능할까요?</div>
          <div className="time_stamp">12:33</div>
        </div>
        <div className="message_self_wrap">
          <div className="time_stamp">12:35</div>
          <div className="chat message_self">넵 가능합니다</div>
        </div>
      </ChatRoom>
    </ChatMain>
  );
}
