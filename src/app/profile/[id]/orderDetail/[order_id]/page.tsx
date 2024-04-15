"use client";
import orderDetailApi, { OrderData } from "@/api/orderDetail";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import IconCheck from "@/../public/assets/svgs/check-circle.svg";
import {
  OrderDetArticle,
  OrderDetail,
  OrderProgressBar,
  ProductImg,
  ProgressBarWrap,
} from "@/styles/orderStyle";
import postDetailApi, { Res } from "@/api/postDetailApi";
import OrdetailInfo from "@/components/orderDetailInfo";

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
        <div className="img_and_info">
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
        </div>
        <div>
          <button className="btn_end">거래 종료</button>
        </div>
      </OrderDetArticle>

      <article className="progress_wrap_article">
        <div className="progress_wrap">
          {/* 주문 상태 */}
          {[
            { status: "입금 대기", color: "#3EABFA" },
            {
              status: "입금 확인",
              color:
                orderData?.order_status === "입금 대기" ? "#d8d7d7" : "#3EABFA",
            },
            {
              status: "배송 시작",
              color:
                orderData?.order_status === "배송 시작" ||
                orderData?.order_status === "거래 종료"
                  ? "#3EABFA"
                  : "#d8d7d7",
            },
            {
              status: "거래 종료",
              color:
                orderData?.order_status === "거래 종료" ? "#3EABFA" : "#d8d7d7",
            },
          ].map((step, index) => (
            <div className="progress_and_text" key={index}>
              <IconCheck
                width={50}
                height={50}
                fill={step.color}
                alt="주문 진행 상태"
              />
              <p>{step.status}</p>
            </div>
          ))}
        </div>

        {/* 주문 상태 바 */}
        <ProgressBarWrap>
          <OrderProgressBar status={orderData?.order_status} />
          <OrderProgressBar status={orderData?.order_status} />
          <OrderProgressBar status={orderData?.order_status} />
        </ProgressBarWrap>
      </article>

      {/* 주문 상세 데이터 */}
      <OrdetailInfo data={orderData} />
    </OrderDetail>
  );
};

export default GroupManage;
