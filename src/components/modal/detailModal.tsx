import { DetailModalDiv } from "@/styles/detailModalStyle";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import deleteApi from "@/api/deleteApi";
import useAuthStore from "@/store/useAuthStore";
import { Res } from "@/api/postDetailApi";
import statusUpdateApi from "@/api/statusUpdateApi";

interface Props {
  data: Res | null;
  setMenuModal: () => void;
}

const DetailModal: React.FC<Props> = ({ data, setMenuModal }) => {
  const router = useRouter();

  console.log("디테일 모달 데이터:", data);

  // zustand에서 token 가져오기
  const { token, setToken } = useAuthStore();

  const path = usePathname();

  const { id } = useParams<{ id?: string }>();

  // 상태 변경 모달 창 관리
  const [statusModal, setStatusModal] = useState<boolean>(false);

  const modalStatusUpdate = () => setStatusModal(!statusModal);

  const handleStatusUpdate = async () => {
    if (data?.post_status === "InProgress") {
      await statusUpdateApi(data?.post_id, "Completed");
    } else if (data?.post_status === "Completed") {
      await statusUpdateApi(data?.post_id, "InProgress");
    }
  };

  const handleClick = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (event.currentTarget.classList.contains("active")) {
      return;
    }
    await handleStatusUpdate();
    setStatusModal(false);
    setMenuModal();
    window.location.reload();
  };

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
      await deleteApi(id, data?.file_group_id);
      router.push("/home");
    } catch (error) {
      console.error("삭제 오류:", error);
    }
  };

  return (
    <DetailModalDiv>
      {statusModal ? (
        <ul>
          <li
            className={`post_status ${
              data?.post_status === "InProgress" ? "inProgress active" : ""
            }`}
            onClick={handleClick}
          >
            판매 중
          </li>
          <li
            className={`post_status ${
              data?.post_status === "Completed" ? "completed active" : ""
            }`}
            onClick={handleClick}
          >
            판매 완료
          </li>
        </ul>
      ) : (
        <ul>
          <li onClick={modalStatusUpdate}>상태 변경</li>
          <li onClick={updateRouter}>수정</li>
          <li onClick={deleteRouter}>삭제</li>
        </ul>
      )}
    </DetailModalDiv>
  );
};

export default DetailModal;
