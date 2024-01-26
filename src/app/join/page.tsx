import { JoinMain } from "@/styles/joinStyle";
import React from "react";

const Join: React.FC = () => {
  return (
    <JoinMain>
      <h2 className="text_join">회원가입</h2>
      <form className="join_form">
        <label htmlFor="input-id">아이디</label>
        <input type="text" id="input-id" placeholder="아이디" />

        <label htmlFor="input-nic">닉네임</label>
        <input type="text" id="input-nic" placeholder="닉네임" />

        <label htmlFor="input-pw">비밀번호</label>
        <input type="password" id="input-pw" placeholder="비밀번호" />

        <label htmlFor="input-pw">비밀번호 확인</label>
        <input type="password" id="input-pwchk" placeholder="비밀번호 확인" />

        <label htmlFor="input-pw">이름</label>
        <input type="text" id="input-name" placeholder="이름" />

        <label htmlFor="input-num">전화번호</label>
        <input type="text" id="input-num" placeholder="전화번호" />

        <button className="btn_join">회원가입</button>
      </form>
    </JoinMain>
  );
};

export default Join;
