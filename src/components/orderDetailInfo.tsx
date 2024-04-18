"use client";
import React from "react";
import { OrderData } from "@/api/orderDetail";
import { OrderInfo, OrderInfoWrap } from "@/styles/orderStyle";

const OrdetailInfo: React.FC<{ data: OrderData | null }> = ({ data }) => {
  console.log(data);
  return (
    <OrderInfoWrap>
      <div>
        <OrderInfo>
          <h3>주문자 정보</h3>
          <div>
            <p>
              <strong>이름</strong>
              <span>{data?.user.user_name}</span>
            </p>
            <p>
              <strong>전화번호</strong>
              <span>{data?.user.phone_number}</span>
            </p>
            <p>
              <strong>이메일</strong>
              <span>{data?.user.email}</span>
            </p>
          </div>
        </OrderInfo>

        <OrderInfo>
          <h3>결제 정보</h3>
          <div>
            <p>
              <strong>입금자 명</strong>
              <span>{data?.user.account_name}</span>
            </p>
            <p>
              <strong>입금 금액</strong>
              <span>{data?.total_price}</span>
            </p>
            <p>
              <strong>입금 날짜</strong>
              <span>{data?.deposit_dt}</span>
            </p>
          </div>
        </OrderInfo>
      </div>

      <div>
        <OrderInfo>
          <h3>상품 정보</h3>
          {data?.orderProductList.map((item, index) => (
            <div key={index} className="product_info">
              <p className="product_name">{item.purchase_product_name}</p>
              <p>{item.purchase_quantity}개</p>
              <p>{item.purchase_price}원</p>
            </div>
          ))}
          <p className="total_price">
            <strong>총 주문 금액</strong>
            <span>{data?.total_price}원</span>
          </p>
        </OrderInfo>

        <OrderInfo>
          <h3>배송 정보</h3>
          <p>
            <strong>받는 사람</strong>
            <span>{data?.user.account_name}</span>
          </p>
          <p>
            <strong>우편번호</strong>
            <span>{data?.user.addr_post}</span>
          </p>
          <p>
            <strong>주소</strong>
            <span>{`${data?.user.addr} ${data?.user.addr_detail}`}</span>
          </p>
        </OrderInfo>
      </div>

      <div>
        <OrderInfo>
          <h3>환불 정보</h3>
          <p>
            <strong>예금주</strong>
            <span>{data?.user.account_name}</span>
          </p>
          <p>
            <strong>은행</strong>
            <span>{data?.user.bank}</span>
          </p>
          <p>
            <strong>계좌 번호</strong>
            <span>{data?.user.account_number}</span>
          </p>
        </OrderInfo>

        <OrderInfo>
          <h3>추가 질문</h3>
        </OrderInfo>
      </div>
    </OrderInfoWrap>
  );
};

export default OrdetailInfo;
