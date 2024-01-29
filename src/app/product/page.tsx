"use client";
import {
  BuyBtn,
  ProductContent,
  ProductImg,
  ProductMain,
} from "@/styles/productStyle";
import React from "react";
import productImg1 from "../../../public/assets/images/product1.jpg";

const Product: React.FC = () => {
  return (
    <ProductMain>
      <h2 className="a11y-hidden">상품 페이지</h2>
      <section className="product_detail">
        <ProductContent>
          <ProductImg src={productImg1.src} />
          <div className="product_intro_wrap">
            <h3 className="product_title">상품1</h3>
            <p className="product_price">59,000원</p>
            <div></div>
            <div>
              <h3>상품 선택</h3>
              <select name="product" id="product-id">
                <option value="a">라이언</option>
                <option value="b">춘식</option>
                <option value="c">알파카</option>
                <option value="d">직직이</option>
              </select>
            </div>
            <BuyBtn>구매하기</BuyBtn>
          </div>
        </ProductContent>
        <ProductContent>
          <p className="product_intro">너무 귀여운 춘식이 쿠션입니다.</p>
        </ProductContent>
      </section>
    </ProductMain>
  );
};

export default Product;
