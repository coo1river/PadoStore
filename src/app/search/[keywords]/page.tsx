"use client";
import Pagination from "@/components/pagination";
import GroupPurchaseTab from "@/components/postList/groupPurchaseTab";
import MarketTab from "@/components/postList/marketTab";
import { HomeMain } from "@/styles/homeStyle";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function Search() {
  const [tabStatus, setTabStatus] = useState<string>("Total");

  const { keywords } = useParams<{ keywords?: string }>();

  const decodedKeywords = keywords ? decodeURIComponent(keywords) : "";

  // 총 포스트 개수 관리
  const [totalPosts, setTotalPosts] = useState<number>(0);

  // 현재 페이지 관리
  const [page, setPage] = useState<number>(1);

  const setActiveClass = (status: string) => {
    return tabStatus === status ? "active" : "";
  };

  const renderTabContent = () => {
    switch (tabStatus) {
      case "Total":
        return (
          <>
            <MarketTab
              api={"search"}
              keywords={decodedKeywords}
              page={page}
              setTotalPosts={setTotalPosts}
            />
            <GroupPurchaseTab
              api={"search"}
              keywords={decodedKeywords}
              page={page}
              setTotalPosts={setTotalPosts}
            />
          </>
        );

      case "Market":
        return (
          <>
            <MarketTab
              api={"search"}
              keywords={decodedKeywords}
              page={page}
              setTotalPosts={setTotalPosts}
            />
            <Pagination totalPosts={totalPosts} page={page} setPage={setPage} />
          </>
        );
      case "GroupPurchase":
        return (
          <>
            <GroupPurchaseTab
              api={"search"}
              keywords={decodedKeywords}
              page={page}
              setTotalPosts={setTotalPosts}
            />
            <Pagination totalPosts={totalPosts} page={page} setPage={setPage} />
          </>
        );
    }
  };

  return (
    <HomeMain>
      <ul className="menu_tab">
        <li
          className={`btn_tab ${setActiveClass("Total")}`}
          onClick={() => setTabStatus("Total")}
        >
          전체
        </li>
        <li
          className={`btn_tab ${setActiveClass("Market")}`}
          onClick={() => setTabStatus("Market")}
        >
          판매 / 구매 / 교환
        </li>
        <li
          className={`btn_tab ${setActiveClass("GroupPurchase")}`}
          onClick={() => setTabStatus("GroupPurchase")}
        >
          공동구매
        </li>
      </ul>

      {renderTabContent()}
    </HomeMain>
  );
}
