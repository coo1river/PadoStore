"use client";
import searchApi from "@/api/searchApi";
import Pagination from "@/components/pagination";
import GroupPurchaseTab from "@/components/postList/groupPurchaseTab";
import MarketTab from "@/components/postList/marketTab";
import { HomeMain } from "@/styles/homeStyle";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Search() {
  const [tabStatus, setTabStatus] = useState<string>("Total");

  const { keywords } = useParams<{ keywords?: string }>();

  // 검색어 관리
  const decodedKeywords = keywords ? decodeURIComponent(keywords) : "";

  // 포스트 개수 관리
  const [marketPosts, setMarketPosts] = useState<number>(0);
  const [groupPosts, setGroupPosts] = useState<number>(0);

  // 현재 페이지 관리
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      if (tabStatus === "Total") {
        const res = await searchApi("market", {
          limit: 5,
          current_page: page,
          searchItem: decodedKeywords,
        });
        setGroupPosts(res.totalCount);
      }
    };
    fetchData();
  }, [page, tabStatus, decodedKeywords]);

  const setActiveClass = (status: string) => {
    return tabStatus === status ? "active" : "";
  };

  const renderTabContent = () => {
    switch (tabStatus) {
      case "Total":
        return (
          <>
            <MarketTab api={"search"} keywords={decodedKeywords} page={page} />
            <GroupPurchaseTab
              api={"search"}
              keywords={decodedKeywords}
              page={page}
            />
            <Pagination
              totalPosts={marketPosts + groupPosts}
              page={page}
              setPage={setPage}
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
              setTotalPosts={setMarketPosts}
            />
            <Pagination
              totalPosts={marketPosts}
              page={page}
              setPage={setPage}
            />
          </>
        );
      case "GroupPurchase":
        return (
          <>
            <GroupPurchaseTab
              api={"search"}
              keywords={decodedKeywords}
              page={page}
              setTotalPosts={setGroupPosts}
            />
            <Pagination totalPosts={groupPosts} page={page} setPage={setPage} />
          </>
        );
    }
  };

  return (
    <HomeMain>
      <h2 className="a11y-hidden">검색</h2>
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
