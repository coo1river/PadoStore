import useInput from "@/hooks/useInput";
import React, { useState } from "react";
import styled from "styled-components";
import DaumPostcode, { AddressData } from "./daumPostcode";
import ModalFilter from "./modal/modalFilter";

interface FormField {
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

interface Form {
  post_name: FormField;
  post_zipcode: FormField;
  post_address: FormField;
  post_addr_detail: FormField;
}

interface Props {
  form: Form;
}

export default function AddressForm({ form }: Props) {
  const [modal, setModal] = useState<boolean>(false);

  const handleComplete = (data: AddressData) => {
    form.post_zipcode.setValue(data.zonecode);
    form.post_address.setValue(data.address);
    console.log(data);
    // 모달을 닫습니다.
    setModal(false);
  };

  return (
    <AddressInputWrap>
      <h3>주소 정보</h3>

      <label htmlFor="input-name">받는 사람</label>
      <input
        id="input-name"
        type="text"
        placeholder="이름"
        value={form.post_name.value}
        onChange={form.post_name.onChange}
      />

      <div>
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
      </div>

      <div>
        <label htmlFor="input-addr">주소</label>
        <input
          id="input-addr"
          type="text"
          placeholder="주소"
          value={form.post_address.value}
          onChange={form.post_address.onChange}
        />
      </div>

      <div>
        <label htmlFor="input-addr-detail">상세 주소</label>
        <input
          id="input-addr-detail"
          type="text"
          placeholder="상세 주소"
          value={form.post_addr_detail.value}
          onChange={form.post_addr_detail.onChange}
        />
      </div>
    </AddressInputWrap>
  );
}

const AddressInputWrap = styled.article`
  position: relative;

  .btn_search_zipcode {
    margin-left: 10px;
    padding: 10px 20px;
    color: white;
    border-radius: 12px;
    font-weight: 700;
    background-color: var(--color-main);
  }

  label {
    display: inline-block;
    width: 80px;
  }

  #input-addr {
    display: inline-block;
    width: 450px;
  }

  #input-addr-detail {
    display: inline-block;
    width: 450px;
  }
`;
