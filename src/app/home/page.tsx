"use client";
import React from "react";
import { HomeMain } from "@/styles/homeStyle";
import useHomeData from "@/hooks/pages/home/useHomeData";
import HomeBanner from "@/components/pages/home/homeBanner";
import HomeTab from "@/components/pages/home/homeTab";

export default function Home() {
  // 홈 데이터 리스트 불러오기
  const { data } = useHomeData();

  return (
    <HomeMain>
      <h1 className="a11y-hidden">홈</h1>
      <HomeBanner />
      <HomeTab
        marketList={data?.marketList}
        groupOrderList={data?.groupOrderList}
      />
    </HomeMain>
  );
}
