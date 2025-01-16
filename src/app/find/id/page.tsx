"use client";
import useInput from "@/hooks/useInput";
import { FindMain } from "@/styles/joinStyle";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import accountFindApi from "@/api/idFindApi";
import AuthMessage from "@/components/authMessage";
import FindForm from "@/components/form/findlForm";

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
      const fetch = await accountFindApi(email.value);
      console.log("인증 성공", fetch);
      setAuthState(!authState);

      const maskedId = `${fetch.user_id.slice(0, -2)}**`;
      setAuthState(!authState);
      setFindId(maskedId);
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
      <h2 className="heading">아이디 찾기</h2>
      {!authState ? (
        <FindForm
          label="이메일"
          placeholder="이메일"
          inputProps={email}
          infoText="이메일"
          errorMessage={errorMessage}
          onSubmit={handleAuth}
        />
      ) : (
        <AuthMessage
          message={findId}
          buttonText="로그인"
          onButtonClick={() => router.push("/login")}
        />
      )}
    </FindMain>
  );
};

export default IdFind;
