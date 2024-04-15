"use client";
import React from "react";
import { OrderData } from "@/api/orderDetail";
import { OrderInfo } from "@/styles/orderStyle";

const OrdetailInfo: React.FC<{ data: OrderData | null }> = ({ data }) => {
  console.log(data);
  return (
    <>
      <OrderInfo>
        <h3>주문자 정보</h3>
        <p>이름</p>
        <p>전화번호</p>
        <p>이메일</p>
      </OrderInfo>

      <OrderInfo>
        <h3>결제 정보</h3>
        <p>입금자 명</p>
        <p>은행</p>
        <p>입금 금액</p>
        <p>입금 날짜</p>
      </OrderInfo>

      <OrderInfo>
        <h3>상품 정보</h3>
        <p>상품 명</p>
        <p>상품 가격</p>
        <p>총 주문 금액</p>
      </OrderInfo>
    </>
  );
};

export default OrdetailInfo;
