import { useRef, useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatRoomInfoRes, Message } from "@/types/chat/chat.types";

interface UseInfiniteChatScrollProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchChatDetails: (page: number, chatRoomId: number) => Promise<void>;
  chatRoomId: number | undefined;
  detailData: ChatRoomInfoRes | null;
}

interface UseInfiniteChatScrollReturn {
  chatRoomRef: React.RefObject<HTMLDivElement>;
  observerRef: React.RefObject<HTMLDivElement>;
}

export const useInfiniteChatScroll = ({
  currentPage,
  setCurrentPage,
  fetchChatDetails,
  chatRoomId,
  detailData,
}: UseInfiniteChatScrollProps): UseInfiniteChatScrollReturn => {
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  const CHAT_MESSAGES_QUERY_KEY = (roomId: number) => ["chatMessages", roomId];

  const { data: currentChatMessages } = useQuery<Message[]>({
    queryKey: chatRoomId ? CHAT_MESSAGES_QUERY_KEY(chatRoomId) : [],
    initialData: [],
    enabled: !!chatRoomId,
    staleTime: Infinity,
  });

  const handleScroll = useCallback(async () => {
    if (chatRoomRef.current) {
      const chatRoom = chatRoomRef.current;
      const { scrollTop } = chatRoom;

      if (scrollTop < 10 && !isFetching && chatRoomId) {
        setIsFetching(true);
        try {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          await fetchChatDetails(nextPage, chatRoomId);
        } catch (error) {
          console.error("데이터 패칭 에러", error);
        } finally {
          setIsFetching(false);
        }
      }
    }
  }, [isFetching, chatRoomId, currentPage, setCurrentPage, fetchChatDetails]);

  // 스크롤 관리
  useEffect(() => {
    if (chatRoomRef.current && detailData) {
      const chatRoom = chatRoomRef.current;
      const { scrollTop } = chatRoom;

      if (currentPage === 1) {
        chatRoom.scrollTop = chatRoom.scrollHeight;
      }

      if (currentPage > 1) {
        const deltaHeight = chatRoom.scrollHeight - prevScrollHeight;
        chatRoom.scrollTop = scrollTop + deltaHeight;
      }

      setPrevScrollHeight(chatRoom.scrollHeight);
    }
  }, [currentChatMessages, currentPage, prevScrollHeight, detailData]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const chatRoomCurrent = chatRoomRef.current;
    if (chatRoomCurrent) {
      chatRoomCurrent.addEventListener("scroll", handleScroll);

      return () => {
        chatRoomCurrent.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  return { chatRoomRef, observerRef };
};
