"use client";
import editProfileApi, { EditRes } from "@/api/editProfileApi";
import DaumPostcode, { AddressData } from "@/components/common/daumPostcode";
import ModalFilter from "@/components/modal/modalFilter";
import { BankOptions } from "@/components/common/selectOption";
import useDecodedToken from "@/hooks/useDecodedToken";
import useInput from "@/hooks/useInput";
import useAuthStore from "@/store/useAuthStore";
import { AccountInfoMain } from "@/styles/joinStyle";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

export default function EditAccountInfo() {
  // 라우터 사용
  const router = useRouter();

  // 토큰 디코딩 커스텀 훅으로 user id 추출
  const { token } = useAuthStore();
  const userId = useDecodedToken(token!);

  // useInput 사용으로 정보 내용 담기
  const form = {
    account_name: useInput(""),
    account_number: useInput(""),
    bank: useInput(""),
    post_zipcode: useInput(""),
    post_address: useInput(""),
    post_addr_detail: useInput(""),
  };

  const [data, setData] = useState<EditRes | null>(null);

  // 최초 렌더링 시 데이터 가져오기
  useEffect(() => {
    const getData = async () => {
      const res = await editProfileApi("get");
      setData(res);
    };
    getData();
  }, []);

  // 데이터 값 input 기본 value로 불러오기
  useEffect(() => {
    form.account_name.setValue(data?.user.account_name || "");
    form.account_number.setValue(data?.user.account_number || "");
    form.bank.setValue(data?.user.bank || "");
    form.post_zipcode.setValue(data?.user.addr_post || "");
    form.post_address.setValue(data?.user.addr || "");
    form.post_addr_detail.setValue(data?.user.addr_detail || "");
  }, [data]);

  const [modal, setModal] = useState<boolean>(false);

  const handleComplete = (data: AddressData) => {
    form.post_zipcode.setValue(data.zonecode);
    form.post_address.setValue(data.address);
    console.log(data);
    // 모달을 닫습니다.
    setModal(false);
  };

  const handleEditAccountInfo = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await editProfileApi("put", {
        user: {
          user_id: null,
          password: null,
          user_name: null,
          nickname: null,
          phone_number: null,
          email: null,
          addr_post: form.post_zipcode.value,
          addr: form.post_address.value,
          addr_detail: form.post_addr_detail.value,
          bank: form.bank.value,
          account_name: form.account_name.value,
          account_number: form.account_number.value,
        },
      });
      console.log("입금 폼 수정 성공", res);
      router.push(`/profile/${userId}/mySalesList`);
    } catch (error) {
      console.error("수정 실패", error);
    }
  };

  return (
    <AccountInfoMain>
      <h2 className="heading">입금 정보 수정</h2>
      <form>
        <label htmlFor="select-bank">은행</label>
        <select
          name="select-bank"
          id="select-bank"
          value={form.bank.value}
          onChange={form.bank.onChange}
        >
          <BankOptions />
        </select>
        <label htmlFor="input-account-name">예금주</label>
        <input
          type="text"
          id="input-account-name"
          value={form.account_name.value}
          onChange={form.account_name.onChange}
        />
        <label htmlFor="input-account-number">계좌번호</label>
        <input
          type="text"
          id="input-account-number"
          value={form.account_number.value}
          onChange={form.account_number.onChange}
        />

        <label htmlFor="input-zipcode">우편번호</label>
        <div>
          <input
            id="input-zipcode"
            type="text"
            placeholder="우편번호"
            value={form.post_zipcode.value}
            onChange={form.post_zipcode.onChange}
          />
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

        {/* 다음 주소 검색 모달 창 */}
        {modal ? (
          <ModalFilter onClose={() => setModal(false)}>
            <DaumPostcode onComplete={handleComplete} />
          </ModalFilter>
        ) : null}

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

        <button className="btn-save" onClick={handleEditAccountInfo}>
          저장
        </button>
      </form>
    </AccountInfoMain>
  );
}
