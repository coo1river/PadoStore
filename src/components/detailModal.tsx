import { DetailModalDiv } from "@/styles/detailModalStyle";
import { useRouter } from "next/navigation";
import React from "react";
import ModalFilter from "./modalFilter";

export default function DetailModal() {
  const router = useRouter();

  return (
    <DetailModalDiv>
      <ul>
        <li>상태 변경</li>
        <li onClick={() => router.push("/update/product/:id")}>수정</li>
        <li>삭제</li>
      </ul>
    </DetailModalDiv>
  );
}
