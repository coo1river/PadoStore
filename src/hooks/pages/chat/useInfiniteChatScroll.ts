import { useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { ChatDetailRes } from "@/types/chat/chat.types";

export const useInfiniteChatScroll = (
  queryResult: UseInfiniteQueryResult<InfiniteData<ChatDetailRes>, unknown>
) => {
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef(0);
  const isInitialLoadRef = useRef(true);

  const { data, fetchNextPage, hasNextPage, isFetching } = queryResult;

  const handleScroll = useCallback(async () => {
    const chatRoom = chatRoomRef.current;
    if (!chatRoom) return;

    if (chatRoom.scrollTop < 1 && hasNextPage && !isFetching) {
      prevScrollHeightRef.current = chatRoom.scrollHeight;
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const container = chatRoomRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 스크롤 관리
  useLayoutEffect(() => {
    const chatRoom = chatRoomRef.current;
    if (!chatRoom || !data) return;

    const currentScrollHeight = chatRoom.scrollHeight;
    const totalChats = data.pages.flatMap((p) => p.chat).length;

    if (data.pages.length === 1 && isInitialLoadRef.current) {
      chatRoom.scrollTop = currentScrollHeight;
      isInitialLoadRef.current = false;
    } else if (prevScrollHeightRef.current > 0) {
      if (data.pages.length > 1) {
        chatRoom.scrollTop = currentScrollHeight - prevScrollHeightRef.current;
      } else if (totalChats !== prevScrollHeightRef.current) {
        chatRoom.scrollTop = currentScrollHeight;
      }
    }
    prevScrollHeightRef.current = currentScrollHeight;
  }, [data]);

  return { chatRoomRef };
};
