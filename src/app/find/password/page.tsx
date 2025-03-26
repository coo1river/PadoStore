"use client";
import pwFindApi from "@/api/passwordFindApi";
import resetPasswordApi from "@/api/resetPasswordApi";
import verifyCodeApi from "@/api/verifyCodeApi";
import FindForm from "@/components/form/findForm";
import useInput from "@/hooks/useInput";
import useValid from "@/hooks/useValid";
import { ErrorMessage, FindMain } from "@/styles/joinStyle";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const PasswordFind: React.FC = () => {
  const router = useRouter();

  // 인증하기 상태
  const [authState, setAuthState] = useState<boolean>(false);

  // 인증 번호 확인 상태
  const [verifyState, setVerifyState] = useState<boolean>(false);

  // 이메일, 인증 번호, 비밀번호 input 값
  const userId = useInput("");
  const code = useInput("");
  const resetPw = useInput("");
  const pwCheck = useInput("");

  // 에러 메시지
  const [idErr, setIdErr] = useState<string>("");
  const [authErr, setAuthErr] = useState<string>("");

  // 유효성 검사 훅 사용
  const { error, PwValid, PwCheckValid } = useValid({
    password: resetPw.value,
    pwCheck: pwCheck.value,
  });

  const [authToken, setAuthToken] = useState(null);

  // 이메일 인증 함수
  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();

    // 아이디 값이 비었는지 확인
    if (!userId.value) {
      setIdErr("아이디를 입력해 주세요.");
      return;
    }

    try {
      const fetch = await pwFindApi(userId.value);
      setIdErr("");
      console.log("메일 발송 성공", fetch);
      setAuthState(!authState);
    } catch (error: any) {
      if (error.response.status === 400) {
        setIdErr("존재하지 않는 아이디입니다.");
        console.log("인증 실패", error);
      } else {
        setIdErr("서버에서 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        console.log("인증 실패", error);
      }
    }
  };

  // 인증 번호 확인 함수
  const handleVerifyCode = async (e: FormEvent) => {
    e.preventDefault();

    if (!code.value) {
      setAuthErr("인증번호를 입력해 주세요.");
    }

    try {
      const fetch = await verifyCodeApi(userId.value, code.value);

      setAuthToken(fetch);
      setVerifyState(!verifyState);
      console.log("인증 확인");
    } catch (error) {
      setAuthErr("인증 번호가 일치하지 않습니다.");
      console.log("인증 실패", error);
    }
  };

  const handleResetPw = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const fetch = await resetPasswordApi(
        authToken,
        userId.value,
        resetPw.value
      );
      console.log("비밀번호 재설정 완료", fetch);
      router.push("/login");
    } catch (error) {
      console.log("비밀번호 재설정 실패", error);
    }
  };

  return (
    <FindMain>
      <h2 className="heading">비밀번호 찾기</h2>
      <FindForm
        label="아이디"
        placeholder="아이디"
        inputProps={userId}
        infoText="아이디"
        errorMessage={idErr}
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
          <button onClick={handleVerifyCode}>인증</button>
          <ErrorMessage>{authErr}</ErrorMessage>
        </div>
      )}

      {verifyState && (
        <div className="find_wrap">
          <label htmlFor="reset-pw">새 비밀번호</label>
          <p className="infor_text">
            영소문자, 숫자, 특수문자(@, !, #, $)를 포함한 6자 - 16자
          </p>
          <input
            type="password"
            id="reset-pw"
            placeholder="비밀번호"
            onChange={resetPw.onChange}
            onBlur={PwValid}
            value={resetPw.value}
          />
          <ErrorMessage>{error.pwErr as string}</ErrorMessage>

          <div className="find_wrap">
            <label htmlFor="reset-pw-check">비밀번호 확인</label>
            <p className="infor_text">동일한 비밀번호를 입력해 주세요</p>
            <input
              type="password"
              id="reset-pw-check"
              placeholder="비밀번호"
              onChange={pwCheck.onChange}
              onBlur={PwCheckValid}
              value={pwCheck.value}
            />
            <button onClick={handleResetPw}>확인</button>
            <ErrorMessage>{error.pwCheckErr as string}</ErrorMessage>
          </div>
        </div>
      )}
    </FindMain>
  );
};

export default PasswordFind;
