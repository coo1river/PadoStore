"use client";
import orderDetailApi, { OrderData } from "@/api/orderDetailApi";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import IconCheck from "@/../public/assets/svgs/check-circle.svg";
import {
  OrderDetArticle,
  OrderMain,
  OrderProgressBar,
  ProductImg,
  ProgressBarWrap,
} from "@/styles/orderStyle";
import postDetailApi, { Res } from "@/api/postDetailApi";
import OrderdetailInfo from "@/components/common/orderDetailInfo";
import editOrderApi from "@/api/editOrderApi";

const OrderDetail: React.FC = () => {
  // 라우터 사용
  const router = useRouter();

  const params = useParams();

  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const [postData, setPostData] = useState<Res | null>(null);

  const handleCompleteTrade = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await editOrderApi({
        order_id: orderData?.order_id,
        order: {
          order_id: orderData?.order_id,
          order_status: "거래 종료",
        },
      });

      setOrderData((prev) =>
        prev ? { ...prev, order_status: "거래 종료" } : prev
      );
    } catch (error) {
      console.error("거래 종료 API 호출 중 오류 발생:", error);
    }
  };
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
  }, [params.order_id]);

  return (
    <OrderMain>
      <h2>주문 상세</h2>

      <OrderDetArticle>
        <div
          className="img_and_info"
          onClick={() => router.push(`/groupDetail/${postData?.post_id}`)}
        >
          <ProductImg
            src={
              postData?.file && postData?.file[0]?.up_file
                ? `/api/file/${postData?.file[0]?.up_file}`
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
          <button
            className={`btn_end ${
              orderData?.order_status === "거래 종료" ? "disable" : ""
            }`}
            onClick={handleCompleteTrade}
            disabled={orderData?.order_status === "거래 종료"}
          >
            거래 종료
          </button>
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
      <OrderdetailInfo data={orderData} onUpdate={setOrderData} />
    </OrderMain>
  );
};

export default OrderDetail;
