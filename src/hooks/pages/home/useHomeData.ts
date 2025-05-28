"use client";
import useApi from "@/hooks/common/useApi";
import { HomeData } from "@/types/home/home.types";
import { useEffect, useState } from "react";

export default function useHomeData() {
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await useApi({
          method: "get",
          url: "home/list",
          params: { status: "InProgress" },
        });
        setData(res);
      } catch (error) {
        console.error("홈 데이터 불러오기 실패:", error);
      }
    };

    fetchHomeData();
  }, []);

  return { data };
}
