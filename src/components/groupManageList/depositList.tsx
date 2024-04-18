"use client";
import manageDepositApi, { OrderRes } from "@/api/manageDepositApi";
import useInput from "@/hooks/useInput";
import { ManageTable } from "@/styles/profileStyle";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DepositList() {
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

  const status = useInput("");
  const traking_num = useInput("");

  // 최초 렌더링 시 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      const res = await manageDepositApi(param);
      setData(res);
    };

    fetchData();
  }, []);

  // date 문자열 파싱 후 포맷 변경
  function formatDate(input: string) {
    const [date, time] = input.split("T");
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");
    return `${year.slice(2)}/${month}/${day}\n${hours}:${minutes}`;
  }

  return (
    <ManageTable>
      <thead>
        <tr>
          <th>주문 시간</th>
          <th>주문 상품 / 수량</th>
          <th>입금 금액</th>
          <th>입금명</th>
          <th>배송지</th>
          <th>진행 상태</th>
          <th>운송장 번호</th>
        </tr>
      </thead>
      <tbody>
        {data?.orderManageList?.map((orderItem, orderIndex) => (
          <tr key={orderIndex}>
            <td className="order_dt">{formatDate(orderItem?.order_dt)}</td>
            <td>
              {orderItem?.productList?.map((productItem, productIndex) => (
                <div className="product_item_wrap" key={productIndex}>
                  <p className="product_item">
                    {`${productItem?.purchase_product_name} [${productItem?.purchase_quantity}개]`}
                  </p>
                </div>
              ))}
            </td>
            <td>{orderItem?.total_price}원</td>
            <td>{orderItem?.user.nickname}</td>
            <td>
              <p>({orderItem?.user.addr_post})</p>
              <p>{orderItem?.user.addr}</p>
              <p>{orderItem?.user.addr_detail}</p>
            </td>
            <td>
              <select value={status.value} onChange={status.onChange}>
                <option value="입금 대기">입금 대기</option>
                <option value="입금 대기">입금 확인</option>
                <option value="입금 대기">배송 시작</option>
              </select>
            </td>
            <td className="traking_num">
              <label htmlFor="traking_num" />
              <input
                id="traking_num"
                type="number"
                value={traking_num.value}
                onChange={traking_num.onChange}
              />
            </td>
          </tr>
        ))}
      </tbody>
      <button>저장</button>
    </ManageTable>
  );
}
