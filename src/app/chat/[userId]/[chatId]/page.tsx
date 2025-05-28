"use client";
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import * as StompJs from "@stomp/stompjs";
import createChatApi, { ChatRes } from "@/api/chat/createChatApi";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import IconExit from "@/../public/assets/svgs/free-icon-font-exit-3917349.svg";
import IconMenu from "@/../public/assets/svgs/free-icon-font-plus-3917043.svg";
import useInput from "@/hooks/common/useInput";
import chatDetailApi, { ChatDetail, ChatReq } from "@/api/chat/chatDetailApi";
import IconSend from "@/../public/assets/svgs/free-icon-font-paper-plane.svg";
import { ChatInputWrap, ChatRoom, ChatRoomWrap } from "@/styles/chatStyle";
import chatEnterApi, { ChatRoomRes } from "@/api/chat/chatEnterApi";
import chatDelete from "@/api/chat/chatDeleteApi";
import chatExitApi from "@/api/chat/chatExitApi";
import useChatStore from "@/store/useChatStore";
import chatUserInfoApi from "@/api/chat/chatUserInfoApi";
import ChatModal from "@/components/modal/chatModal";
import userInfoApi, { UserInfo } from "@/api/chat/userInfoApi";
import useAuthStore from "@/store/useAuthStore";
import useDecodedToken from "@/hooks/common/useDecodedToken";
import Image from "next/image";

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

  // 토큰 디코딩 커스텀 훅으로 user id 추출
  const { token } = useAuthStore();
  const userId = useDecodedToken(token!);

  // 라우터 사용
  const router = useRouter();

  const [chatList, setChatList] = useState<Message[]>([]);
  const chat = useInput("");

  // zustand에서 refresh 함수 가져오기
  const { refreshChatList } = useChatStore();

  // 채팅 리스트, 상세, 입장 데이터 값 담는 useState
  const [createData, setCreateData] = useState<ChatRes | null>(null);
  const [detailData, setDetailData] = useState<ChatDetail | null>(null);
  const [enterData, setEnterData] = useState<ChatRoomRes | null>(null);
  const [userData, setUserData] = useState<UserInfo | null>(null);

  const [modalState, setModalState] = useState<boolean>(false);

  // enter data 값 참조를 위한 ref
  const enterDataRef = useRef<ChatRoomRes | null>(null);

  // 현재 페이지 설정
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFetching, setIsFetching] = useState(false);

  const client = useRef<StompJs.Client | null>(null);
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  // 채팅방 생성
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await createChatApi(receiver);
        setCreateData(res);
        useChatStore.getState().setChatRoomId(res.chat_room_id);
      } catch (error) {
        console.error("채팅방 생성에 실패했습니다.", error);
      }
    };

    fetchData();
  }, [receiver]);

  // 채팅 상세
  const chatDetails = useCallback(async () => {
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
  }, [createData, currentPage]);

  // STOMP 구독
  const subscribe = useCallback(() => {
    if (client.current && createData) {
      client.current.subscribe(
        `/sub/chat/${createData.chat_room_id}`,
        async (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log("구독 성공", message.body);

          const enterInfo = await chatUserInfoApi(createData.chat_room_id);
          setEnterData(enterInfo);
          enterDataRef.current = enterInfo;

          setChatList((prevChatList) => [
            ...prevChatList,
            { ...receivedMessage },
          ]);
        },
        {
          Authorization: sessionStorage.getItem("userToken")!,
        }
      );
    }
  }, [createData]);

  useEffect(() => {
    if (!createData) return;

    const clientInstance = new StompJs.Client({
      brokerURL: "wss://api-pado.info/connect",
      connectHeaders: {
        Authorization: sessionStorage.getItem("userToken")!,
      },
      onConnect: async () => {
        if (!createData || enterData) {
          subscribe();
          return;
        }
        console.log("Connected 성공");

        const enterRes = await chatEnterApi(createData.chat_room_id);
        enterDataRef.current = enterRes;
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
  }, [createData, chatDetails, subscribe]);

  useEffect(() => {
    if (!enterData) return;

    const updateMessages = () => {
      const updatedChatList = chatList.map((message) => {
        const isCurrentUserMessage =
          message.sender_id === enterDataRef.current?.user1_id;

        const isOnline = isCurrentUserMessage
          ? enterDataRef.current?.user2_status === "online"
          : enterDataRef.current?.user1_status === "online";

        const newStatus = isOnline ? "online" : "offline";

        if (message.read_status === "offline" && newStatus === "online") {
          return {
            ...message,
            read_status: newStatus,
          };
        }

        return message;
      });

      setChatList(updatedChatList);
    };

    updateMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterData]);

  const handleScroll = useCallback(async () => {
    if (chatRoomRef.current) {
      const chatRoom = chatRoomRef.current;
      const { scrollTop } = chatRoom;

      if (scrollTop < 10 && !isFetching) {
        setIsFetching(true);
        try {
          // 페이지 증가 및 데이터 패칭
          setCurrentPage((prevPage) => prevPage + 1);
          await chatDetails();
        } catch (error) {
          console.error("데이터 패칭 에러", error);
        } finally {
          setIsFetching(false);
        }
      }
    }
  }, [isFetching, chatDetails]);

  // 스크롤 관리
  useEffect(() => {
    if (chatRoomRef.current && detailData) {
      const chatRoom = chatRoomRef.current;
      const { scrollTop } = chatRoom;

      if (currentPage === 1) {
        // 새 데이터 추가 시 하단으로 스크롤
        chatRoom.scrollTop = chatRoom.scrollHeight;
      }

      // 현재 페이지에서 새 데이터가 추가된 경우 스크롤 조정
      if (currentPage > 1) {
        const deltaHeight = chatRoom.scrollHeight - prevScrollHeight;
        chatRoom.scrollTop = scrollTop + deltaHeight;
      }

      // 스크롤 높이 저장
      setPrevScrollHeight(chatRoom.scrollHeight);
    }
  }, [detailData, chatList, currentPage, prevScrollHeight]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const chatRoomCurrent = chatRoomRef.current;
    if (chatRoomCurrent) {
      chatRoomCurrent.addEventListener("scroll", handleScroll);

      return () => {
        chatRoomCurrent.removeEventListener("scroll", handleScroll);
      };
    }
  }, [currentPage, isFetching, handleScroll]);

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

      // 채팅 목록 갱신
      refreshChatList();

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
      if (!initialMount && createData && sessionStorage.getItem("token")) {
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

  // 메뉴 모달 닫기 함수
  const closeModal = () => {
    setModalState(false);
  };

  // 계좌 정보 전송 함수
  const sendAccountNumber = async () => {
    let fetchedUserData = userData;

    if (!fetchedUserData) {
      fetchedUserData = await userInfoApi();
      setUserData(fetchedUserData);
    }

    const accountMessage = `은행: ${fetchedUserData?.bank}\n예금주: ${fetchedUserData?.account_name}\n계좌번호: ${fetchedUserData?.account_number}`;

    publish(accountMessage);
    closeModal();
  };

  // 배송 정보 전송 함수
  const sendAddress = async () => {
    let fetchedUserData = userData;

    if (!fetchedUserData) {
      fetchedUserData = await userInfoApi();
      setUserData(fetchedUserData);
    }

    const addressMessage = `받는 사람: ${fetchedUserData?.user_name}\n전화 번호: ${fetchedUserData?.phone_number}\n주소: ${fetchedUserData?.addr_post}\n${fetchedUserData?.addr_detail}`;

    publish(addressMessage);
    closeModal();
  };

  // 렌더링 되는 메시지(본인 메시지/상대 메시지)
  const renderMessage = useCallback(
    (
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
            <Image
              width={45}
              height={45}
              className="profile_image"
              src={
                detailData?.user1.user_id === receiver
                  ? detailData?.user1.up_file
                    ? `/api/file/${detailData?.user1.up_file}`
                    : ImgProfileBasic.src
                  : detailData?.user2.up_file
                  ? `/api/file/${detailData?.user2.up_file}`
                  : ImgProfileBasic.src
              }
              alt="프로필 이미지"
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
    },
    [detailData, receiver]
  );

  // 상대 닉네임
  const receiverNickname =
    detailData?.user1.user_id === receiver
      ? detailData.user1.nickname
      : detailData?.user2.user_id === receiver
      ? detailData.user2.nickname
      : receiver;

  return (
    <ChatRoomWrap>
      <div className="chat_header">
        <p className="chat_receiver">{receiverNickname}</p>
        <IconExit
          width="20"
          height="20"
          fill="white"
          onClick={handleExit}
          className="icon_exit"
        />
      </div>

      <ChatRoom ref={chatRoomRef}>
        <div ref={observerRef} />
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
        <button
          className="btn_input btn_menu"
          onClick={() => {
            setModalState(!modalState);
          }}
        >
          <IconMenu width="20" height="20" fill="#3EABFA" />
        </button>
        <input
          type="text"
          className="input_message"
          onChange={handleChange}
          value={chat.value}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
        />
        {modalState ? (
          <ChatModal
            onClose={closeModal}
            sendAccount={sendAccountNumber}
            sendAddress={sendAddress}
          />
        ) : null}
        <button className="btn_input btn_send" onClick={handleSubmit}>
          <IconSend width="25" height="25" fill="#3EABFA" />
        </button>
      </ChatInputWrap>
    </ChatRoomWrap>
  );
}
