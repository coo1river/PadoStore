"use client";
import {
  ImgInput,
  ImgLabel,
  ImgProfile,
  ImgWrap,
  JoinMain,
} from "@/styles/joinStyle";
import { ChangeEvent, useRef, useState } from "react";
import ImgProfileBasic from "../../../public/assets/images/img-user-basic.png";

const Join: React.FC = () => {
  // 프로필 이미지 useState 값으로 저장
  const [imgProfile, setImgProfile] = useState<string | null>(null);

  // useRef 사용
  const InputRef = useRef<HTMLInputElement>(null);

  // 이미지 변경 함수
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const fileURL = URL.createObjectURL(e.target.files?.[0]);
      setImgProfile(fileURL);
    }
  };

  return (
    <JoinMain>
      <h2 className="text_h2">회원가입</h2>
      <form className="join_form">
        <ImgWrap>
          <ImgProfile src={imgProfile || ImgProfileBasic.src} />
          <ImgLabel htmlFor="img-profile" />
          <ImgInput
            type="file"
            id="img-profile"
            accept="image/*"
            onChange={onChangeFile}
            ref={InputRef}
          />
        </ImgWrap>

        <label htmlFor="input-id">아이디</label>
        <input type="text" id="input-id" placeholder="아이디" />

        <label htmlFor="input-pw">비밀번호</label>
        <input type="password" id="input-pw" placeholder="비밀번호" />

        <label htmlFor="input-pw">비밀번호 확인</label>
        <input type="password" id="input-pwchk" placeholder="비밀번호 확인" />

        <label htmlFor="input-nic">닉네임</label>
        <input type="text" id="input-nic" placeholder="닉네임" />

        <label htmlFor="input-pw">이름</label>
        <input type="text" id="input-name" placeholder="이름" />

        <label htmlFor="input-num">전화번호</label>
        <input type="text" id="input-num" placeholder="전화번호" />

        <button className="btn_join">다음</button>
      </form>
    </JoinMain>
  );
};

export default Join;
