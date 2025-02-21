"use client";
import deliveryManageApi from "@/api/deliveryManageApi";
import manageDepositApi, { Order, OrderRes } from "@/api/manageDepositApi";
import { ManageTable } from "@/styles/profileStyle";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

export default function DepositList() {
  const params = useParams();

  // 현재 페이지 관리 기본 값 1페이지
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<OrderRes | null>(null);

  const param = useMemo(
    () => ({
      post_id: params.id,
      limit: 10,
      current_page: page,
      sort_by: "post_id",
      order: "ASC",
    }),
    [params.id, page]
  );

  // 각 주문 항목에 대한 상태 관리
  const [statusValues, setStatusValues] = useState<{ [key: number]: string }>(
    {}
  );
  const [trackingNumValues, setTrackingNumValues] = useState<{
    [key: number]: string;
  }>({});

  // 상태 변경 핸들러
  const handleStatusChange = (orderId: number, value: string) => {
    setStatusValues((prev) => ({ ...prev, [orderId]: value }));
  };

  const handleTrackingNumChange = (orderId: number, value: string) => {
    setTrackingNumValues((prev) => ({ ...prev, [orderId]: value }));
  };

  // 최초 렌더링 시 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await manageDepositApi(param);
        setData(res);
        console.log(res);

        // 각 게시물마다 송장 번호 및 배송 상태 값 넣기
        const initialStatusValues: { [key: number]: string } = {};
        const initialTrackingNumValues: { [key: number]: string } = {};

        res.orderManageList.forEach((order: Order) => {
          initialStatusValues[order.order_id] =
            order.order_status || "입금 대기"; // 기본 값 설정
          initialTrackingNumValues[order.order_id] = order.post_number || "";
        });

        setStatusValues(initialStatusValues);
        setTrackingNumValues(initialTrackingNumValues);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", error);
      }
    };
    fetchData();
  }, [param]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();

    const fetchData = async () => {
      try {
        if (!data) {
          console.error("데이터가 없습니다.");
          return;
        }

        for (const order of data.orderManageList) {
          const trackingNum = trackingNumValues[order.order_id] || "";
          const status = statusValues[order.order_id] || "";
          const res = await deliveryManageApi(
            order.order_id,
            status,
            trackingNum
          );
          console.log("수정 성공", res);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData(); // 비동기 함수 실행
  };
  // date 문자열 파싱 후 포맷 변경
  function formatDate(input: string) {
    const [date, time] = input.split("T");
    const [year, month, day] = date.split("-");
    const [hours, minutes] = time.split(":");
    return `${year.slice(2)}/${month}/${day}\n${hours}:${minutes}`;
  }

  return (
    <>
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
                <select
                  value={statusValues[orderItem.order_id] || "입금 대기"}
                  onChange={(e) =>
                    handleStatusChange(orderItem.order_id, e.target.value)
                  }
                >
                  <option value="입금 대기">입금 대기</option>
                  <option value="입금 확인">입금 확인</option>
                  <option value="배송 시작">배송 시작</option>
                </select>
              </td>
              <td className="traking_num">
                <label htmlFor="traking_num" />
                <input
                  id="traking_num"
                  type="number"
                  value={trackingNumValues[orderItem.order_id] || ""}
                  onChange={(e) =>
                    handleTrackingNumChange(orderItem.order_id, e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </ManageTable>
      <button onClick={handleSave}>저장</button>
    </>
  );
}
