"use client";
import { ChatInputWrap, ChatRoom, ChatRoomWrap } from "@/styles/chatStyle";
import React, {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "next/navigation";
import IconSend from "@/../public/assets/svgs/free-icon-font-paper-plane.svg";
import * as StompJs from "@stomp/stompjs";
import createChatApi, { ChatRes } from "@/api/chat/createChatApi";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import useInput from "@/hooks/useInput";
import chatDetailApi, { ChatDetail } from "@/api/chat/chatDetailApi";

interface Message {
  chat_id: number;
  sender_id: string;
  message: string;
  insert_dt: string;
  chat_room_id: number;
}

export default function UserChat() {
  // useParams 사용하여 URL 매개변수 가져오기
  const params = useParams();
  const receiver = params.chatId;
  const userId = params.userId;

  const [chatList, setChatList] = useState<Message[]>([]);
  const chat = useInput("");

  // 채팅 리스트 데이터 값 담는 useState
  const [createData, setCreateData] = useState<ChatRes | null>(null);

  // 채팅 상세 데이터 값 담는 useState
  const [detailData, setDetailData] = useState<ChatDetail | null>(null);

  // 현재 페이지와 총 페이지 수를 추적하는 상태 변수
  const [currentPage, setCurrentPage] = useState<number>(1);

  const client = useRef<StompJs.Client | null>(null);

  // ChatRoom 스크롤을 맨 아래로 이동
  const chatRoomRef = useRef<HTMLDivElement>(null);

  const [isInitialMount, setIsInitialMount] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  // 채팅 연결 및 구독 설정
  useEffect(() => {
    // 채팅방 생성
    const fetchData = async () => {
      if (receiver !== userId) {
        const createData = await createChatApi(receiver);
        setCreateData(createData);

        if (createData) {
          fetchChatDetails();

          // 구독 설정
          if (client.current) {
            client.current.subscribe(
              `/sub/chat/${createData.chat_room_id}`,
              (message) => {
                console.log("구독 성공", message.body);
                const json_body = JSON.parse(message.body);
                setChatList((prevChatList) => [...prevChatList, json_body]);
              },
              {
                Authorization: sessionStorage.getItem("userToken")!,
              }
            );
          }
        }
      } else {
        console.log(
          "Receiver와 UserID가 동일합니다. 채팅방을 생성하지 않습니다."
        );
      }
    };
    fetchData();

    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:8080/connect",
      connectHeaders: {
        Authorization: sessionStorage.getItem("userToken")!,
      },
      onConnect: () => {
        console.log("Connected 성공");
      },
      onStompError: (error) => {
        console.error("STOMP error", error);
      },
    });

    client.current.activate();

    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, []);

  const handleScroll = async () => {
    if (
      chatRoomRef.current &&
      chatRoomRef.current.scrollTop === 0 &&
      !isFetching
    ) {
      setIsFetching(true);
      setCurrentPage(currentPage + 1);
      await fetchChatDetails();
      setIsFetching(false);
    }
  };

  const fetchChatDetails = async () => {
    const chatParam = {
      chat_room_id: createData?.chat_room_id,
      limit: 10,
      current_page: currentPage,
    };
    const chatDetails = await chatDetailApi(chatParam);
    if (chatDetails) {
      const reversedChatDetails = {
        ...chatDetails,
        chat: chatDetails.chat.reverse(),
      };
      setDetailData((prevDetailData) => ({
        ...reversedChatDetails,
        chat: [...reversedChatDetails.chat, ...(prevDetailData?.chat || [])],
      }));
    }
  };

  useEffect(() => {
    const chatRoomCurrent = chatRoomRef.current;
    if (chatRoomCurrent) {
      chatRoomCurrent.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (chatRoomCurrent) {
        chatRoomCurrent.removeEventListener("scroll", handleScroll);
      }
    };
  }, [currentPage, isFetching]);

  const publish = (chats: string) => {
    if (client.current && client.current.connected) {
      client.current.publish({
        destination: "/pub/chat",
        headers: {
          Authorization: sessionStorage.getItem("userToken")!,
        },
        body: JSON.stringify({
          chat_room_id: createData?.chat_room_id,
          message: chats,
        }),
      });

      chat.setValue("");
    } else {
      console.error("STOMP connection not established.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    chat.setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    publish(chat.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <ChatRoomWrap>
      <ChatRoom ref={chatRoomRef}>
        {detailData?.chat?.map((message, index) => {
          const date = new Date(message.insert_dt);
          const timeString = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div
              key={index}
              className={
                message.sender_id === userId
                  ? "message_self_wrap"
                  : "message_other_wrap"
              }
            >
              {message.sender_id !== userId && (
                <img className="profile_image" src={ImgProfileBasic.src} />
              )}
              {message.sender_id === userId && (
                <div className="time_stamp">{timeString}</div>
              )}
              <div
                className={
                  message.sender_id === userId
                    ? "chat message_self"
                    : "chat message_other"
                }
              >
                {message.message}
              </div>
              {message.sender_id !== userId && (
                <div className="time_stamp">{timeString}</div>
              )}
            </div>
          );
        })}

        {chatList.map((chatItem, index) => {
          const date = new Date(chatItem.insert_dt);
          const timeString = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return (
            <div key={index} className="message_self_wrap">
              <div className="time_stamp">{timeString}</div>
              <div className="chat message_self">{chatItem.message}</div>
            </div>
          );
        })}
      </ChatRoom>

      {/* 채팅 input */}
      <ChatInputWrap>
        <input
          type="text"
          className="input_message"
          onChange={handleChange}
          value={chat.value}
          onKeyDown={handleKeyDown}
        />
        <button className="btn_send" onClick={handleSubmit}>
          <IconSend width="25" height="25" fill="#3EABFA" />
        </button>
      </ChatInputWrap>
    </ChatRoomWrap>
  );
}
