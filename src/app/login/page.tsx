import { LoginMain, LoginInput, LoginBtn, SnsLogin } from "@/styles/loginStyle";
import React from "react";

const Login: React.FC = () => {
  return (
    <LoginMain>
      <h2 className="a11y-hidden">로그인</h2>
      <h3 className="login_text">로그인 하고 파도상점 이용하기</h3>
      <form>
        <div className="login_ipt_wrap">
          <div className="input_wrap">
            <label htmlFor="input-id" />
            <LoginInput id="input-id" placeholder="아이디" type="text" />
          </div>

          <div className="input_wrap">
            <label htmlFor="input-pw" />
            <LoginInput id="input-pw" placeholder="비밀번호" type="password" />
          </div>
        </div>

        <LoginBtn>로그인</LoginBtn>
      </form>

      <div className="text_join">
        <p>아직 회원이 아니신가요?</p>
        <button className="btn_join">회원가입</button>
      </div>

      <SnsLogin>
        <h4>SNS 로그인</h4>
        <div className="btn_wrap">
          <button className="icon_x" />
          <button className="icon_kakao" />
        </div>
      </SnsLogin>
    </LoginMain>
  );
};

export default Login;
