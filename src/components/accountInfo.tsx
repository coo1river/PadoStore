import {
  AccountInfo,
  AccountInfoWrap,
  ProductSelect,
  UserInfo,
} from "@/styles/accountInfoStyle";
import { BankOptions } from "./selectOption";
import { Res } from "@/api/postDetailApi";
import { useEffect, useState } from "react";
import AddressForm from "./addressForm";

interface Props {
  data: Res | null;
}

const AccountFormInfo: React.FC<Props> = ({ data }) => {
  // 상품 개수 만큼 배열 만들기
  const [countArray, setCountArray] = useState<number[]>([]);

  useEffect(() => {
    if (data?.productDetail) {
      const generatedCountArray = Array.from(
        { length: data.productDetail.length },
        () => 0
      );
      setCountArray(generatedCountArray);
    }
  }, [data?.productDetail]);

  const handleClick = (index: number, increment: number) => {
    setCountArray((prevCountArray) => {
      const updatedCount = [...prevCountArray];
      if (increment === 1 || (increment === -1 && updatedCount[index] > 0)) {
        updatedCount[index] += increment;
      }
      return updatedCount;
    });
  };

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
                  {detail.product_name}
                  <div className="count_wrap">
                    <button
                      type="button"
                      onClick={() => handleClick(index, -1)}
                    >
                      -
                    </button>
                    <span>{countArray[index]}</span>
                    <button
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
          <h3>계좌 정보</h3>

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
        <button className="btn_submit">폼 제출하기</button>
      </form>
    </AccountInfoWrap>
  );
};

export default AccountFormInfo;
