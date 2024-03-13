import useInput from "@/hooks/useInput";
import React, { useState } from "react";
import styled from "styled-components";
import DaumPostcode, { AddressData } from "./daumPostcode";

export default function AddressForm() {
  const form = {
    zipcode: useInput(""),
    address: useInput(""),
    addr_detail: useInput(""),
  };

  const [modal, setModal] = useState<boolean>(false);

  const handleComplete = (data: AddressData) => {
    form.zipcode.setValue(data.zonecode);
    form.address.setValue(data.address);
    console.log(data);
    // 모달을 닫습니다.
    setModal(false);
  };

  return (
    <AddressInputForm>
      <h3>주소 정보</h3>
      <div>
        <label htmlFor="input-zipcode">• 우편번호</label>
        <input
          type="text"
          placeholder="우편번호"
          value={form.zipcode.value}
          onChange={form.zipcode.onChange}
        />
        {modal ? <DaumPostcode onComplete={handleComplete} /> : null}
        <button
          className="btn_search_zipcode"
          onClick={(e: React.FormEvent) => {
            e.preventDefault();
            setModal(!modal);
          }}
        >
          우편번호 찾기
        </button>
      </div>

      <div>
        <label htmlFor="input-addr">• 주소</label>
        <input
          type="text"
          placeholder="주소"
          value={form.address.value}
          onChange={form.address.onChange}
        />
      </div>

      <div>
        <label htmlFor="input-addr">• 상세 주소</label>
        <input
          type="text"
          placeholder="상세 주소"
          value={form.addr_detail.value}
          onChange={form.addr_detail.onChange}
        />
      </div>
    </AddressInputForm>
  );
}

const AddressInputForm = styled.section`
  position: relative;

  .btn_search_zipcode {
    padding: 10px 20px;
    color: white;
    border-radius: 12px;
    font-weight: 700;
    background-color: var(--color-main);
  }
`;
