"use client";
import { ProductMain } from "@/styles/productStyle";
import React from "react";

const Product: React.FC = () => {
  return (
    <ProductMain>
      <h2>상품 페이지</h2>
      <section className="product_detail">
        <article>
          <h3>상품1</h3>
          <p>상품 소개</p>
        </article>
        <article>
          <p>입금 폼</p>
        </article>
      </section>
    </ProductMain>
  );
};

export default Product;
