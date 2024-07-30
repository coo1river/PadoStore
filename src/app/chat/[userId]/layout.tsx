"use client";

import { ChatList, ChatMain } from "@/styles/chatStyle";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import React, { useEffect, useState } from "react";
import chatListApi, { ListRes } from "@/api/chat/chatListApi";
import { useRouter } from "next/navigation";
import useDecodedToken from "@/hooks/useDecodedToken";
import useAuthStore from "@/store/useAuthStore";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 라우터 사용
  const router = useRouter();

  // 토큰 디코딩 커스텀 훅으로 user id 추출
  const { token, setToken } = useAuthStore();
  const userId = useDecodedToken(token!);

  const [list, setList] = useState<ListRes | null>(null);

  // 채팅 목록 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const data = await chatListApi();
      setList(data);
      console.log("my data:", data);
    };
    fetchData();
  }, []);

  return (
    <ChatMain>
      {/* 채팅방 목록 */}
      <ChatList>
        {list?.chatList.map((item, index) => {
          // 채팅방 동적 라우팅
          const routePath =
            userId === item.chat_user1
              ? `/chat/${item.chat_user1}/${item.chat_user2}`
              : `/chat/${item.chat_user2}/${item.chat_user1}`;

          // 접속 유저와 채팅 리시버가 같을 경우 방지
          const isSelfChat =
            userId === item?.chat_user1 && userId === item?.chat_user2;

          // userId가 item.chat_user1 또는 item.chat_user2와 일치하는 경우 상태 확인
          const userStatus =
            userId === item?.chat_user1
              ? item?.user1_status
              : item?.user2_status;

          console.log("userId2:", userId);
          console.log("userStatus:", userStatus);

          // 상대방 닉네임 결정
          const nickname =
            userId === item?.chat_user1 ? item?.chat_user2 : item?.chat_user1;

          return (
            <div
              key={index}
              className={`user_wrap ${userStatus === "true" ? "" : "none"}`}
              onClick={() => {
                if (!isSelfChat) {
                  router.push(routePath);
                }
              }}
            >
              <img className="profile_img" src={ImgProfileBasic.src} />
              <div className="nickname_chat_wrap">
                <p className="nickname">{nickname}</p>
                <p>{item.last_message}</p>
              </div>
            </div>
          );
        })}
      </ChatList>
      {children}
    </ChatMain>
  );
}
