"use client";
import Sidebar from "@/components/pages/chat/Sidebar";
import { ChatMain } from "@/styles/chatStyle";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatMain>
      <Sidebar />
      {children}
    </ChatMain>
  );
}
