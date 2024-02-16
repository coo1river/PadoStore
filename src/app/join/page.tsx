"use client";
import {
  ImgInput,
  ImgLabel,
  ImgProfile,
  ImgWrap,
  JoinMain,
} from "@/styles/joinStyle";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import ImgProfileBasic from "../../../public/assets/images/img-user-basic.png";
import useInput from "@/hooks/useInput";
import joinApi from "@/api/joinApi";

const Join: React.FC = () => {
  // 프로필 이미지 useState 값으로 저장
  const [imgProfile, setImgProfile] = useState<File | null>(null);

  // useRef 사용
  const InputRef = useRef<HTMLInputElement>(null);

  // 이미지 변경 함수
  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const selectedFile = e.target.files[0];
      setImgProfile(selectedFile);
    }
  };

  const form = {
    id: useInput(""),
    password: useInput(""),
    pwCheck: useInput(""),
    nickname: useInput(""),
    email: useInput(""),
    username: useInput(""),
    number: useInput(""),
  };

  const handleJoin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await joinApi({
        user_id: form.id.value,
        password: form.password.value,
        user_name: form.username.value,
        nickname: form.nickname.value,
        email: form.email.value,
        phone_number: form.number.value,
        uploadfile: imgProfile,
      });
      console.log("가입 성공", data);
    } catch (error) {
      console.error("가입 실패", error);
    }
  };

  return (
    <JoinMain>
      <h2 className="text_h2">회원가입</h2>
      <form className="join_form">
        <ImgWrap>
          <ImgProfile
            src={
              imgProfile ? URL.createObjectURL(imgProfile) : ImgProfileBasic.src
            }
          />
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
        <input type="text" id="input-id" placeholder="아이디" {...form.id} />
        <label htmlFor="input-pw">비밀번호</label>
        <input
          type="password"
          id="input-pw"
          placeholder="비밀번호"
          {...form.password}
        />
        <label htmlFor="input-pw">비밀번호 확인</label>
        <input
          type="password"
          id="input-pwchk"
          placeholder="비밀번호 확인"
          {...form.pwCheck}
        />
        <label htmlFor="input-nic">닉네임</label>
        <input
          type="text"
          id="input-nic"
          placeholder="닉네임"
          {...form.nickname}
        />

        <label htmlFor="input-email">이메일</label>
        <input
          type="text"
          id="input-email"
          placeholder="이메일"
          {...form.email}
        />

        <label htmlFor="input-pw">이름</label>
        <input
          type="text"
          id="input-name"
          placeholder="이름"
          {...form.username}
        />
        <label htmlFor="input-num">전화번호</label>
        <input
          type="text"
          id="input-num"
          placeholder="전화번호"
          {...form.number}
        />
        <button className="btn_join" onClick={handleJoin}>
          회원가입
        </button>
      </form>
    </JoinMain>
  );
};

export default Join;
