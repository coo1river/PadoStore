"use client";

import { ChatList, ChatMain, ChatRoom } from "@/styles/chatStyle";
import React from "react";

export default function Chat() {
  return (
    <ChatMain>
      <ChatList>리스트</ChatList>
      <ChatRoom>채팅방</ChatRoom>
    </ChatMain>
  );
}
