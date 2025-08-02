"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import IconExit from "@/../public/assets/svgs/free-icon-font-exit-3917349.svg";
import IconMenu from "@/../public/assets/svgs/free-icon-font-plus-3917043.svg";
import IconSend from "@/../public/assets/svgs/free-icon-font-paper-plane.svg";
import { ChatInputWrap, ChatRoom, ChatRoomWrap } from "@/styles/chatStyle";
import ChatModal from "@/components/modal/chatModal";
import { useChatRoomData } from "@/hooks/pages/chat/useChatRoomData";
import ChatMessage from "@/components/pages/chat/ChatMessage";
import { useInfiniteChatScroll } from "@/hooks/pages/chat/useInfiniteChatScroll";
import { useChatInput } from "@/hooks/pages/chat/useChatInput";
import { useChatRoomActions } from "@/hooks/pages/chat/useChatRoomActions";
import { useUserChatActions } from "@/hooks/pages/chat/useUserChatActions";
import { useUserId } from "@/hooks/common/useUserId";
import { useQueryClient } from "@tanstack/react-query";
import { ChatRoomRes, Message } from "@/types/chat/chat.types";
import { useStompClient } from "@/hooks/pages/chat/useStompClient";

export default function Chat() {
  const { chatId: receiver } = useParams();
  const userId = useUserId();
  const queryClient = useQueryClient();

  const [enterData, setEnterData] = useState<ChatRoomRes | null>(null);
  const enterDataRef = useRef<ChatRoomRes | null>(null);

  const {
    createData,
    detailData,
    currentPage,
    setCurrentPage,
    fetchChatDetails,
  } = useChatRoomData({ receiver });

  const chatDetails = useCallback(async () => {
    if (createData?.chat_room_id) {
      await fetchChatDetails(currentPage, createData.chat_room_id);
    }
  }, [createData?.chat_room_id, currentPage, fetchChatDetails]);

  const { publish } = useStompClient({
    createData,
    setEnterData,
    chatDetails,
    enterDataRef,
  });

  const { chatRoomRef, observerRef } = useInfiniteChatScroll({
    currentPage,
    setCurrentPage,
    fetchChatDetails,
    chatRoomId: createData?.chat_room_id,
    detailData,
  });

  const { chat, handleSubmit } = useChatInput({ publish, chatRoomRef });

  const { handleExit } = useChatRoomActions({
    chatRoomId: createData?.chat_room_id,
  });

  const {
    modalState,
    setModalState,
    closeModal,
    sendAccountNumber,
    sendAddress,
  } = useUserChatActions({ publish });

  const messages =
    queryClient.getQueryData<Message[]>([
      "chatMessages",
      createData?.chat_room_id,
    ]) || [];

  const { receiverNickname, otherUserProfileForMessage } = useMemo(() => {
    const user1 = detailData?.user1;
    const user2 = detailData?.user2;

    if (!user1 || !user2)
      return { receiverNickname: receiver, otherUserProfileForMessage: null };

    const isUser1 = user1.user_id === receiver;
    const profile = isUser1 ? user1 : user2;

    return {
      receiverNickname: profile.nickname,
      otherUserProfileForMessage: profile,
    };
  }, [detailData]);

  return (
    <ChatRoomWrap>
      <div className="chat_header">
        <p className="chat_receiver">{receiverNickname}</p>
        <IconExit
          width="20"
          height="20"
          fill="white"
          onClick={handleExit}
          className="icon_exit"
        />
      </div>

      <ChatRoom ref={chatRoomRef}>
        <div ref={observerRef} />
        {messages.map((message, index) => {
          const date = new Date(message.insert_dt);
          const timeString = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const isRead =
            message.read_status === "true"
              ? "online"
              : message.sender_id === enterData?.user1_id
              ? enterData?.user2_status || "offline"
              : enterData?.user1_status || "offline";

          return (
            <ChatMessage
              key={`chat_${message.chat_id}_${index}`}
              message={message}
              isSelf={message.sender_id === userId}
              timeString={timeString}
              isRead={isRead}
              chatId={`chat_${message.chat_id}_${index}`}
              otherUserProfile={otherUserProfileForMessage}
            />
          );
        })}
      </ChatRoom>

      <ChatInputWrap>
        <button
          className="btn_input btn_menu"
          onClick={() => setModalState(!modalState)}
        >
          <IconMenu width="20" height="20" fill="#3EABFA" />
        </button>
        <input
          type="text"
          className="input_message"
          onChange={chat.onChange}
          value={chat.value}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
        />
        {modalState && (
          <ChatModal
            onClose={closeModal}
            sendAccount={sendAccountNumber}
            sendAddress={sendAddress}
          />
        )}
        <button className="btn_input btn_send" onClick={handleSubmit}>
          <IconSend width="25" height="25" fill="#3EABFA" />
        </button>
      </ChatInputWrap>
    </ChatRoomWrap>
  );
}
