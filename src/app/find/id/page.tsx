"use client";
import idFindApi from "@/api/idFindApi";
import useInput from "@/hooks/useInput";
import { ErrorMessage, FindMain } from "@/styles/joinStyle";
import { FormEvent, useState } from "react";

const IdFind: React.FC = () => {
  // 인증하기 상태
  const [authState, setAuthState] = useState<boolean>(false);

  // email input 값
  const email = useInput("");

  // 에러 메시지
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();

    // 이메일 값이 비었는지 확인
    if (!email.value) {
      setErrorMessage("이메일을 입력해 주세요.");
      return;
    }

    try {
      const fetch = await idFindApi(email.value);
      console.log("인증 성공", fetch);
      setAuthState(!authState);
    } catch (error) {
      console.log("인증 실패", error);
    }
  };

  return (
    <FindMain>
      <h2 className="heading">아이디 찾기</h2>
      <form className="find_form">
        {/* 이메일 input */}
        <div className="find_wrap">
          <label htmlFor="email-input">이메일</label>
          <p className="infor_text">가입 시 입력하신 이메일을 입력해 주세요.</p>
          <input
            type="text"
            id="email-input"
            placeholder="이메일"
            onChange={email.onChange}
            value={email.value}
          />
          <button onClick={handleAuth}>인증</button>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </div>

        {authState && (
          /* 인증번호 input */
          <div className="find_wrap">
            <label htmlFor="auth-num">인증 번호</label>
            <p className="infor_text">전송된 인증 번호를 입력해 주세요.</p>
            <input type="text" id="auth-num" placeholder="인증 번호" />
          </div>
        )}
      </form>
    </FindMain>
  );
};

export default IdFind;
