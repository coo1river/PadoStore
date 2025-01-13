"use client";
import postLikeListApi, { FavoriteList } from "@/api/postLikeListApi";
import { PostLikeListMain } from "@/styles/profileStyle";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PostLikeList() {
  const router = useRouter();

  // 찜 목록 리스트 데이터 저장
  const [data, setData] = useState<FavoriteList | null>(null);
  // 찜 목록에 보낼 파라미터
  const params = {
    limit: 10,
    current_page: 1,
  };

  // 최초 렌더링 시 리스트 가져오기
  useEffect(() => {
    const fetchList = async () => {
      const res = await postLikeListApi(params.limit, params.current_page);
      setData(res);
    };
    fetchList();
  }, []);

  return (
    <PostLikeListMain>
      <ul className="myProfile_list">
        {data?.favoriteList.map((item) => {
          // 필요한 데이터 추출
          const postId = item.post_id;
          const title = item.title;
          const nickname = item.nickname;
          const insertDt = item.insert_dt;

          // 날짜 형식 변환
          const date = insertDt.split("-").slice(1).join("-");

          return (
            <li
              key={postId}
              onClick={() => {
                router.push(
                  item.board_type === "GroupPurchase"
                    ? `/groupDetail/${postId}`
                    : `/productDetail/${postId}`
                );
              }}
            >
              <p className="product_id">{postId}</p>
              <p className="product_title">{title}</p>
              <div className="nickname_dt_wrap">
                <p className="product_nickname">{nickname}</p>
                <p className="product_date">{date}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </PostLikeListMain>
  );
}
