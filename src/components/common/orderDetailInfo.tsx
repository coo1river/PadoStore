"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { OrderData } from "@/api/orderDetailApi";
import { OrderInfo, OrderInfoWrap } from "@/styles/orderStyle";
import useInput from "@/hooks/useInput";
import editOrderApi from "@/api/editOrderApi";
import DaumPostcode, { AddressData } from "./daumPostcode";
import ModalFilter from "../modal/modalFilter";
import { BankOptions } from "./selectOption";

const OrderdetailInfo: React.FC<{
  data: OrderData | null;
  onUpdate: (data: OrderData | null) => void;
}> = ({ data, onUpdate }) => {
  // useInput으로 value, onChange 할당
  const form = {
    userName: useInput(""),
    userNumber: useInput(""),
    userEmail: useInput(""),
    postName: useInput(""),
    postNumber: useInput(""),
    zipcode: useInput(""),
    address: useInput(""),
    addrDetail: useInput(""),
    bank: useInput(""),
    accountNumber: useInput(""),
    accountName: useInput(""),
  };

  // 주소 찾기 모달
  const [modal, setModal] = useState<boolean>(false);

  const handleComplete = (data: AddressData) => {
    form.zipcode.setValue(data.zonecode);
    form.address.setValue(data.address);
    console.log(data);
    // 모달을 닫습니다.
    setModal(false);
  };

  const [isShippingEditable, setIsShippingEditable] = useState(false);
  const [isRefundEditable, setIsRefundEditable] = useState(false);
  const [isQuestionEditable, setIsQuestionEditable] = useState(false);

  // 수정 항목 토글 함수
  const handleEditToggle = (section: string) => {
    switch (section) {
      case "shipping":
        setIsShippingEditable(!isShippingEditable);
        break;
      case "question":
        setIsQuestionEditable(!isQuestionEditable);
        break;
      case "refund":
        setIsRefundEditable(!isRefundEditable);
        break;
      default:
        break;
    }
  };

  // 배송 수정 시 setValue 설정
  useEffect(() => {
    form.postName.setValue(data?.orderUser.user_name || "");
    form.postNumber.setValue(data?.orderUser.phone_number || "");
    form.zipcode.setValue(data?.orderUser.addr_post || "");
    form.address.setValue(data?.orderUser.addr || "");
    form.addrDetail.setValue(data?.orderUser.addr_detail || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // 은행 및 계좌 수정 시 setValue 설정
  useEffect(() => {
    if (data && isRefundEditable) {
      form.accountName.setValue(data.orderUser.account_name || "");
      form.accountNumber.setValue(data.orderUser.account_number || "");
      form.bank.setValue(data.orderUser.bank || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isRefundEditable]);

  // 수정 함수
  const handleEditOrder = async (e: FormEvent, section: string) => {
    e.preventDefault();
    if (!data) return;

    let updatedFields = {};
    if (section === "shipping") {
      updatedFields = {
        order_id: data.order_id,
        orderUser: {
          ...data.orderUser,
          user_name: form.postName.value,
          phone_number: form.postNumber.value,
          addr_post: form.zipcode.value,
          addr: form.address.value,
          addr_detail: form.addrDetail.value,
        },
      };
    } else if (section === "refund") {
      updatedFields = {
        orderUser: {
          ...data.orderUser,
          account_name: form.accountName.value,
          account_number: form.accountNumber.value,
          bank: form.bank.value,
        },
      };
    }

    const updatedData: OrderData = {
      ...data,
      ...updatedFields,
    };

    try {
      await editOrderApi(updatedData);
      onUpdate(updatedData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <OrderInfoWrap>
      <div>
        <OrderInfo>
          <h3>주문자 정보</h3>

          <div>
            <p>
              <strong>이름</strong>
              <span>{data?.user.user_name}</span>
            </p>
            <p>
              <strong>전화번호</strong>
              <span>{data?.user.phone_number}</span>
            </p>
            <p>
              <strong>이메일</strong>
              <span>{data?.user.email}</span>
            </p>
          </div>
        </OrderInfo>

        <OrderInfo>
          <h3>결제 정보</h3>
          <div>
            <p>
              <strong>입금자 명</strong>
              <span>{data?.user.user_name}</span>
            </p>
            <p>
              <strong>입금 금액</strong>
              <span>{data?.total_price}원</span>
            </p>
            <p>
              <strong>입금 날짜</strong>
              <span>{data?.deposit_dt}</span>
            </p>
          </div>
        </OrderInfo>
      </div>

      <div>
        <OrderInfo>
          <h3>상품 정보</h3>
          {data?.orderProductList.map((item, index) => (
            <div key={index} className="product_info">
              <p className="product_name">{item.purchase_product_name}</p>
              <p>{item.purchase_quantity}개</p>
              <p>{item.purchase_price}원</p>
            </div>
          ))}
          <p className="total_price">
            <strong>총 주문 금액</strong>
            <span>{data?.total_price}원</span>
          </p>
        </OrderInfo>

        <OrderInfo>
          <div className="title_btn_wrap">
            <h3>배송 정보</h3>
            {data?.order_status === "입금 대기" && (
              <button
                className="btn_edit"
                onClick={(e) => {
                  if (isShippingEditable) {
                    handleEditOrder(e, "shipping");
                    handleEditToggle("shipping");
                  } else {
                    handleEditToggle("shipping");
                  }
                }}
              >
                {isShippingEditable ? "저장" : "수정"}
              </button>
            )}
          </div>

          {!isShippingEditable ? (
            <>
              <p>
                <strong>받는 사람</strong>
                <span>{data?.orderUser.user_name}</span>
              </p>
              <p>
                <strong>전화번호</strong>
                <span>{data?.orderUser.phone_number}</span>
              </p>
              <p>
                <strong>우편번호</strong>
                <span>{data?.orderUser.addr_post}</span>
              </p>
              <p>
                <strong>주소</strong>
                <span>{data?.orderUser.addr}</span>
              </p>
              <p>
                <strong>상세 주소</strong>
                <span>{data?.orderUser.addr_detail}</span>
              </p>
            </>
          ) : (
            <>
              {modal ? (
                <ModalFilter onClose={() => setModal(false)}>
                  <DaumPostcode onComplete={handleComplete} />
                </ModalFilter>
              ) : null}
              <p>
                <label>받는 사람</label>
                <input
                  type="text"
                  value={form.postName.value}
                  onChange={form.postName.onChange}
                />
              </p>
              <p>
                <strong>전화번호</strong>
                <input
                  type="number"
                  value={form.postNumber.value}
                  onChange={form.postNumber.onChange}
                />
              </p>
              <p>
                <label>우편번호</label>
                <input
                  type="text"
                  value={form.zipcode.value}
                  onChange={form.zipcode.onChange}
                  onClick={(e: React.FormEvent) => {
                    e.preventDefault();
                    setModal(!modal);
                  }}
                />
              </p>
              <p>
                <label>주소</label>
                <input
                  type="text"
                  value={form.address.value}
                  onChange={form.address.onChange}
                  onClick={(e: React.FormEvent) => {
                    e.preventDefault();
                    setModal(!modal);
                  }}
                />
              </p>
              <p>
                <label htmlFor="">상세 주소</label>
                <input
                  type="text"
                  value={form.addrDetail.value}
                  onChange={form.addrDetail.onChange}
                />
              </p>
            </>
          )}
        </OrderInfo>
      </div>

      <div>
        <OrderInfo>
          <div className="title_btn_wrap">
            <h3>환불 정보</h3>
            {data?.order_status === "입금 대기" && (
              <button
                className="btn_edit"
                onClick={(e) => {
                  if (isRefundEditable) {
                    handleEditOrder(e, "refund");
                    handleEditToggle("refund");
                  } else {
                    handleEditToggle("refund");
                  }
                }}
              >
                {isRefundEditable ? "저장" : "수정"}
              </button>
            )}
          </div>

          {!isRefundEditable ? (
            <>
              <p>
                <strong>예금주</strong>
                <span>{data?.orderUser.account_name}</span>
              </p>
              <p>
                <strong>은행</strong>
                <span>{data?.orderUser.bank}</span>
              </p>
              <p>
                <strong>계좌 번호</strong>
                <span>{data?.orderUser.account_number}</span>
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>예금주</strong>
                <input
                  type="text"
                  value={form.accountName.value}
                  onChange={form.accountName.onChange}
                />
              </p>
              <p>
                <strong>은행</strong>
                <select value={form.bank.value} onChange={form.bank.onChange}>
                  <BankOptions />
                </select>
              </p>
              <p>
                <strong>계좌 번호</strong>
                <input
                  type="text"
                  value={form.accountNumber.value}
                  onChange={form.accountNumber.onChange}
                />
              </p>
            </>
          )}
        </OrderInfo>

        <OrderInfo>
          <h3>추가 질문</h3>
          <p>
            {data?.questionList.map((item, index) => (
              <strong key={index}>{item.input}</strong>
            ))}
            {data?.answerList.map((item, index) => (
              <span key={index}>{item.answer}</span>
            ))}
          </p>
        </OrderInfo>
      </div>
    </OrderInfoWrap>
  );
};

export default OrderdetailInfo;
