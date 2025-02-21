"use client";
import { SubmitCompleted } from "@/styles/productStyle";
import Image from "next/image";
import iconCheck from "@/../public/assets/images/check.png";
import { useRouter } from "next/navigation";

export default function Completed() {
  const router = useRouter();

  return (
    <SubmitCompleted>
      <Image className="icon_check" src={iconCheck} alt="체크 아이콘" />
      <p className="completed_text">폼 제출 완료!</p>
      <div className="btn_wrap">
        <button onClick={() => router.push("/home")}>홈으로</button>
        <button onClick={() => router.back()}>이전 페이지</button>
      </div>
    </SubmitCompleted>
  );
}
