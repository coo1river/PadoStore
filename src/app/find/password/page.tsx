"use client";
import accountFindApi from "@/api/accountFindApi";
import EmailForm from "@/components/form/emailForm";
import useInput from "@/hooks/useInput";
import { FindMain } from "@/styles/joinStyle";
import { FormEvent, useState } from "react";

const PasswordFind: React.FC = () => {
  // 인증하기 상태
  const [authState, setAuthState] = useState<boolean>(false);

  // email input 값
  const email = useInput("");

  // 에러 메시지
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [findMessage, setFindMessage] = useState<string>("");

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();

    // 이메일 값이 비었는지 확인
    if (!email.value) {
      setErrorMessage("이메일을 입력해 주세요.");
      return;
    }

    try {
      const fetch = await accountFindApi("pw", email.value);
      console.log("인증 성공", fetch);
      setAuthState(!authState);
      setFindMessage(`가입하신 아이디는 ${fetch.user_id}입니다.`);
    } catch (error) {
      setErrorMessage("존재하지 않는 이메일입니다.");
      console.log("인증 실패", error);
    }
  };

  return (
    <FindMain>
      <h2>비밀번호 찾기</h2>
      {!authState ? (
        <EmailForm
          email={email}
          errorMessage={errorMessage}
          onSubmit={handleAuth}
        />
      ) : (
        <div>
          <p>{findMessage}</p>
          <div className="find_wrap">
            <label htmlFor="auth-num">인증 번호</label>
            <input type="text" id="auth-num" placeholder="인증 번호" />
          </div>
        </div>
      )}
    </FindMain>
  );
};

export default PasswordFind;
