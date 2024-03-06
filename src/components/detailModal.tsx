import { DetailModalDiv } from "@/styles/detailModalStyle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ModalFilter from "./modalFilter";

export default function DetailModal() {
  const router = useRouter();
  const path = usePathname();

  const post_id = 1;
  const group_id = 2;

  // pathname 확인 후 알맞은 수정 페이지로 이동
  const updateRouter = () => {
    if (path.startsWith("/groupDetail/")) {
      router.push(`/update/groupPurchase/${post_id}`);
    } else if (path.startsWith("/productDetail/")) {
      router.push(`/update/product/${group_id}`);
    }
  };

  return (
    <DetailModalDiv>
      <ul>
        <li>상태 변경</li>
        <li onClick={updateRouter}>수정</li>
        <li>삭제</li>
      </ul>
    </DetailModalDiv>
  );
}
