"use client";
import React, { FormEvent, use, useEffect, useRef, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import * as StompJs from "@stomp/stompjs";
import createChatApi, { ChatRes } from "@/api/chat/createChatApi";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import IconExit from "@/../public/assets/svgs/free-icon-font-exit-3917349.svg";
import useInput from "@/hooks/useInput";
import chatDetailApi, { ChatDetail, ChatReq } from "@/api/chat/chatDetailApi";
import IconSend from "@/../public/assets/svgs/free-icon-font-paper-plane.svg";
import { ChatInputWrap, ChatRoom, ChatRoomWrap } from "@/styles/chatStyle";
import chatEnterApi, { ChatRoomRes } from "@/api/chat/chatEnterApi";
import chatDelete from "@/api/chat/chatDeleteApi";
import chatExitApi from "@/api/chat/chatExitApi";
import useChatStore from "@/store/useChatStore";

interface Message {
  chat_id: number;
  sender_id: string;
  message: string;
  insert_dt: string;
  chat_room_id: number;
  read_status: string;
}

export default function UserChat() {
  //  useParams 사용하여 URL 매개변수 가져오기
  const params = useParams();
  const pathname = usePathname();
  const receiver = params.chatId;
  const userId = params.userId;
  const router = useRouter();

  const [chatList, setChatList] = useState<Message[]>([]);
  const chat = useInput("");

  // zustand에서 refresh 함수 가져오기
  const { refreshChatList } = useChatStore();

  // 채팅 리스트, 상세, 입장 데이터 값 담는 useState
  const [createData, setCreateData] = useState<ChatRes | null>(null);
  const [detailData, setDetailData] = useState<ChatDetail | null>(null);
  const [enterData, setEnterData] = useState<ChatRoomRes | null>(null);

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

  useEffect(() => {
    if (!createData) return;

    const clientInstance = new StompJs.Client({
      brokerURL: "ws://localhost:8080/connect",
      connectHeaders: {
        Authorization: sessionStorage.getItem("userToken")!,
      },
      onConnect: async () => {
        console.log("Connected 성공");

        const enterRes = await chatEnterApi(createData.chat_room_id);
        setEnterData(enterRes);
        chatDetails();
        subscribe();
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
  }, [createData]);

  // 스크롤 관리
  useEffect(() => {
    if (chatRoomRef.current && detailData) {
      // 현재 스크롤 위치 저장
      const { scrollTop, scrollHeight, clientHeight } = chatRoomRef.current;
      const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;

      // 데이터 추가 후 하단으로 스크롤
      if (isScrolledToBottom || currentPage === 1) {
        chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
      }
    }
  }, [detailData, chatList]);

  // 채팅 상세
  const chatDetails = async () => {
    if (!createData) return;
    const chatParam: ChatReq = {
      chat_room_id: createData.chat_room_id,
      limit: 15,
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

  // STOMP 구독
  const subscribe = () => {
    if (client.current && createData) {
      client.current.subscribe(
        `/sub/chat/${createData.chat_room_id}`,
        async (message) => {
          setEnterData(await chatEnterApi(createData.chat_room_id));
          const receivedMessage = JSON.parse(message.body);
          console.log("구독 성공", message.body);

          // 최신 enterData 가져오기
          const enterStatus = await chatEnterApi(createData.chat_room_id);
          setEnterData(enterStatus);

          // 메시지의 read_status를 기반으로 isRead 설정
          const isReceiverOffline =
            enterStatus.user1_status === "offline" ||
            enterStatus.user2_status === "offline";

          // 읽음 상태 처리
          const isRead =
            receivedMessage.read_status === "true" ||
            (receivedMessage.sender_id === enterStatus.user1_id
              ? enterStatus.user2_status
              : enterStatus.user1_status) === "online";

          // 상대방이 offline일 경우 상세 정보를 다시 조회
          if (isReceiverOffline) {
            await chatDetails(); // 채팅 상세 조회
          }

          setChatList((prevChatList) => [
            ...prevChatList,
            { ...receivedMessage, read_status: isRead ? "online" : "offline" },
          ]);
        },
        {
          Authorization: sessionStorage.getItem("userToken")!,
        }
      );
    }
  };

  // 스크롤 이벤트
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

  // 스크롤 이벤트 발생 시 새로운 채팅 데이터 가져오기
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

      // input value 초기화
      chat.setValue("");

      // 스크롤을 맨 아래로 이동
      if (chatRoomRef.current) {
        chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
      }
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

  // 채팅방 나가기
  const handleExit = async () => {
    await chatDelete(createData?.chat_room_id);
    refreshChatList();
    router.push(`/chat/${userId}`);
  };

  //  경로 변경 시 채팅방 나가기 호출
  useEffect(() => {
    let initialMount = true;

    const handleRouteChange = async () => {
      if (!initialMount && createData) {
        await chatExitApi(createData.chat_room_id);
      }
    };

    // 초기 마운트 시 실행 방지
    if (!initialMount) {
      handleRouteChange();
    }
    initialMount = false;

    return () => {
      handleRouteChange();
    };
  }, [pathname, createData]);

  // 렌더링 되는 메시지(본인 메시지/상대 메시지)
  const renderMessage = (
    message: Message,
    isSelf: boolean,
    timeString: string,
    isRead: string,
    chat_id: string
  ) => {
    return (
      <div
        className={isSelf ? "message_self_wrap" : "message_other_wrap"}
        key={chat_id}
      >
        {!isSelf && (
          <img
            className="profile_image"
            src={ImgProfileBasic.src}
            alt="Profile"
          />
        )}
        {isSelf && (
          <>
            <div className="read_status">
              {isRead === "online" ? "" : "안 읽음"}
            </div>
            <div className="time_stamp">{timeString}</div>
          </>
        )}
        <div className={isSelf ? "chat message_self" : "chat message_other"}>
          {message.message}
        </div>
        {!isSelf && (
          <>
            <div className="time_stamp">{timeString}</div>
            <div className="read_status" />
          </>
        )}
      </div>
    );
  };

  return (
    <ChatRoomWrap>
      <div className="chat_header">
        <p className="chat_receiver">{receiver}</p>
        <IconExit
          width="20"
          height="20"
          fill="white"
          onClick={handleExit}
          className="icon_exit"
        />
      </div>

      <ChatRoom ref={chatRoomRef}>
        {detailData?.chat.map((message, index) => {
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

          return renderMessage(
            message,
            message.sender_id === userId,
            timeString,
            isRead,
            `detail_${message.chat_id}_${index}`
          );
        })}
        {chatList.map((chatItem: Message, index) => {
          const date = new Date(chatItem.insert_dt);
          const timeString = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          return renderMessage(
            chatItem,
            chatItem.sender_id === userId,
            timeString,
            chatItem.read_status,
            `chat_${chatItem.chat_id}_${index}`
          );
        })}
      </ChatRoom>

      <ChatInputWrap>
        <input
          type="text"
          className="input_message"
          onChange={handleChange}
          value={chat.value}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
        />
        <button className="btn_send" onClick={handleSubmit}>
          <IconSend width="25" height="25" fill="#3EABFA" />
        </button>
      </ChatInputWrap>
    </ChatRoomWrap>
  );
}
