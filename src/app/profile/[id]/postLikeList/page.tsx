"use client";
import postLikeListApi, { FavoriteList } from "@/api/postLikeListApi";
import { PostLikeListMain } from "@/styles/profileStyle";
import React, { useEffect, useState } from "react";

export default function PostLikeList() {
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
      <article>
        찜 목록
        {/* {data?.favoriteList.map((item, index) => (
          <div key={index}></div>
        ))} */}
      </article>
    </PostLikeListMain>
  );
}
