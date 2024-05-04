"use client";
import { SubmitCompleted } from "@/styles/productStyle";
import React from "react";
import Image from "next/image";
import iconCheck from "@/../public/assets/images/check.png";

export default function Completed() {
  return (
    <SubmitCompleted>
      <Image className="icon_check" src={iconCheck} alt="체크 아이콘" />
      <p className="completed_text">폼 제출 완료!</p>
    </SubmitCompleted>
  );
}
