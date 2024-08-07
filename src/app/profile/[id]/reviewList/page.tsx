"use client";
import reviewListApi from "@/api/reviewListApi";
import { ReviewListMain } from "@/styles/profileStyle";
import React, { useEffect, useState } from "react";

export default function ReivewList() {
  const [data, setData] = useState(null);

  // 최초 렌더링 시 리스트 가져오기
  useEffect(() => {
    const fetchList = async () => {
      const res = await reviewListApi();
      setData(res);
      console.log(res);
    };
    fetchList();
  }, []);

  return (
    <ReviewListMain>
      <article>
        <p className="rating_score">별점</p>
        <p className="review_contents">
          너무 친절하시고 배송도 빠르셨어요. 다음에도 또 거래하고 싶습니다.
        </p>
        <div className="nickname_review_wrap">
          <p className="nickname">은우</p> <p>리뷰 날짜</p>
        </div>
      </article>
    </ReviewListMain>
  );
}
