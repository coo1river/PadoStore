"use client";
import { JoinMain } from "@/styles/joinStyle";
import React, { Dispatch, SetStateAction, useState } from "react";

export const JoinForm: React.FC<{
  setJoinState: Dispatch<SetStateAction<string>>;
}> = ({ setJoinState }) => {
  return (
    <JoinMain>
      <h2 className="text_join">회원가입</h2>
      <form className="join_form">
        <label htmlFor="input-id">아이디</label>
        <input type="text" id="input-id" placeholder="아이디" />

        <label htmlFor="input-pw">비밀번호</label>
        <input type="password" id="input-pw" placeholder="비밀번호" />

        <label htmlFor="input-pw">비밀번호 확인</label>
        <input type="password" id="input-pwchk" placeholder="비밀번호 확인" />

        <label htmlFor="input-pw">이름</label>
        <input type="text" id="input-name" placeholder="이름" />

        <label htmlFor="input-num">전화번호</label>
        <input type="text" id="input-num" placeholder="전화번호" />

        <button className="btn_join" onClick={() => setJoinState("setProfile")}>
          다음
        </button>
      </form>
    </JoinMain>
  );
};

export const SetProfile: React.FC = () => {
  return (
    <JoinMain>
      <div>
        <img src="" alt="" />
        <label htmlFor="img-profile" />
        <input type="file" id="img-profile" accept="image/*" />
      </div>
      <label htmlFor="input-nic">닉네임</label>
      <input type="text" id="input-nic" placeholder="닉네임" />
    </JoinMain>
  );
};

export const Join: React.FC = () => {
  const [joinState, setJoinState] = useState("join");

  return (
    <>
      {joinState === "join" ? (
        <JoinForm setJoinState={setJoinState} />
      ) : (
        <SetProfile />
      )}
    </>
  );
};

export default Join;
