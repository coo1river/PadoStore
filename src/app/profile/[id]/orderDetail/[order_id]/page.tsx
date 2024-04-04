"use client";
import orderDetailApi, { OrderData } from "@/api/orderDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import iconCheck from "@/../public/assets/images/check.png";
import {
  OrderDetArticle,
  OrderDetail,
  OrderProgress,
  OrderProgressBar,
  ProductImg,
} from "@/styles/profileStyle";
import postDetailApi, { Res } from "@/api/postDetailApi";

const GroupManage: React.FC = () => {
  const params = useParams();

  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const [postData, setPostData] = useState<Res | null>(null);

  // 최초 렌더링 시 주문 정보와 상품 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      orderDetailApi(params.order_id)
        .then((orderRes) => {
          setOrderData(orderRes);
          return postDetailApi(orderRes.post_id);
        })
        .then((postRes) => {
          setPostData(postRes);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    fetchData();
  }, []);

  return (
    <OrderDetail>
      <h2>주문 상세</h2>

      <OrderDetArticle>
        <ProductImg
          src={
            postData?.file && postData?.file[0]?.up_file
              ? `/upload/${postData?.file[0]?.up_file}`
              : undefined
          }
          alt="상품 이미지"
        />
        <div className="product_info_wrap">
          <p className="product_title">{postData?.title}</p>
          <p className="product_nickname">{postData?.user.nickname}</p>
        </div>
      </OrderDetArticle>

      <article className="progress_wrap_article">
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
      </article>
    </OrderDetail>
  );
};

export default GroupManage;
