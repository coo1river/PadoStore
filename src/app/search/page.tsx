"use client";
import GroupPurchaseTab from "@/components/postList/groupPurchaseTab";
import MarketTab from "@/components/postList/marketTab";
import { HomeMain } from "@/styles/homeStyle";
import React, { useState } from "react";

export default function Search() {
  const [tabStatus, setTabStatus] = useState<string>("Market");

  const setActiveClass = (status: string) => {
    return tabStatus === status ? "active" : "";
  };

  const renderTabContent = () => {
    switch (tabStatus) {
      case "Market":
        return <MarketTab api={"search"} />;
      case "GroupPurchase":
        return <GroupPurchaseTab api={"search"} />;
      default:
        return null;
    }
  };

  return (
    <HomeMain>
      <ul className="menu_tab">
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
