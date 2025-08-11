import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ChatRoomInfoRes, Message } from "@/types/chat/chat.types";

interface UseInfiniteChatScrollProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchChatDetails: (page: number, chatRoomId: number) => Promise<void>;
  chatRoomId: number | undefined;
  detailData: ChatRoomInfoRes | null;
}

export const useInfiniteChatScroll = ({
  currentPage,
  setCurrentPage,
  fetchChatDetails,
  chatRoomId,
  detailData,
}: UseInfiniteChatScrollProps) => {
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const [isFetching, setIsFetching] = useState(false);
  const prevScrollHeightRef = useRef(0);
  const prevScrollTopRef = useRef(0);

  const CHAT_MESSAGES_QUERY_KEY = (roomId: number) => ["chatMessages", roomId];

  const queryClient = useQueryClient();
  const currentChatMessages =
    queryClient.getQueryData<Message[]>(
      chatRoomId ? CHAT_MESSAGES_QUERY_KEY(chatRoomId) : []
    ) ?? [];

  const handleScroll = useCallback(async () => {
    if (chatRoomRef.current) {
      const chatRoom = chatRoomRef.current;
      const { scrollTop } = chatRoom;

      if (isFetching || chatRoomId === undefined) {
        return;
      }
      if (scrollTop < 1 && !isFetching && chatRoomId) {
        setIsFetching(true);
        prevScrollTopRef.current = chatRoom.scrollHeight - chatRoom.scrollTop;

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

  // 스크롤 이벤트 등록
  useEffect(() => {
    const chatRoomCurrent = chatRoomRef.current;
    if (!chatRoomCurrent) return;

    let rafId: number | null = null;

    const rafHandleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(handleScroll);
    };

    chatRoomCurrent.addEventListener("scroll", rafHandleScroll);

    return () => {
      chatRoomCurrent.removeEventListener("scroll", rafHandleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [handleScroll]);

  // 스크롤 관리
  useLayoutEffect(() => {
    if (chatRoomRef.current && detailData) {
      const chatRoom = chatRoomRef.current;
      const currentScrollHeight = chatRoom.scrollHeight;

      if (currentPage === 1) {
        chatRoom.scrollTop = currentScrollHeight;
      } else if (
        !isFetching &&
        currentScrollHeight > prevScrollHeightRef.current
      ) {
        const newScrollTop = currentScrollHeight - prevScrollTopRef.current;
        chatRoom.scrollTop = newScrollTop;
      }

      prevScrollHeightRef.current = currentScrollHeight;
    }
  }, [currentChatMessages, currentPage, isFetching, detailData]);

  return { chatRoomRef };
};
