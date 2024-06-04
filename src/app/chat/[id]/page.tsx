"use client";

import { ChatList, ChatMain, ChatRoom } from "@/styles/chatStyle";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import React, { useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
import * as StompJs from "@stomp/stompjs";
import { useParams } from "next/navigation";
import chatListApi from "@/api/chatListApi";

interface Message {
  userId: number;
  content: string;
}

export default function Chat() {
  const [chatList, setChatList] = useState<
    Array<{ applyId: string; chat: string }>
  >([]);
  const [chat, setChat] = useState("");
  const [data, setData] = useState(null);

  // useParams 사용하여 URL 매개변수 가져오기
  const params = useParams();
  const chat_room_id = params.id;

  const client = useRef<StompJs.Client | null>(null);

  // 채팅 목록 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const data = await chatListApi();
      setData(data);
    };
    fetchData();
  }, []);

  // 채팅 연결
  useEffect(() => {
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8080/connect",
      onConnect: () => {
        console.log("Connected 성공");
        if (client.current) {
          client.current.subscribe(
            `/sub/chat/${chat_room_id}`,
            (message) => {
              const json_body = JSON.parse(message.body);
              setChatList((prevChatList) => [...prevChatList, json_body]);
            },
            {
              Authorization: sessionStorage.getItem("userToken")!,
            }
          );
        }
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
  }, [chat_room_id]);

  const publish = (chat: string) => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: "/pub/chat",
        body: JSON.stringify({
          applyId: chat_room_id,
          chat: chat,
        }),
      });

      setChat("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChat(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    publish(chat);
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
