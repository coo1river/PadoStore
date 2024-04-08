"use client";
import manageStockApi, { ProductData } from "@/api/manageStockApi";
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
    <ul>
      {data?.product.map((item, index) => {
        return (
          <li key={index}>
            <p>{item?.order_dt}</p>
            <div className="product_list">
              {item?.productList.map((productItem, productIndex) => (
                <p key={productIndex}>{productItem?.purchase_product_name}</p>
              ))}
            </div>
            <p>{item?.total_price}</p>
            <p>{item?.user.nickname}</p>
            <p>{`${item?.user.addr} ${orderItem?.user.addr_detail}`}</p>
          </li>
        );
      })}
    </ul>
  );
}
