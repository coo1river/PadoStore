"use client";
import { ArticleList, ProfileMain, UserProfile } from "@/styles/profileStyle";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import viewProfileApi, { ViewProfileRes } from "@/api/viewProfileApi";
import { ImgProfile } from "@/styles/profileStyle";
import mySalesListApi from "@/api/mySalesListApi";
import { Data } from "@/components/postList/marketTab";
import useDecodedToken from "@/hooks/useDecodedToken";
import useProfileStore from "@/store/useProfileStore";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // zustand에서 저장된 값 가져오기
  const { token, setToken } = useAuthStore();
  const { listMenu, setListMenu } = useProfileStore();

  // 토큰 디코딩 커스텀 훅으로 user id 추출
  const userId = useDecodedToken(token!);

  // api로 data와 list 정보 담기
  const [data, setData] = useState<ViewProfileRes | null>(null);
  const [list, setList] = useState<Data | null>(null);

  // 현재 페이지 관리 기본 값 1페이지
  const [page, setPage] = useState<number>(1);

  // 현재 리스트 타입(마켓/공구) 관리
  const [listType, setListType] = useState<string>("market");

  const [listTab, setListTab] = useState<string>("Sales");

  const [listState, setListState] = useState<string>("InProgress");

  const params = {
    user_id: token,
    board_type: "GroupPurchase",
    limit: 10,
    post_status: listState,
    current_page: page,
    sort_by: "post_id",
    order: "ASC",
  };

  // profile data 가져오기
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [profileData, listData] = await Promise.all([
          viewProfileApi(userId),
          mySalesListApi(listType, params),
        ]);

        setData(profileData);
        setList(listData);
      } catch (error) {
        console.error("error:", error);
      }
    };

    fetchData();
  }, [userId, listType, listState, page]);

  // 각 탭에 따른 컴포넌트 렌더
  useEffect(() => {
    let path;
    switch (listMenu) {
      case "mySales":
        path = `/profile/${userId}/mySalesList`;
        break;
      case "myPurchase":
        path = `/profile/${userId}/myPurchaseList`;
        break;
      case "myGroupSales":
        path = `/profile/${userId}/myGroupSalesList`;
        break;
      case "myGroupPurchase":
        path = `/profile/${userId}/myGroupPurchaseList`;
        break;
      default:
        return;
    }

    router.push(path);
  }, [listMenu]);

  useEffect(() => {
    switch (listMenu) {
      case "mySales":
      case "myGroupSales":
        setListTab("Sales");
        break;
      case "myPurchase":
      case "myGroupPurchase":
        setListTab("Purchase");
        break;
      default:
        break;
    }
  }, [listMenu]);

  return (
    <ProfileMain>
      <h2 className="a11y-hidden">프로필</h2>
      <UserProfile>
        {/* 유저 프로필 */}
        <ImgProfile
          src={
            data?.userFile ? `/upload/${data?.userFile?.up_file}` : undefined
          }
        />
        <div>
          <p className="nickname">{data?.user.nickname}</p>
          <p className="rating">⭐5.0</p>
        </div>
        <div className="btns_wrap">
          <button
            onClick={() => router.push(`/profile/${userId}/postLikeList`)}
          >
            찜 목록 <span>{data?.favoriteCount}</span>
          </button>
          <button onClick={() => router.push(`/profile/${userId}/reviewList`)}>
            후기 <span>{data?.reviewCount}</span>
          </button>
        </div>
      </UserProfile>

      {/* 사이드 메뉴 바 */}
      <section className="list_wrap">
        <nav>
          <ul className="nav_menu">
            <p>거래 내역</p>
            <li
              className={listMenu === "mySales" ? "active" : ""}
              onClick={() => {
                setListMenu("mySales");
                setListType("market");
              }}
            >
              판매 내역
            </li>
            <li
              className={listMenu === "myPurchase" ? "active" : ""}
              onClick={() => {
                setListMenu("myPurchase");
                setListType("market");
              }}
            >
              구매 내역
            </li>

            <p>공구 내역</p>
            <li
              className={listMenu === "myGroupSales" ? "active" : ""}
              onClick={() => {
                setListMenu("myGroupSales");
                setListType("group");
              }}
            >
              판매 폼
            </li>
            <li
              className={listMenu === "myGroupPurchase" ? "active" : ""}
              onClick={() => {
                setListMenu("myGroupPurchase");
                setListType("group");
              }}
            >
              구매 폼
            </li>
            <p>개인정보 수정</p>
            <li onClick={() => router.push(`/editProfile/${userId}`)}>
              프로필 설정
            </li>
            <li onClick={() => router.push(`/editAccountInfo/${userId}`)}>
              입금 폼 설정
            </li>
          </ul>
        </nav>

        {/* 게시물 목록 */}
        <ArticleList>{children}</ArticleList>
      </section>
    </ProfileMain>
  );
}

export default ProfileLayout;
