"use client";
import { ChatList, ChatMain } from "@/styles/chatStyle";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import React, { useEffect, useState } from "react";
import chatListApi, { ListRes } from "@/api/chat/chatListApi";
import { useRouter } from "next/navigation";
import useDecodedToken from "@/hooks/useDecodedToken";
import useAuthStore from "@/store/useAuthStore";
import useChatStore from "@/store/useChatStore";
import Image from "next/image";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 라우터 사용
  const router = useRouter();

  // 토큰 디코딩 커스텀 훅으로 user id 추출
  const { token } = useAuthStore();
  const userId = useDecodedToken(token!);

  // zustand에서 채팅 목록 refresh 값 가져오기
  const { refresh } = useChatStore();

  const [list, setList] = useState<ListRes | null>(null);

  // 채팅 목록 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const data = await chatListApi();
      setList(data);
    };
    fetchData();
  }, [refresh]);

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

          return (
            <div
              key={index}
              className="user_wrap"
              onClick={() => {
                if (!isSelfChat) {
                  router.push(routePath);
                }
              }}
            >
              <Image
                width={100}
                height={100}
                alt="프로필 이미지"
                className="profile_img"
                src={
                  item.up_file
                    ? `/api/file/${item.up_file}`
                    : ImgProfileBasic.src
                }
              />
              <div className="nickname_chat_wrap">
                <p className="nickname">{item.nickname}</p>
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
