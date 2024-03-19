import {
  AccountInfo,
  AccountInfoWrap,
  InputWrap,
  ProductSelect,
  UserInfo,
} from "@/styles/accountInfoStyle";
import { BankOptions } from "./selectOption";
import { Res } from "@/api/postDetailApi";
import { useEffect, useState } from "react";
import AddressForm from "./addressForm";
import useInput from "@/hooks/useInput";

interface Props {
  data: Res | null;
}

const AccountFormInfo: React.FC<Props> = ({ data }) => {
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

  const form = {
    name: useInput(""),
    email: useInput(""),
    number: useInput(""),
  };

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

  return (
    <AccountInfoWrap>
      <h2 className="AccountInfo_title">입금 폼 작성</h2>
      <form className="account_info_form">
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

        <UserInfo>
          <h3>입금자 정보</h3>
          <div>
            <label htmlFor="user-name">• 이름</label>
            <input
              id="user-name"
              type="text"
              placeholder="입금자 이름을 입력해 주세요"
            />
          </div>

          <div>
            <label htmlFor="user-email">• 이메일</label>
            <input
              id="user-email"
              type="text"
              placeholder="이메일을 입력해 주세요"
            />
          </div>

          <div>
            <label htmlFor="user-number">• 전화번호</label>
            <input
              id="user-number"
              type="text"
              placeholder="휴대전화 번호를 입력해 주세요"
            />
          </div>

          <AddressForm />
        </UserInfo>

        <AccountInfo>
          <h3>환불 계좌 정보</h3>

          <div className="account_wrap">
            <div>
              <label htmlFor="bank-name">• 입금 은행</label>
              <select name="bank-name" id="bank-name">
                <BankOptions />
              </select>
            </div>

            <div>
              <label htmlFor="account-name">• 입금자 이름</label>
              <input
                id="account-name"
                type="text"
                placeholder="입금자 이름을 입력해 주세요"
              />
            </div>

            <div className="account_info">
              <label htmlFor="account-number">• 입금자 계좌번호</label>
              <input
                id="account-number"
                type="text"
                placeholder="계좌번호를 입력해 주세요"
              />
            </div>
          </div>
        </AccountInfo>

        <InputWrap>
          <h3>추가 질문</h3>
          <div className="input_wrap">
            <label htmlFor="add-input" />
            <div>
              {data?.questionList.map((question, index) => (
                <p key={index}>• {question.input}</p>
              ))}
              <input id="add-input" type="text" />
            </div>
          </div>
        </InputWrap>

        <button className="btn_submit">폼 제출하기</button>
      </form>
    </AccountInfoWrap>
  );
};

export default AccountFormInfo;
