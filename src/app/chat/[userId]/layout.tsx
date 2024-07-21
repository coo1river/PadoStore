"use client";

import { ChatList, ChatMain } from "@/styles/chatStyle";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import React, { useEffect, useState } from "react";
import chatListApi, { ListRes } from "@/api/chat/chatListApi";
import { useRouter } from "next/navigation";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 라우터 사용
  const router = useRouter();

  const [list, setList] = useState<ListRes | null>(null);

  // 채팅 목록 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const data = await chatListApi();
      setList(data);
    };
    fetchData();
  }, []);

  return (
    <ChatMain>
      {/* 채팅방 목록 */}
      <ChatList>
        {list?.chatList.map((item, index) => (
          <div
            key={index}
            className="user_wrap"
            onClick={() =>
              router.push(`/chat/${item.chat_user2}/${item.chat_user1}`)
            }
          >
            <img className="profile_img" src={ImgProfileBasic.src} />
            <div className="nickname_chat_wrap">
              <p className="nickname">{item.chat_user1}</p>
              <p>{item.last_message}</p>
            </div>
          </div>
        ))}
      </ChatList>
      {children}
    </ChatMain>
  );
}
