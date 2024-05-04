"use client";
import myPurchaseListApi from "@/api/myPurchaseListApi";
import TradeStatusBtn from "@/components/button/tradeStatusBtn";
import { Data } from "@/components/postList/marketTab";
import MyGroupList from "@/components/profilePostList/myGroupList";
import useAuthStore from "@/store/useAuthStore";
import React, { useEffect, useState } from "react";

const MyGroupPurchaseList: React.FC = () => {
  // zustand에서 token 가져오기
  const { token, setToken } = useAuthStore();

  const [list, setList] = useState<Data | null>(null);

  // 현재 페이지 관리 기본 값 1페이지
  const [page, setPage] = useState<number>(1);

  // 현재 리스트 상태(거래 중/거래 완료) 관리
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

  // 최초 렌더링 시 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const data = await myPurchaseListApi("group", params);
      setList(data);
    };

    fetchData();
  }, [listState]);

  return (
    <>
      <TradeStatusBtn listState={listState} setListState={setListState} />
      <MyGroupList
        groupList={list?.groupOrderList || []}
        routePath="/orderDetail"
      />
    </>
  );
};

export default MyGroupPurchaseList;
