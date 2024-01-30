"use client";
import { ProfileMain, UserProfile } from "@/styles/profileStyle";
import React from "react";

const Profile: React.FC = () => {
  return (
    <ProfileMain>
      <h2 className="a11y-hidden">프로필</h2>
      <article className="article_profile">
        <UserProfile>
          <div className="img_profile" />
          <p className="nickname">목긴알파카12</p>
        </UserProfile>
      </article>

      <div className="list_wrap">
        <nav>
          <ul className="nav_menu">
            <p>내 게시물</p>
            <li>거래 내역</li>
            <li>공구 내역</li>
            <p>구매 내역</p>
            <li>거래 내역</li>
            <li>공구 내역</li>
            <p>개인정보 수정</p>
            <li>프로필 설정</li>
            <li>입금 폼 설정</li>
          </ul>
        </nav>
        <article className="article_list">
          <ul>
            <li>최신 글1</li>
            <li>최신 글2</li>
            <li>최신 글3</li>
          </ul>
        </article>
      </div>
    </ProfileMain>
  );
};

export default Profile;
