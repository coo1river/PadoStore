import { DetailModalDiv } from "@/styles/detailModalStyle";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
import deleteApi from "@/api/deleteApi";
import useAuthStore from "@/store/useAuthStore";

interface Props {
  data: string | undefined;
}

const DetailModal: React.FC<Props> = ({ data }) => {
  const router = useRouter();

  // zustand에서 token 가져오기

  const path = usePathname();

  const { id } = useParams<{ id?: string }>();

  // pathname 확인 후 알맞은 수정 페이지로 이동
  const updateRouter = () => {
    if (path.startsWith("/productDetail/")) {
      router.push(`/update/product/${id}`);
    } else if (path.startsWith("/groupDetail/")) {
      router.push(`/update/groupPurchase/${id}`);
    }
  };

  // post_id와 data(file_group_id) 전달하여 해당 글 삭제
  const deleteRouter = async () => {
    try {
      await deleteApi(id, data);
      router.push("/home");
    } catch (error) {
      console.error("삭제 오류:", error);
    }
  };
  return (
    <DetailModalDiv>
      <ul>
        <li>상태 변경</li>
        <li onClick={updateRouter}>수정</li>
        <li onClick={deleteRouter}>삭제</li>
      </ul>
    </DetailModalDiv>
  );
};

export default DetailModal;