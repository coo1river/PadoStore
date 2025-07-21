import React from "react";
import Image from "next/image";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import { User } from "@/types/chat/chat.types";

interface Message {
  chat_id: number;
  sender_id: string;
  message: string;
  insert_dt: string;
  chat_room_id: number;
  read_status: string;
}

interface ChatMessageProps {
  message: Message;
  isSelf: boolean;
  timeString: string;
  isRead: string;
  chatId: string;
  otherUserProfile: User | null;
}

export default function ChatMessage({
  message,
  isSelf,
  timeString,
  isRead,
  chatId,
  otherUserProfile,
}: ChatMessageProps) {
  const profileImageUrl = otherUserProfile?.up_file
    ? `/api/file/${otherUserProfile.up_file}`
    : ImgProfileBasic.src;

  return (
    <div
      className={isSelf ? "message_self_wrap" : "message_other_wrap"}
      key={chatId}
    >
      {!isSelf && (
        <Image
          width={45}
          height={45}
          className="profile_image"
          src={profileImageUrl}
          alt="프로필 이미지"
        />
      )}
      {isSelf && (
        <>
          <div className="read_status">
            {isRead === "online" ? "" : "안 읽음"}
          </div>
          <div className="time_stamp">{timeString}</div>
        </>
      )}
      <div className={isSelf ? "chat message_self" : "chat message_other"}>
        {message.message}
      </div>
      {!isSelf && (
        <>
          <div className="time_stamp">{timeString}</div>
          <div className="read_status" />
        </>
      )}
    </div>
  );
}
