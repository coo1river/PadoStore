"use client";
import React from "react";
import Image from "next/image";
import { HomeMain, MainBanner } from "@/styles/homeStyle";
import bannerImg from "../../../public/assets/images/banner.png";
import ProductSection from "@/components/homeSection/productSection";
import GroupSection from "@/components/homeSection/groupSection";

const Home: React.FC = () => {
  return (
    <HomeMain>
      <h2 className="a11y-hidden">홈</h2>
      <MainBanner>
        <Image src={bannerImg} alt="배너 이미지" />
      </MainBanner>
      <nav>
        <ul className="menu_tab">
          <li className="home">메인</li>
          <li className="sell">판매 / 구매 / 교환</li>
          <li className="grp_purchase">공동구매</li>
        </ul>
      </nav>

      {/* 판매 section */}
      <ProductSection />

      {/* 공구 section */}
      <GroupSection />
    </HomeMain>
  );
};

export default Home;
