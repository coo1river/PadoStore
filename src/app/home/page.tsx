"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  HomeMain,
  MainBanner,
  ProductSection,
  ProductArticle,
} from "@/styles/homeStyle";
import bannerImg from "../../../public/assets/images/banner.png";
import productImg1 from "../../../public/assets/images/product1.jpg";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <HomeMain>
      <h2 className="a11y-hidden">홈</h2>
      <MainBanner>
        <Image src={bannerImg} alt="배너 이미지" />
      </MainBanner>
      <nav>
        <ul className="menu_tab">
          <li className="home">홈</li>
          <li className="sell">판매/구매</li>
          <li className="trade">교환</li>
          <li className="grp_purchase">공구</li>
        </ul>
      </nav>

      {/* 판매 section */}
      <ProductSection>
        <h3 className="title_tag">현재 판매 중!</h3>

        {/* 판매 상품 */}
        <div className="sell_list">
          <ProductArticle
            onClick={() => {
              router.push("/product");
            }}
          >
            <img src={productImg1.src} alt="" />
            <h4 className="product_title">귀여운 춘식이 쿠션쿠션쿠션쿠션</h4>
            <p className="user_name">닉네임123</p>
          </ProductArticle>
          <ProductArticle>
            <img src={productImg1.src} alt="" />
            <h4 className="product_title">귀여운 춘식이 쿠션쿠션쿠션쿠션</h4>
            <p className="user_name">닉네임123</p>
          </ProductArticle>
          <ProductArticle>
            <img src={productImg1.src} alt="" />
            <h4 className="product_title">귀여운 춘식이 쿠션쿠션쿠션쿠션</h4>
            <p className="user_name">닉네임123</p>
          </ProductArticle>
          <ProductArticle>
            <img src={productImg1.src} alt="" />
            <h4 className="product_title">귀여운 춘식이</h4>
            <p className="user_name">닉네임123</p>
          </ProductArticle>
          <ProductArticle>
            <img src={productImg1.src} alt="" />
            <h4 className="product_title">귀여운 춘식이 쿠션쿠션쿠션쿠션</h4>
            <p className="user_name">닉네임123</p>
          </ProductArticle>
        </div>
      </ProductSection>
    </HomeMain>
  );
};

export default Home;
