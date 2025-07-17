"use client";
import { ChatList } from "@/styles/chatStyle";
import { useRouter } from "next/navigation";
import useDecodedToken from "@/hooks/common/useDecodedToken";
import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import { useChatList } from "@/hooks/pages/chat/useChatList";

export default function Sidebar() {
  const router = useRouter();
  const { token } = useAuthStore();
  const userId = useDecodedToken(token!);

  const { data: list } = useChatList();

  return (
    <ChatList>
      {list?.chatList.map((item, index) => {
        const routePath =
          userId === item.chat_user1
            ? `/chat/${item.chat_user1}/${item.chat_user2}`
            : `/chat/${item.chat_user2}/${item.chat_user1}`;

        const isSelfChat =
          userId === item.chat_user1 && userId === item.chat_user2;

        return (
          <div
            key={index}
            className="user_wrap"
            onClick={() => {
              if (!isSelfChat) router.push(routePath);
            }}
          >
            <Image
              width={100}
              height={100}
              alt="프로필 이미지"
              className="profile_img"
              src={
                item.up_file ? `/api/file/${item.up_file}` : ImgProfileBasic.src
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
  );
}
