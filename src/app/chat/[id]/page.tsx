"use client";

import { ChatList, ChatMain, ChatRoom } from "@/styles/chatStyle";
import ImgProfileBasic from "@/../public/assets/images/img-user-basic.png";
import React from "react";

export default function Chat() {
  return (
    <ChatMain>
      <ChatList>
        <div className="user_wrap">
          <img className="profile_img" src={ImgProfileBasic.src} />
          <div className="nickname_chat_wrap">
            <p className="nickname">알파카</p>
            <p>감사합니다 잘 받았어요~</p>
          </div>
        </div>
        <div className="user_wrap">
          <img className="profile_img" src={ImgProfileBasic.src} />
          <div className="nickname_chat_wrap">
            <p className="nickname">거래123</p>
            <p>혹시 이거 구매 가능한가요?</p>
          </div>
        </div>
      </ChatList>
      <ChatRoom>
        <div className="message_other_wrap">
          <img className="profile_image" src={ImgProfileBasic.src} />
          <div className="chat message_other">안녕하세요! 구매 가능할까요?</div>
          <div className="time_stamp">12:33</div>
        </div>
        <div className="message_self_wrap">
          <div className="time_stamp">12:35</div>
          <div className="chat message_self">넵 가능합니다</div>
        </div>
      </ChatRoom>
    </ChatMain>
  );
}
