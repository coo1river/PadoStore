"use client";
import React from "react";
import TabContent from "@/components/pages/home/tabContent";
import { HomeTabProps } from "@/types/home/home.types";
import useTabStatus from "@/hooks/pages/home/useTabStatus";

export default function HomeTab({
  marketList = [],
  groupOrderList = [],
}: HomeTabProps) {
  // 현재 탭 상태 관리
  const { tabStatus, setTabStatus, setActiveClass } = useTabStatus();
  return (
    <>
      <nav>
        <ul className="menu_tab">
          <li
            className={`btn_tab ${setActiveClass("Home")}`}
            onClick={() => setTabStatus("Home")}
          >
            메인
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
      </nav>
      <TabContent
        tabStatus={tabStatus}
        marketList={marketList}
        groupOrderList={groupOrderList}
      />
    </>
  );
}
