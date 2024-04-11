"use client";
import manageDepositApi, { OrderRes } from "@/api/manageDepositApi";
import manageStockApi from "@/api/manageStockApi";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface GroupManageProps {
  children: React.ReactNode;
  listMenu: string;
}

export default function DepositList({ children, listMenu }: GroupManageProps) {
  const params = useParams();

  // 현재 페이지 관리 기본 값 1페이지
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<OrderRes | null>(null);

  const param = {
    post_id: params.id,
    limit: 10,
    current_page: page,
    sort_by: "post_id",
    order: "ASC",
  };

  // 최초 렌더링 시 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const res = await manageDepositApi(param);
      setData(res);
    };

    fetchData();
  }, []);

  return (
    <ul>
      {listMenu === "order" &&
        data?.orderManageList?.map((orderItem, orderIndex) => (
          <li key={orderIndex}>
            <p>{orderItem?.order_dt}</p>
            <div className="product_list">
              {orderItem?.productList?.map((productItem, productIndex) => (
                <p key={productIndex}>{productItem?.purchase_product_name}</p>
              ))}
            </div>
            <p>{orderItem?.total_price}</p>
            <p>{orderItem?.user.nickname}</p>
            <p>{`${orderItem?.user.addr} ${orderItem?.user.addr_detail}`}</p>
          </li>
        ))}
    </ul>
  );
}
