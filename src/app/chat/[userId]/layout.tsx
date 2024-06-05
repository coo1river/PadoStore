"use client";

import { ChatList, ChatMain, ChatRoom } from "@/styles/chatStyle";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import React, { useEffect, useRef, useState } from "react";
import * as StompJs from "@stomp/stompjs";
import { useParams } from "next/navigation";
import chatListApi from "@/api/chat/chatListApi";

interface Message {
  userId: number;
  content: string;
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {children}
    </ChatMain>
  );
}
