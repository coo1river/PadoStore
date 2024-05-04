"use client";
import manageStockApi, { ProductData } from "@/api/manageStockApi";
import { ManageTable } from "@/styles/profileStyle";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StockList() {
  const params = useParams();

  // 현재 페이지 관리 기본 값 1페이지
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<ProductData | null>(null);

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
      const res = await manageStockApi(param);
      setData(res);
    };

    fetchData();
  }, []);

  return (
    <ManageTable>
      <thead>
        <tr>
          <th>상품명</th>
          <th>남은 수량</th>
        </tr>
      </thead>
      <tbody>
        {data?.product.map((item, index) => (
          <tr key={index}>
            <td>{item?.product_name}</td>
            <td>{item?.current_quantity}</td>
          </tr>
        ))}
      </tbody>
    </ManageTable>
  );
}
