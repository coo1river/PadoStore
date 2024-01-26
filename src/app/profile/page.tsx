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
            <p>개인정보 수정</p>
            <li>배송지 설정</li>
            <li>계좌 설정</li>
            <p>글 관리</p>
            <li>판매 글</li>
            <li>구매 글</li>
            <li>교환 글</li>
            <li>공구 글</li>
          </ul>
        </nav>
        <article className="article_list">
          <ul>
            <li>판매 글</li>
            <li>판매 글</li>
            <li>판매 글</li>
          </ul>
        </article>
      </div>
    </ProfileMain>
  );
};

export default Profile;
