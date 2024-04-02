"use client";
import orderDetailApi, { OrderData } from "@/api/orderDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import iconCheck from "@/../public/assets/images/check.png";
import {
  OrderDetail,
  OrderProgress,
  OrderProgressBar,
} from "@/styles/profileStyle";

const GroupManage: React.FC = () => {
  const params = useParams();

  const [data, setData] = useState<OrderData | null>(null);

  console.log(params.order_id);

  useEffect(() => {
    const detail = async () => {
      const res = await orderDetailApi(params.order_id);
      console.log(res);
      setData(res);
    };
    detail();
  }, []);

  return (
    <OrderDetail>
      <h2>주문 상세</h2>
      <div className="progress_wrap">
        {/* 주문 상태 */}
        <div className="progress_and_text">
          <OrderProgress src={iconCheck.src} alt="주문 진행 바" />
          <p>입금 대기</p>
        </div>
        <div className="progress_and_text">
          <OrderProgress src={iconCheck.src} alt="주문 진행 바" />
          <p>입금 확인</p>
        </div>
        <div className="progress_and_text">
          <OrderProgress src={iconCheck.src} alt="주문 진행 바" />
          <p>배송 시작</p>
        </div>
        <div className="progress_and_text">
          <OrderProgress src={iconCheck.src} alt="주문 진행 바" />
          <p>거래 종료</p>
        </div>
      </div>

      <div className="bar_wrap">
        <OrderProgressBar />
        <OrderProgressBar />
        <OrderProgressBar />
      </div>
    </OrderDetail>
  );
};

export default GroupManage;
