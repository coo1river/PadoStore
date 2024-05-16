"use client";
import { LoginInput, LoginBtn, SnsLogin, LoginMain } from "@/styles/loginStyle";
import React, { FormEvent, useState } from "react";
import iconNaver from "../../../public/assets/images/icon-naver.png";
import iconKakao from "../../../public/assets/images/icon-kakao.png";
import useInput from "@/hooks/useInput";
import loginApi from "@/api/loginApi";
import { ErrorMessage } from "@/styles/joinStyle";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

const Login: React.FC = () => {
  const router = useRouter();

  const form = {
    user_id: useInput(""),
    password: useInput(""),
  };

  const [error, setError] = useState<string>("");

  const { authState, setAuthState } = useAuthStore();
  const { token, setToken } = useAuthStore();

  // 로그인 함수(로그인 유효성 검사, api 호출)
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.user_id && !form.password) {
      setError("아이디와 비밀번호를 입력해 주세요.");
    } else if (!form.user_id) {
      setError("아이디를 입력해 주세요.");
    } else if (!form.password) {
      setError("비밀번호를 입력해 주세요.");
    } else {
      setError("");

      // 유효성 검사 통과 시 api 호출
      try {
        const loginRes = await loginApi({
          user_id: form.user_id.value,
          password: form.password.value,
        });

        // zustand로 토큰 전역 관리, 세션 스토리지에 관리
        setToken(loginRes);
        useAuthStore.getState().setToken(loginRes);
        setAuthState(true);
        sessionStorage.setItem("userToken", loginRes);
        router.push("/home");
      } catch {
        setError("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  // 카카오 로그인
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/login";

  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&
  redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = url;
  };

  return (
    <LoginMain>
      <h2 className="a11y-hidden">로그인</h2>
      <h3 className="login_text">로그인 하고 파도상점 이용하기</h3>
      <form>
        <div className="login_ipt_wrap">
          <div className="input_wrap">
            <label htmlFor="input-id" />
            <LoginInput
              id="input-id"
              placeholder="아이디"
              type="text"
              value={form.user_id.value}
              onChange={form.user_id.onChange}
            />
          </div>

          <div className="input_wrap">
            <label htmlFor="input-pw" />
            <LoginInput
              id="input-pw"
              placeholder="비밀번호"
              type="password"
              value={form.password.value}
              onChange={form.password.onChange}
            />
          </div>
        </div>

        <ErrorMessage>{error}</ErrorMessage>
        <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
      </form>

      <div className="text_join">
        <p>아직 회원이 아니신가요?</p>
        <button className="btn_join" onClick={() => router.push("/join")}>
          회원가입
        </button>
      </div>

      <SnsLogin>
        <h4>SNS 로그인</h4>
        <div className="btn_wrap">
          <button className="icon_kakao" onClick={handleKakaoLogin}>
            카카오로 로그인
            <img src={iconKakao.src} alt="" />
          </button>
          <button className="icon_naver">
            네이버로 로그인
            <img src={iconNaver.src} alt="" />
          </button>
        </div>
      </SnsLogin>
    </LoginMain>
  );
};

export default Login;
