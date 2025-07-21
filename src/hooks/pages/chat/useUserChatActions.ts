import { useState, useCallback } from "react";
import userInfoApi, { UserInfo } from "@/api/chat/userInfoApi";

interface UseUserChatActionsProps {
  publish: (message: string) => void;
}

interface UseUserChatActionsReturn {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  sendAccountNumber: () => Promise<void>;
  sendAddress: () => Promise<void>;
}

export const useUserChatActions = ({
  publish,
}: UseUserChatActionsProps): UseUserChatActionsReturn => {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [modalState, setModalState] = useState<boolean>(false);

  // 메뉴 모달 닫기 함수
  const closeModal = useCallback(() => {
    setModalState(false);
  }, []);

  // 계좌 정보 전송 함수
  const sendAccountNumber = useCallback(async () => {
    let fetchedUserData = userData;

    if (!fetchedUserData) {
      fetchedUserData = await userInfoApi();
      setUserData(fetchedUserData);
    }

    const accountMessage = `은행: ${fetchedUserData?.bank}\n예금주: ${fetchedUserData?.account_name}\n계좌번호: ${fetchedUserData?.account_number}`;

    publish(accountMessage);
    closeModal();
  }, [userData, publish, closeModal]);

  // 배송 정보 전송 함수
  const sendAddress = useCallback(async () => {
    let fetchedUserData = userData;

    if (!fetchedUserData) {
      fetchedUserData = await userInfoApi();
      setUserData(fetchedUserData);
    }

    const addressMessage = `받는 사람: ${fetchedUserData?.user_name}\n전화 번호: ${fetchedUserData?.phone_number}\n주소: ${fetchedUserData?.addr_post}\n${fetchedUserData?.addr_detail}`;

    publish(addressMessage);
    closeModal();
  }, [userData, publish, closeModal]);

  return {
    modalState,
    setModalState,
    closeModal,
    sendAccountNumber,
    sendAddress,
  };
};
