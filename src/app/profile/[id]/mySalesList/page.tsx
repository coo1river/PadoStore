"use client";
import mySalesListApi from "@/api/mySalesListApi";
import TradeStatusBtn from "@/components/button/tradeStatusBtn";
import { Data } from "@/components/postList/marketTab";
import MyMarketList from "@/components/profilePostList/myMarketList";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

const MySalesList: React.FC = () => {
  // zustand에서 token 가져오기
  const { token } = useAuthStore();

  // 라우터 사용
  const router = useRouter();

  const [list, setList] = useState<Data | null>(null);

  // 현재 페이지 관리 기본 값 1페이지
  const [page, setPage] = useState<number>(1);

  // 현재 리스트 상태(거래 중/거래 완료) 관리
  const [listState, setListState] = useState<string>("InProgress");

  const params = useMemo(
    () => ({
      user_id: token,
      board_type: "GroupPurchase",
      limit: 10,
      post_status: listState,
      current_page: page,
      sort_by: "post_id",
      order: "ASC",
    }),
    [token, listState, page]
  );

  // 최초 렌더링 시 데이터 가져오기
  useEffect(() => {
    if (!token) {
      Promise.resolve().then(() => {
        router.push("/home");
      });
      return;
    }

    const fetchData = async () => {
      const data = await mySalesListApi("market", params);
      setList(data);
    };

    fetchData();
  }, [listState, params, router, token]);

  return (
    <>
      <TradeStatusBtn listState={listState} setListState={setListState} />
      <MyMarketList marketList={list?.marketList || []} />
    </>
  );
};

export default MySalesList;
