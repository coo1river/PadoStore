"use client";
import { ProfileMain, UserProfile } from "@/styles/profileStyle";
import React from "react";

const Profile: React.FC = () => {
  return (
    <ProfileMain>
      <h2 className="a11y-hidden">프로필</h2>
      <UserProfile>
        <div className="img_profile" />
        <div>
          <p className="nickname">목긴알파카12</p>
          <p className="rating">⭐5.0</p>
        </div>
        <div className="btns_wrap">
          <button>
            찜 목록 <span>7</span>
          </button>
          <button>
            후기 <span>4</span>
          </button>
        </div>
      </UserProfile>

      <section className="list_wrap">
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
          <button>거래 중</button>
          <button>거래 완료</button>
          <ul>
            <li>최신 글1</li>
            <li>최신 글2</li>
            <li>최신 글3</li>
            <li>최신 글4</li>
            <li>최신 글5</li>
            <li>최신 글6</li>
            <li>최신 글7</li>
            <li>최신 글8</li>
            <li>최신 글9</li>
            <li>최신 글10</li>
            <li>최신 글11</li>
            <li>최신 글12</li>
          </ul>
          <p>- 1 -</p>
        </article>
      </section>
    </ProfileMain>
  );
};

export default Profile;
