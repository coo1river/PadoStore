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

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();

    // 이메일 값이 비었는지 확인
    if (!email.value) {
      setErrorMessage("이메일을 입력해 주세요.");
      return;
    }

    try {
      const fetch = await accountFindApi("id", email.value);
      console.log("인증 성공", fetch);
      setAuthState(!authState);
    } catch (error: any) {
      if (error.response.status === 400) {
        setErrorMessage("존재하지 않는 이메일입니다.");
        console.log("인증 실패", error);
      } else {
        setErrorMessage(
          "서버에서 문제가 발생했습니다. 잠시 후 다시 시도해 주세요."
        );
        console.log("인증 실패", error);
      }
    }
  };

  return (
    <FindMain>
      <h2 className="heading">비밀번호 찾기</h2>
      <EmailForm
        email={email}
        errorMessage={errorMessage}
        onSubmit={handleAuth}
      />
      {!authState && (
        <div>
          <div className="find_wrap">
            <label htmlFor="auth-num">인증 번호</label>
            <p className="infor_text">
              이메일에 발송된 인증 번호를 입력해 주세요.
            </p>
            <input type="text" id="auth-num" placeholder="인증 번호" />
            <button>확인</button>
          </div>
        </div>
      )}
    </FindMain>
  );
};

export default PasswordFind;
