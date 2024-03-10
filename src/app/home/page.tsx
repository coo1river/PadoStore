"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HomeMain, MainBanner } from "@/styles/homeStyle";
import bannerImg from "../../../public/assets/images/banner.png";
import ProductSection from "@/components/homeSection/productSection";
import GroupSection from "@/components/homeSection/groupSection";
import homeListApi from "@/api/homeListApi";
import MarketTab from "@/components/postList/marketTab";
import GroupPurchaseTab from "@/components/postList/groupPurchaseTab";

export interface HomeList {
  post_id: number;
  user_id: string;
  board_type: string;
  title: string;
  content: string;
  file_group_id: string;
  view_count: number;
  insert_dt: string;
  update_dt: string | null;
  post_status: string;
}

interface HomeData {
  marketList: HomeList[];
  groupOrderList: HomeList[];
}

const Home: React.FC = () => {
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    const homeData = async () => {
      const data = await homeListApi();
      setData(data);
    };

    homeData();
  }, []);

  const [tabStatus, setTabStatus] = useState<string>("Home");

  const setActiveClass = (status: string) => {
    return tabStatus === status ? "active" : "";
  };

  const renderTabContent = () => {
    switch (tabStatus) {
      case "Home":
        return (
          <>
            <ProductSection productList={data?.marketList || []} />
            <GroupSection />
          </>
        );
      case "Market":
        return <MarketTab />;
      case "GroupPurchase":
        return <GroupPurchaseTab />;
      default:
        return null;
    }
  };

  return (
    <HomeMain>
      <h2 className="a11y-hidden">홈</h2>
      <MainBanner>
        <Image src={bannerImg} alt="배너 이미지" />
      </MainBanner>
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
      {renderTabContent()}
    </HomeMain>
  );
};

export default Home;
