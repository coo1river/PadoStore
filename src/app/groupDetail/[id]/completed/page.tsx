"use client";
import { SubmitCompleted } from "@/styles/productStyle";
import React, { useEffect } from "react";
import Image from "next/image";
import iconCheck from "@/../public/assets/images/check.png";
import { useRouter } from "next/navigation";

export default function Completed() {
  const router = useRouter();

  useEffect(() => {
    // 3초 후 이전 페이지로 이동
    const timer = setTimeout(() => {
      router.back();
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [router]);

  return (
    <SubmitCompleted>
      <Image className="icon_check" src={iconCheck} alt="체크 아이콘" />
      <p className="completed_text">폼 제출 완료!</p>
    </SubmitCompleted>
  );
}
