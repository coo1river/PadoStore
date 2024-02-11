"use client";
import { ProfileMain, UserProfile } from "@/styles/profileStyle";
import React, { useState } from "react";
import MyPost from "@/components/postList/myPost";
import MyForm from "@/components/postList/myForm";
import MyPurchase from "@/components/postList/myPurchase";
import GroupPurchase from "@/components/postList/groupPurchase";

const Profile: React.FC = () => {
  const [listState, setListState] = useState("myPost");

  let listRender;

  switch (listState) {
    case "myPost":
      listRender = <MyPost />;
      break;
    case "myForm":
      listRender = <MyForm />;
      break;
    case "myPurchase":
      listRender = <MyPurchase />;
      break;
    case "partForm":
      listRender = <GroupPurchase />;
      break;
    default:
      listRender = null;
  }

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
            <li onClick={() => setListState("myPost")}>거래 내역</li>
            <li onClick={() => setListState("myForm")}>공구 내역</li>

            <p>구매 내역</p>
            <li onClick={() => setListState("myPurchase")}>거래 내역</li>
            <li onClick={() => setListState("partForm")}>공구 내역</li>
            <p>개인정보 수정</p>
            <li>프로필 설정</li>
            <li>입금 폼 설정</li>
          </ul>
        </nav>
        {listRender}
      </section>
    </ProfileMain>
  );
};

export default Profile;
