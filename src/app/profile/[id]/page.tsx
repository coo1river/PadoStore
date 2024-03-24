"use client";
import { ArticleList, ProfileMain, UserProfile } from "@/styles/profileStyle";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import viewProfileApi, { ViewProfileRes } from "@/api/viewProfileApi";
import { ImgProfile } from "@/styles/profileStyle";
import mySalesListApi from "@/api/mySalesListApi";
import { Data } from "@/components/postList/marketTab";
import myPurchaseListApi from "@/api/myPurchaseListApi";
import MyGroupList from "@/components/profilePostList/myGroupList";
import MyMarketList from "@/components/profilePostList/myMarketList";

const Profile: React.FC = () => {
  const router = useRouter();

  // zustand에서 token 가져오기
  const { token, setToken } = useAuthStore();

  // api로 data와 list 정보 담기
  const [data, setData] = useState<ViewProfileRes | null>(null);
  const [list, setList] = useState<Data | null>(null);

  // 현재 페이지 관리 기본 값 1페이지
  const [page, setPage] = useState<number>(1);

  // 현재 리스트 타입(마켓/공구) 관리
  const [listType, setListType] = useState<string>("market");

  const [listTab, setListTab] = useState<string>("Sales");

  // 현재 리스트 상태(거래 중/거래 완료) 관리
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

  const [listTap, setlistTap] = useState("mySales");

  let listRender;

  switch (listTap) {
    case "mySales":
      listRender = <MyMarketList marketList={list?.marketList || []} />;
      break;
    case "myPurchase":
      listRender = <MyMarketList marketList={list?.marketList || []} />;
      break;
    case "myGroupSales":
      listRender = <MyGroupList groupList={list?.groupOrderList || []} />;
      break;
    case "myGroupPurchase":
      listRender = <MyGroupList groupList={list?.groupOrderList || []} />;
      break;
    default:
      listRender = null;
  }

  useEffect(() => {
    switch (listTap) {
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
  }, [listTap]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiCall;
        if (listTab === "Sales") {
          apiCall = mySalesListApi;
        } else if (listTab === "Purchase") {
          apiCall = myPurchaseListApi;
        }

        if (apiCall) {
          const listData = await apiCall(listType, params);
          setList(listData);
        }
      } catch (error) {
        console.error("error:", error);
      }
    };

    fetchData();
  }, [listTab, listType, listState, page]);

  useEffect(() => {
    console.log("listTab", listTab);
    console.log("listType", listType);
  }, [listType, listTab]);

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
              className={listTap === "mySales" ? "active" : ""}
              onClick={() => {
                setlistTap("mySales");
                setListType("market");
              }}
            >
              판매 내역
            </li>
            <li
              className={listTap === "myPurchase" ? "active" : ""}
              onClick={() => {
                setlistTap("myPurchase");
                setListType("market");
              }}
            >
              구매 내역
            </li>

            <p>공구 내역</p>
            <li
              className={listTap === "myGroupSales" ? "active" : ""}
              onClick={() => {
                setlistTap("myGroupSales");
                setListType("group");
              }}
            >
              판매 폼
            </li>
            <li
              className={listTap === "myGroupPurchase" ? "active" : ""}
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
