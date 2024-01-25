"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HomeMain, MainBanner, NowSell } from "@/styles/homeStyle";
import bannerImg from "../../../public/assets/images/banner.png";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <HomeMain>
      <h2 className="a11y-hidden">홈</h2>
      <MainBanner>
        <Image src={bannerImg} alt="배너 이미지" />
      </MainBanner>
      <NowSell>
        <h3>현재 판매 중!</h3>
        <div className="sell_list">
          <div>
            <p>인형1</p>
          </div>
          <div>
            <p>인형2</p>
          </div>
          <div>
            <p>포카1</p>
          </div>
          <div>
            <p>포카2</p>
          </div>
          <div>
            <p>포카3</p>
          </div>
        </div>
      </NowSell>
    </HomeMain>
  );
};

export default Home;
