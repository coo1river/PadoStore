import {
  AccountInfo,
  AccountInfoWrap,
  DepositInfoWrap,
  InputWrap,
  ProductSelect,
  SellerInfo,
  UserInfo,
} from "@/styles/accountInfoStyle";
import { BankOptions } from "./selectOption";
import { Res } from "@/api/postDetailApi";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AddressForm from "./addressForm";
import useInput from "@/hooks/useInput";
import useAuthStore from "@/store/useAuthStore";
import orderApi, { OrderData } from "@/api/orderApi";
import { useRouter } from "next/navigation";

interface Props {
  data: Res | null;
}

const AccountFormInfo: React.FC<Props> = ({ data }) => {
  // zustand에서 token 가져오기
  const { token, setToken } = useAuthStore();

  const router = useRouter();

  // 상품 개수 만큼 배열 만들기
  const [countArray, setCountArray] = useState<number[]>([]);

  // 공구 폼 정보 가져오기
  useEffect(() => {
    if (data?.productDetail) {
      const generatedCountArray = Array.from(
        { length: data.productDetail.length },
        () => 0
      );
      setCountArray(generatedCountArray);
    }
  }, [data?.productDetail]);

  // 상품 카운트 함수
  const handleClick = (index: number, increment: number) => {
    setCountArray((prevCountArray) => {
      const updatedCount = [...prevCountArray];
      if (increment === 1 || (increment === -1 && updatedCount[index] > 0)) {
        updatedCount[index] += increment;
      }
      return updatedCount;
    });
  };

  // useInput 사용으로 정보 내용 담기
  const form = {
    deposit_date: useInput(""),
    deposit_time: useInput(""),
    name: useInput(""),
    email: useInput(""),
    number: useInput(""),
    post_name: useInput(""),
    post_zipcode: useInput(""),
    post_address: useInput(""),
    post_addr_detail: useInput(""),
    account_bank: useInput(""),
    account_name: useInput(""),
    account_number: useInput(""),
  };

  // 질문 답변 리스트 배열로 저장
  const [answerList, setAnswerList] = useState<{ input: string }[]>([]);

  // 주문할 상품 리스트(이름, 수량, 가격, id)
  const orderProductList = data?.productDetail?.map((detail, index) => ({
    purchase_product_name: detail.product_name,
    purchase_quantity: countArray[index],
    purchase_price: detail.product_price,
    product_detail_id: detail.product_detail_id,
  }));

  // 총 합계 계산 함수
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (data && data.productDetail) {
      data.productDetail.forEach((detail, index) => {
        totalPrice += parseInt(detail.product_price) * countArray[index];
      });
    }
    return totalPrice;
  };

  // 총 상품 값
  const totalPrice = calculateTotalPrice();

  // 총 합계
  const totalAmount = (Number(data?.product.post_price) || 0) + totalPrice;

  // 오늘 날짜 가져오기
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const today = date.toISOString().split("T")[0];

  // answerList 배열에 답변 추가하기
  const handleInputChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setAnswerList((prevState) => {
      const updatedList = [...prevState];
      updatedList[index] = { input: value };
      return updatedList;
    });
  };

  const req: OrderData = {
    order: {
      order_status: "입금 대기",
      post_id: data?.post_id || null,
      purchase_user_id: token,
      total_price: totalPrice,
    },
    user: {
      user_id: token,
      addr_post: form.post_zipcode.value,
      addr: form.post_address.value,
      addr_detail: form.post_addr_detail.value,
      bank: form.account_bank.value,
      account_name: form.account_name.value,
      account_number: form.account_number.value,
    },
    answerList: answerList.map((item) => ({ answer: item.input })),
    orderProductList: orderProductList || [],
  };

  const hadleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !form.deposit_date.value ||
      !form.deposit_time.value ||
      !form.name.value ||
      !form.email.value ||
      !form.number.value ||
      !form.post_name.value ||
      !form.post_zipcode.value ||
      !form.post_address.value ||
      !form.post_addr_detail.value ||
      !form.account_bank.value ||
      !form.account_name.value ||
      !form.account_number.value
    ) {
      alert("필수 항목을 입력해 주세요");
      return;
    }

    try {
      const fetchData = await orderApi(req);
      console.log("주문 성공", fetchData);
      router.push(`/groupDetail/${data?.post_id}/completed`);
    } catch (error) {
      console.error("주문 실패", error);
    }
  };

  return (
    <AccountInfoWrap>
      <h2 className="AccountInfo_title">입금 폼 작성</h2>

      <form className="account_info_form">
        <SellerInfo>
          <h3>판매자 계좌</h3>
          <div>
            <p>
              <strong>예금주</strong>
              {data?.user.account_name}
            </p>
            <p>
              <strong>계좌 정보</strong>
              {data?.user.bank} {data?.user.account_number}
            </p>
          </div>
        </SellerInfo>

        <ProductSelect>
          <h3>상품 선택</h3>
          <ul>
            {data?.productDetail?.map(
              (detail: Res["productDetail"][0], index: number) => (
                <li key={index}>
                  <p>{detail.product_name}</p>
                  <div className="count_wrap">
                    <p className="product_price">
                      {Number(detail.product_price).toLocaleString()}원
                    </p>
                    <button
                      className="btn_count"
                      type="button"
                      onClick={() => handleClick(index, -1)}
                    >
                      -
                    </button>
                    <span>{countArray[index]}</span>
                    <button
                      className="btn_count"
                      type="button"
                      onClick={() => handleClick(index, +1)}
                    >
                      +
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
          <div className="price_wrap">
            <p>배송비</p>
            <p className="price">
              {data?.product.post_price.toLocaleString()} 원
            </p>
          </div>
          <div className="price_wrap">
            <p>상품 금액</p>
            <p className="price">{totalPrice.toLocaleString()} 원</p>
          </div>

          <div className="total_price">
            <p>합계</p>
            <p>{totalAmount.toLocaleString()} 원</p>
          </div>
        </ProductSelect>

        <DepositInfoWrap>
          <h3>입금 정보</h3>
          <div>
            <label htmlFor="deposit-date">입금한 날짜</label>
            <input
              id="deposit-date"
              type="date"
              min={today}
              value={form.deposit_date.value}
              onChange={form.deposit_date.onChange}
            />
            <label htmlFor="deposit-time">입금한 시간</label>
            <input
              id="deposit-time"
              type="time"
              value={form.deposit_time.value}
              onChange={form.deposit_time.onChange}
            />
          </div>
        </DepositInfoWrap>

        <UserInfo>
          <h3>입금자 정보</h3>
          <div>
            <label htmlFor="user-name">이름</label>
            <input
              id="user-name"
              type="text"
              placeholder="입금자 이름을 입력해 주세요"
              value={form.name.value}
              onChange={form.name.onChange}
            />
          </div>

          <div>
            <label htmlFor="user-email">이메일</label>
            <input
              id="user-email"
              type="text"
              placeholder="이메일을 입력해 주세요"
              value={form.email.value}
              onChange={form.email.onChange}
            />
          </div>

          <div>
            <label htmlFor="user-number">전화번호</label>
            <input
              id="user-number"
              type="text"
              placeholder="휴대전화 번호를 입력해 주세요"
              value={form.number.value}
              onChange={form.number.onChange}
            />
          </div>
        </UserInfo>

        <AddressForm form={form} />

        <AccountInfo>
          <h3>환불 계좌 정보</h3>

          <div className="account_wrap">
            <div>
              <label htmlFor="bank-name">은행</label>
              <select
                name="bank-name"
                id="bank-name"
                value={form.account_bank.value}
                onChange={form.account_bank.onChange}
              >
                <BankOptions />
              </select>
            </div>

            <div>
              <label htmlFor="account-name">예금주</label>
              <input
                id="account-name"
                type="text"
                placeholder="예금주를 입력해 주세요"
                value={form.account_name.value}
                onChange={form.account_name.onChange}
              />
            </div>

            <div className="account_info">
              <label htmlFor="account-number">계좌번호</label>
              <input
                id="account-number"
                type="text"
                placeholder="계좌번호를 입력해 주세요"
                value={form.account_number.value}
                onChange={form.account_number.onChange}
              />
            </div>
          </div>
        </AccountInfo>

        <InputWrap>
          <h3>추가 질문</h3>
          {data?.questionList.map((question, index) => (
            <div className="input_wrap" key={index}>
              <label htmlFor={`add-input-${index}`}>{question.input}</label>
              <input
                id={`add-input-${index}`}
                type="text"
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
          ))}
        </InputWrap>

        <button className="btn_submit" onClick={hadleSubmit}>
          폼 제출하기
        </button>
      </form>
    </AccountInfoWrap>
  );
};

export default AccountFormInfo;
