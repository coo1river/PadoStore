"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { HomeMain, MainBanner } from "@/styles/homeStyle";
import bannerImg from "../../../public/assets/images/banner.png";
import ProductSection, {
  GroupOrderList,
} from "@/components/homeSection/productSection";
import GroupSection from "@/components/homeSection/groupSection";
import homeListApi from "@/api/homeListApi";
import MarketTab, { MarketItem } from "@/components/postList/marketTab";
import GroupPurchaseTab from "@/components/postList/groupPurchaseTab";
import { useRouter } from "next/navigation";

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

export interface HomeData {
  groupOrderList: GroupOrderList[];
  marketList: MarketItem[];
}

const Home: React.FC = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const router = useRouter();

  // 탭 관리
  const [tabStatus, setTabStatus] = useState<string>("Home");

  useEffect(() => {
    const homeData = async () => {
      const data = await homeListApi("InProgress");
      setData(data);
    };
    homeData();
  }, []);

  const setActiveClass = (status: string) => {
    return tabStatus === status ? "active" : "";
  };

  const renderTabContent = () => {
    switch (tabStatus) {
      case "Home":
        return (
          <>
            <ProductSection marketList={data?.marketList || []} />
            <GroupSection groupOrderList={data?.groupOrderList || []} />
          </>
        );
      case "Market":
        return (
          <>
            <MarketTab api={"hometab"} />
          </>
        );
      case "GroupPurchase":
        return (
          <>
            <GroupPurchaseTab api={"hometab"} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <HomeMain>
      <h2 className="a11y-hidden">홈</h2>
      <MainBanner>
        <Image
          onClick={() => router.push("/groupDetail/InProgress/11")}
          priority
          src={bannerImg}
          alt="배너 이미지"
        />
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
