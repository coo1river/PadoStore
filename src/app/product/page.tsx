"use client";
import { ProductMain } from "@/styles/productStyle";
import React from "react";

const Product: React.FC = () => {
  return (
    <ProductMain>
      <h2>상품 페이지</h2>
      <section className="recommend_product article_product">
        <article>상품1</article>
        <article>상품2</article>
        <article>상품3</article>
      </section>
    </ProductMain>
  );
};

export default Product;
