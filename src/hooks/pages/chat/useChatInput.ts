import { FormEvent, useCallback } from "react";
import useInput from "@/hooks/common/useInput";
import useChatStore from "@/store/useChatStore";

interface UseChatInputProps {
  publish: (message: string) => void;
  chatRoomRef: React.RefObject<HTMLDivElement>;
}

interface UseChatInputReturn {
  chat: {
    value: string;
    setValue: (value: string) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  handleSubmit: (e: FormEvent) => void;
}

export const useChatInput = ({
  publish,
  chatRoomRef,
}: UseChatInputProps): UseChatInputReturn => {
  const chat = useInput("");
  const { refreshChatList } = useChatStore();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      chat.setValue(e.target.value);
    },
    [chat]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      publish(chat.value);

      chat.setValue("");

      refreshChatList();

      if (chatRoomRef.current) {
        chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
      }
    },
    [chat, publish, refreshChatList, chatRoomRef]
  );

  return {
    chat: {
      value: chat.value,
      setValue: chat.setValue,
      onChange: handleChange,
    },
    handleSubmit,
  };
};
