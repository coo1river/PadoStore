"use client";
import { ProfileMain, UserProfile } from "@/styles/profileStyle";
import React, { useState } from "react";
import MyPost from "@/components/profilePostList/myPost";
import MyForm from "@/components/profilePostList/myForm";
import MyPurchase from "@/components/profilePostList/myPurchase";
import GroupPurchase from "@/components/profilePostList/groupPurchase";
import { useRouter } from "next/navigation";

const Profile: React.FC = () => {
  const router = useRouter();

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
            <p>거래 내역</p>
            <li onClick={() => setListState("myPost")}>판매 내역</li>
            <li onClick={() => setListState("myForm")}>구매 내역</li>

            <p>공구 내역</p>
            <li onClick={() => setListState("myPurchase")}>판매 폼</li>
            <li onClick={() => setListState("partForm")}>구매 폼</li>
            <p>개인정보 수정</p>
            <li onClick={() => router.push("/profile/edit")}>프로필 설정</li>
            <li>입금 폼 설정</li>
          </ul>
        </nav>
        {listRender}
      </section>
    </ProfileMain>
  );
};

export default Profile;
