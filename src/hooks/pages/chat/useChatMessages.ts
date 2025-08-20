import { useMemo } from "react";
import {
  ChatDetailRes,
  ChatRoomInfoRes,
  ChatRoomRes,
  Message,
} from "@/types/chat/chat.types";
import { InfiniteData } from "@tanstack/react-query";

interface Params {
  detailData: ChatRoomInfoRes | null;
  chatData: InfiniteData<ChatDetailRes> | undefined;
  receiver?: string | string[];
  userId: string;
  enterData: ChatRoomRes | null;
}

export const useChatMessages = ({
  detailData,
  chatData,
  receiver,
  enterData,
}: Params) => {
  const allMessages = useMemo(() => {
    if (!chatData) return [];
    return (
      chatData.pages
        .slice()
        .reverse()
        .flatMap((p) => p.chat.slice().reverse()) ?? []
    );
  }, [chatData]);

  const { receiverNickname, otherUserProfileForMessage } = useMemo(() => {
    if (!detailData || !detailData.user1 || !detailData.user2) {
      return {
        receiverNickname: String(receiver ?? ""),
        otherUserProfileForMessage: null,
      };
    }
    const isUser1 = detailData.user1.user_id === receiver;
    const profile = isUser1 ? detailData.user1 : detailData.user2;

    return {
      receiverNickname: profile.nickname,
      otherUserProfileForMessage: profile,
    };
  }, [detailData, receiver]);

  const getReadStatus = (message: Message) => {
    if (message.read_status === "true") return "online";
    if (!enterData) return "offline";

    return message.sender_id === enterData.user1_id
      ? enterData.user2_status || "offline"
      : enterData.user1_status || "offline";
  };

  return {
    allMessages,
    receiverNickname,
    otherUserProfileForMessage,
    getReadStatus,
  };
};
