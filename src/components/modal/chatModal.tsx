import { ChatModalDiv } from "@/styles/chatStyle";
import React from "react";
import IconPhoto from "@/../../public/assets/svgs/free-icon-font-picture-3917317.svg";
import IconWallet from "@/../../public/assets/svgs/free-icon-font-wallet-7653271.svg";
import IconAddress from "@/../../public/assets/svgs/free-icon-font-home-3917033.svg";
import IconExit from "@/../../public/assets/svgs/close.svg";

interface Props {
  onClose: () => void;
  sendAccount: () => void;
  sendAddress: () => void;
}

const ChatModal: React.FC<Props> = ({ onClose, sendAccount, sendAddress }) => {
  return (
    <ChatModalDiv>
      <button className="btn_modal">
        <IconPhoto width="30" height="30" fill="#3EABFA" />
        <p>사진</p>
      </button>
      <button className="btn_modal" onClick={sendAccount}>
        <IconWallet width="30" height="30" fill="#3EABFA" />
        <p>계좌 전송</p>
      </button>
      <button className="btn_modal" onClick={sendAddress}>
        <IconAddress width="30" height="30" fill="#3EABFA" />
        <p>주소 전송</p>
      </button>
      <button className="btn_exit" onClick={onClose}>
        <IconExit width="30" height="30" fill="#3EABFA" />
      </button>
    </ChatModalDiv>
  );
};

export default ChatModal;
