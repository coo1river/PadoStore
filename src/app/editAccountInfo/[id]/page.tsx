"use client";
import AddressForm from "@/components/addressForm";
import DaumPostcode, { AddressData } from "@/components/daumPostcode";
import ModalFilter from "@/components/modal/modalFilter";
import { BankOptions } from "@/components/selectOption";
import useInput from "@/hooks/useInput";
import { JoinMain } from "@/styles/joinStyle";
import React, { useState } from "react";

export default function EditAccountInfo() {
  // useInput 사용으로 정보 내용 담기
  const form = {
    post_name: useInput(""),
    post_zipcode: useInput(""),
    post_address: useInput(""),
    post_addr_detail: useInput(""),
  };

  const [modal, setModal] = useState<boolean>(false);

  const handleComplete = (data: AddressData) => {
    form.post_zipcode.setValue(data.zonecode);
    form.post_address.setValue(data.address);
    console.log(data);
    // 모달을 닫습니다.
    setModal(false);
  };

  return (
    <JoinMain>
      <h2 className="text_h2">입금 폼 수정</h2>
      <form>
        <h3>계좌 정보</h3>
        <label htmlFor="select-bank">은행</label>
        <select name="select-bank" id="select-bank">
          <BankOptions />
        </select>
        <label htmlFor="input-account-name">예금주</label>
        <input type="text" id="input-account-name" />
        <label htmlFor="input-account-number">계좌번호</label>
        <input type="text" id="input-account-number" />

        <h3>주소 정보</h3>
        <label htmlFor="input-zipcode">우편번호</label>
        <input
          id="input-zipcode"
          type="text"
          placeholder="우편번호"
          value={form.post_zipcode.value}
          onChange={form.post_zipcode.onChange}
        />

        {/* 다음 주소 검색 모달 창 */}
        {modal ? (
          <ModalFilter onClose={() => setModal(false)}>
            <DaumPostcode onComplete={handleComplete} />
          </ModalFilter>
        ) : null}
        <button
          className="btn_search_zipcode"
          onClick={(e: React.FormEvent) => {
            e.preventDefault();
            setModal(!modal);
          }}
        >
          우편번호 찾기
        </button>

        <label htmlFor="input-addr">주소</label>
        <input
          id="input-addr"
          type="text"
          placeholder="주소"
          value={form.post_address.value}
          onChange={form.post_address.onChange}
        />

        <label htmlFor="input-addr-detail">상세 주소</label>
        <input
          id="input-addr-detail"
          type="text"
          placeholder="상세 주소"
          value={form.post_addr_detail.value}
          onChange={form.post_addr_detail.onChange}
        />

        <button>저장</button>
      </form>
    </JoinMain>
  );
}
