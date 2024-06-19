"use client";
import React, {
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams } from "next/navigation";
import * as StompJs from "@stomp/stompjs";
import createChatApi, { ChatRes } from "@/api/chat/createChatApi";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import useInput from "@/hooks/useInput";
import chatDetailApi, { ChatDetail, ChatReq } from "@/api/chat/chatDetailApi";
import IconSend from "@/../public/assets/svgs/free-icon-font-paper-plane.svg";
import { ChatInputWrap, ChatRoom, ChatRoomWrap } from "@/styles/chatStyle";

interface Message {
  chat_id: number;
  sender_id: string;
  message: string;
  insert_dt: string;
  chat_room_id: number;
}

export default function UserChat() {
  //  useParams 사용하여 URL 매개변수 가져오기
  const params = useParams();
  const receiver = params.chatId;
  const userId = params.userId;

  const [chatList, setChatList] = useState<Message[]>([]);
  const chat = useInput("");

  // 채팅 리스트 데이터 값 담는 useState
  const [createData, setCreateData] = useState<ChatRes | null>(null);

  // 채팅 상세 데이터 값 담는 useState
  const [detailData, setDetailData] = useState<ChatDetail | null>(null);

  // 현재 페이지 설정
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState(false);

  const client = useRef<StompJs.Client | null>(null);
  const chatRoomRef = useRef<HTMLDivElement>(null);

  // 채팅방 생성
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await createChatApi(receiver);
        setCreateData(res);
      } catch (error) {
        console.error("채팅방 생성에 실패했습니다.", error);
      }
    };
    fetchData();
  }, [receiver]);

  // 채팅방 생성 후 채팅 상세 데이터 가져오기 및 구독하기
  useEffect(() => {
    if (createData) {
      chatDetails();
      subscribe();
    }
  }, [createData]);

  useEffect(() => {
    const clientInstance = new StompJs.Client({
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
    client.current = clientInstance;
    clientInstance.activate();

    return () => {
      if (clientInstance) {
        clientInstance.deactivate();
      }
    };
  }, []);

  useEffect(() => {
    if (chatRoomRef.current) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  }, [detailData]);

  const chatDetails = async () => {
    if (!createData) return;
    const chatParam: ChatReq = {
      chat_room_id: createData.chat_room_id,
      limit: 10,
      current_page: currentPage,
    };
    try {
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
    } catch (error) {
      console.error("채팅 상세 정보를 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  const subscribe = () => {
    if (client.current && createData) {
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
  };

  const handleScroll = async () => {
    if (
      chatRoomRef.current &&
      chatRoomRef.current.scrollTop === 0 &&
      !isFetching
    ) {
      setIsFetching(true);
      setCurrentPage(currentPage + 1);
      await chatDetails();
      setIsFetching(false);
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
    if (client.current && client.current.connected && createData) {
      client.current.publish({
        destination: "/pub/chat",
        headers: {
          Authorization: sessionStorage.getItem("userToken")!,
        },
        body: JSON.stringify({
          chat_room_id: createData.chat_room_id,
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
                <img
                  className="profile_image"
                  src={ImgProfileBasic.src}
                  alt="Profile"
                />
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
