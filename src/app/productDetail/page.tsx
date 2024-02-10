"use client";
import {
  GroupSubmit,
  ProductContent,
  ProductImg,
  ProductInfo,
  ProductMain,
} from "@/styles/productStyle";
import React from "react";
import productImg1 from "../../../public/assets/images/product1.jpg";
import AccountInfo from "@/components/accountInfo";

const ProductDetail: React.FC = () => {
  return (
    <ProductMain>
      <h2 className="a11y-hidden">상품 페이지</h2>
      <section className="product_detail">
        <ProductInfo>
          <ProductImg src={productImg1.src} />
          <div className="product_intro_button">
            <h3 className="product_title">상품1</h3>
            <p className="product_price">59,000원</p>
            <div>
              <h3>상품 선택</h3>
              <select name="product" id="product-id">
                <option value="a">라이언</option>
                <option value="b">춘식</option>
                <option value="c">알파카</option>
                <option value="d">직직이</option>
              </select>
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
