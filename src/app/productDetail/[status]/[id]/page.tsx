"use client";
import {
  ProductContent,
  ProductImg,
  ProductInfo,
  ProductMain,
} from "@/styles/productStyle";
import React, { useEffect, useState } from "react";
import productImg1 from "@/../public/assets/images/product1.jpg";
import profileImg from "@/../public/assets/images/profile.png";
import Image from "next/image";
import postDetailApi, { Res } from "@/api/postDetailApi";

const ProductDetail: React.FC = (props) => {
  // console.log(props);

  const status = "Sell";
  const id = 1;

  const [data, setData] = useState<Res | null>(null);

  useEffect(() => {
    const detail = async () => {
      const res = await postDetailApi(status, id);
      console.log(res);
      setData(res);
    };
    detail();
  }, []);

  console.log(data?.title);

  return (
    <ProductMain>
      <h2 className="a11y-hidden">상품 페이지</h2>
      <section className="product_detail">
        <ProductInfo>
          <ProductImg src={productImg1.src} />
          <div className="product_intro_button">
            <div className="product_intro">
              <h3 className="product_title">{data?.title}</h3>
              <p className="product_price"></p>
              <p>
                <strong>• 상품 상태 : </strong> 미개봉(새 것)
              </p>
              <p>
                <strong>• 배송 방법 : </strong>택배
              </p>
            </div>
            <div className="profile_wrap">
              <Image
                className="img_profile"
                src={profileImg}
                alt="프로필 이미지"
              />
              <p className="user_name">목긴알파카123</p>
            </div>
            <div className="btns_wrap">
              <button className="btn_like">찜하기</button>
              <button className="btn_chat">구매 채팅하기</button>
            </div>
          </div>
        </ProductInfo>
        <ProductContent>
          <p className="product_contents">
            너무 귀여운 춘식이 쿠션입니다. 귀엽죠 귀엽죠
          </p>
        </ProductContent>
      </section>
    </ProductMain>
  );
};

export default ProductDetail;
