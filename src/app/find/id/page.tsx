"use client";
import idFindApi from "@/api/idFindApi";
import useInput from "@/hooks/useInput";
import {
  AuthWrap,
  ErrorMessage,
  FindMain,
  FindMessage,
} from "@/styles/joinStyle";
import { useRouter } from "next/navigation";
import { LoginBtn } from "@/styles/loginStyle";
import { FormEvent, useState } from "react";

const IdFind: React.FC = () => {
  // 인증하기 상태
  const [authState, setAuthState] = useState<boolean>(false);
  // 라우터 사용
  const router = useRouter();

  // email input 값
  const email = useInput("");

  // 에러 메시지
  const [errorMessage, setErrorMessage] = useState<string>("");

  //
  const [findId, setFindId] = useState<string>("");

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
      setFindId(fetch.user_id);
    } catch (error) {
      setErrorMessage("존재하지 않는 이메일입니다.");
      console.log("인증 실패", error);
    }
  };

  return (
    <FindMain>
      <h2 className="heading">아이디 찾기</h2>
      <form className="find_form">
        {!authState ? (
          // 인증 전
          <div className="find_wrap">
            <label htmlFor="email-input">이메일</label>
            <p className="infor_text">
              가입 시 입력하신 이메일을 입력해 주세요.
            </p>
            <input
              type="text"
              id="email-input"
              placeholder="이메일"
              onChange={email.onChange}
              value={email.value}
            />
            <button onClick={handleAuth}>인증</button>
            <ErrorMessage>{errorMessage || findId}</ErrorMessage>
          </div>
        ) : (
          // 인증 후 아이디 메시지 출력
          <AuthWrap>
            <FindMessage>
              가입하신 아이디는 <span>{findId}</span>입니다.
            </FindMessage>
            <LoginBtn onClick={() => router.push("/login")}>로그인</LoginBtn>
          </AuthWrap>
        )}
      </form>
    </FindMain>
  );
};
export default IdFind;
