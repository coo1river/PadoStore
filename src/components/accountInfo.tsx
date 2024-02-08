import { AccountInfoWrap, ProductSelect } from "@/styles/accountInfoStyle";

const AccountInfo: React.FC = () => {
  return (
    <AccountInfoWrap>
      <h2 className="AccountInfo_title">입금 폼 작성</h2>
      <form className="account_info_form">
        <ProductSelect>
          <h3>상품 선택</h3>
          <ul>
            <li>라이언</li>
            <li>춘식이</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </ProductSelect>

        <label htmlFor="label-name">입금자 이름</label>
        <input
          id="label-name"
          type="text"
          placeholder="입금자 이름을 입력해 주세요"
        />

        <label htmlFor="label-account">입금자 계좌번호</label>
        <input
          id="label-account"
          type="text"
          placeholder="계좌번호를 입력해 주세요"
        />

        <label htmlFor="label-address">주소지 입력</label>
        <input
          id="label-address"
          type="text"
          placeholder="주소를 입력해 주세요"
        />
      </form>
    </AccountInfoWrap>
  );
};

export default AccountInfo;
