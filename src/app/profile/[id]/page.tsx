"use client";
import { ArticleList, ProfileMain, UserProfile } from "@/styles/profileStyle";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import viewProfileApi, { ViewProfileRes } from "@/api/viewProfileApi";
import { ImgProfile } from "@/styles/profileStyle";
import mySalesListApi from "@/api/mySalesListApi";
import MyPurchaseList from "@/components/profilePostList/myPurchaseList";
import MySalesList from "@/components/profilePostList/mySalesList";
import MyGroupPurchaseList from "@/components/profilePostList/myGroupPurchaseList";
import MyGroupSalesList from "@/components/profilePostList/myGroupSalesList";
import { Data } from "@/components/postList/marketTab";

const Profile: React.FC = () => {
  const router = useRouter();

  // zustand에서 token 가져오기
  const { token, setToken } = useAuthStore();

  // api로 data와 list 정보 담기
  const [data, setData] = useState<ViewProfileRes | null>(null);
  const [list, setList] = useState<Data | null>(null);

  // 현재 페이지 관리 기본 값 1페이지
  const [page, setPage] = useState<number>(1);

  const [listType, setListType] = useState<string>("market");

  const [listState, setListState] = useState<string>("InProgress");

  const setActiveClass = (status: string) => {
    return listState === status ? "active" : "";
  };

  const params = {
    user_id: token,
    board_type: "GroupPurchase",
    limit: 10,
    post_status: listState,
    current_page: page,
    sort_by: "post_id",
    order: "ASC",
  };

  // 최초 렌더링 시 user 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, listData] = await Promise.all([
          viewProfileApi(token),
          mySalesListApi(listType, params),
        ]);

        setData(profileData);
        setList(listData);
      } catch (error) {
        console.error("error:", error);
      }
    };

    fetchData();
  }, []);

  // listState(거래 중, 거래 완료) 탭 전환 시 api 요청
  useEffect(() => {
    const fetchData = async () => {
      const data = await mySalesListApi(listType, params);
      setList(data);
    };
    fetchData();
  }, [listState]);

  const [listTap, setlistTap] = useState("mySales");

  useEffect(() => {
    const fetchData = async () => {
      const data = await mySalesListApi(listType, params);
      setList(data);
    };
    fetchData();
  }, [listType]);

  let listRender;

  switch (listTap) {
    case "mySales":
      listRender = <MySalesList marketList={list?.marketList || []} />;
      break;
    case "myPurchase":
      listRender = <MyPurchaseList />;
      break;
    case "myGroupSales":
      listRender = <MyGroupSalesList groupList={list?.groupOrderList || []} />;
      break;
    case "myGroupPurchase":
      listRender = <MyGroupPurchaseList />;
      break;
    default:
      listRender = null;
  }

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
          <button>
            찜 목록 <span>{data?.favoriteCount}</span>
          </button>
          <button>
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
              onClick={() => {
                setlistTap("mySales");
                setListType("market");
              }}
            >
              판매 내역
            </li>
            <li
              onClick={() => {
                setlistTap("myPurchase");
                setListType("market");
              }}
            >
              구매 내역
            </li>

            <p>공구 내역</p>
            <li
              onClick={() => {
                setlistTap("myGroupSales");
                setListType("group");
              }}
            >
              판매 폼
            </li>
            <li
              onClick={() => {
                setlistTap("myGroupPurchase");
                setListType("group");
              }}
            >
              구매 폼
            </li>
            <p>개인정보 수정</p>
            <li onClick={() => router.push(`/profile/${token}/edit`)}>
              프로필 설정
            </li>
            <li>입금 폼 설정</li>
          </ul>
        </nav>

        {/* 게시물 목록 */}
        <ArticleList>
          <button
            type="button"
            className={`btn_tab ${setActiveClass("InProgress")}`}
            onClick={() => setListState("InProgress")}
          >
            거래 중
          </button>
          <button
            type="button"
            className={`btn_tab ${setActiveClass("Completed")}`}
            onClick={() => setListState("Completed")}
          >
            거래 완료
          </button>
          {listRender}
        </ArticleList>
      </section>
    </ProfileMain>
  );
};

export default Profile;
