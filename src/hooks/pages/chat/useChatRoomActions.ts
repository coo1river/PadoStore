import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import chatDelete from "@/api/chat/chatDeleteApi";
import chatExitApi from "@/api/chat/chatExitApi";
import useChatStore from "@/store/useChatStore";
import useAuthStore from "@/store/useAuthStore";
import useDecodedToken from "@/hooks/common/useDecodedToken";

interface UseChatRoomActionsProps {
  chatRoomId: number | undefined;
}

interface UseChatRoomActionsReturn {
  handleExit: () => Promise<void>;
}

export const useChatRoomActions = ({
  chatRoomId,
}: UseChatRoomActionsProps): UseChatRoomActionsReturn => {
  const router = useRouter();
  const { refreshChatList } = useChatStore();
  const { token } = useAuthStore();
  const userId = useDecodedToken(token!);

  // 채팅방 나가기
  const handleExit = useCallback(async () => {
    if (chatRoomId) {
      await chatDelete(chatRoomId);
    }
    refreshChatList();
    router.push(`/chat/${userId}`);
  }, [chatRoomId, refreshChatList, router, userId]);

  // 경로 변경 시 채팅방 나가기 호출
  useEffect(() => {
    let initialMount = true;

    const handleRouteChange = async () => {
      if (!initialMount && chatRoomId && sessionStorage.getItem("userToken")) {
        await chatExitApi(chatRoomId);
      }
    };

    if (!initialMount) {
      handleRouteChange();
    }
    initialMount = false;

    return () => {
      handleRouteChange();
    };
  }, [chatRoomId]);

  return { handleExit };
};
