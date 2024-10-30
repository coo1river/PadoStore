"use client";
import accountFindApi from "@/api/accountFindApi";
import resetPasswordApi from "@/api/resetPasswordApi";
import verifyCodeApi from "@/api/verifyCodeApi";
import EmailForm from "@/components/form/emailForm";
import useInput from "@/hooks/useInput";
import { ErrorMessage, FindMain } from "@/styles/joinStyle";
import { FormEvent, useState } from "react";

const PasswordFind: React.FC = () => {
  // 인증하기 상태
  const [authState, setAuthState] = useState<boolean>(false);

  // 인증 번호 확인 상태
  const [verifyState, setVerifyState] = useState<boolean>(false);

  // 이메일, 인증 번호, 비밀번호 input 값
  const email = useInput("");
  const code = useInput("");
  const resetPw = useInput("");

  // 에러 메시지
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 이메일 인증 함수
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

  // 인증 번호 확인 함수
  const handleVerifyCode = async (e: FormEvent) => {
    e.preventDefault();

    if (!code.value) {
      setErrorMessage("인증번호를 입력해 주세요.");
    }

    try {
      const fetch = await verifyCodeApi(email.value, code.value);
      setVerifyState(!verifyState);
      console.log("인증 확인", fetch);
    } catch (error) {
      console.log("인증 실패", error);
    }
  };

  const handleResetPw = async (e: FormEvent) => {
    e.preventDefault();

    if (!resetPw.value) {
      setErrorMessage("새로운 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      const fetch = await resetPasswordApi(token, resetPw.value);
      console.log("비밀번호 재설정 완료", fetch);
    } catch (error) {
      console.log("비밀번호 재설정 실패", error);
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
      {authState && (
        <div className="find_wrap">
          <label htmlFor="auth-num">인증 번호</label>
          <p className="infor_text">
            이메일에 발송된 인증 번호를 입력해 주세요.
          </p>
          <input
            type="number"
            id="auth-num"
            placeholder="인증 번호"
            onChange={code.onChange}
            value={code.value}
          />
          <button onClick={handleVerifyCode}>확인</button>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </div>
      )}

      {verifyState && (
        <div className="find_wrap">
          <label htmlFor="reset-pw">비밀번호 재설정</label>
          <p className="infor_text">
            영소문자, 숫자, 특수문자(@, !, #, $)를 포함한 6자 - 16자
          </p>
          <input
            type="text"
            id="reset-pw"
            placeholder="비밀번호"
            onChange={resetPw.onChange}
            value={resetPw.value}
          />
          <button onClick={handleResetPw}>확인</button>
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </div>
      )}
    </FindMain>
  );
};

export default PasswordFind;
