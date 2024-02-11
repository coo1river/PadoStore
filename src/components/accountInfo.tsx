import {
  AccountInfo,
  AccountInfoWrap,
  ProductSelect,
  UserInfo,
} from "@/styles/accountInfoStyle";

const AccountFormInfo: React.FC = () => {
  return (
    <AccountInfoWrap>
      <h2 className="AccountInfo_title">입금 폼 작성</h2>
      <form className="account_info_form">
        <ProductSelect>
          <h3>상품 선택</h3>
          <ul>
            <li>
              라이언
              <div className="count_wrap">
                <button>-</button>
                <span>3</span>
                <button>+</button>
              </div>
            </li>
            <li>
              춘식이
              <div className="count_wrap">
                <button>-</button>
                <span>3</span>
                <button>+</button>
              </div>
            </li>
            <li>
              어피치
              <div className="count_wrap">
                <button>-</button>
                <span>1</span>
                <button>+</button>
              </div>
            </li>
            <li>
              프로도
              <div className="count_wrap">
                <button>-</button>
                <span>0</span>
                <button>+</button>
              </div>
            </li>
            <li>
              무지
              <div className="count_wrap">
                <button>-</button>
                <span>0</span>
                <button>+</button>
              </div>
            </li>
          </ul>
        </ProductSelect>

        <UserInfo>
          <h3>입금자 정보</h3>
          <label htmlFor="user-name">• 이름</label>
          <input
            id="user-name"
            type="text"
            placeholder="입금자 이름을 입력해 주세요"
          />

          <label htmlFor="user-email">• 이메일 주소</label>
          <input
            id="user-email"
            type="text"
            placeholder="이메일을 입력해 주세요"
          />

          <label htmlFor="user-number">• 휴대전화 번호</label>
          <input
            id="user-number"
            type="text"
            placeholder="휴대전화 번호를 입력해 주세요"
          />

          <label htmlFor="user-address">• 주소지 입력</label>
          <input
            id="user-address"
            type="text"
            placeholder="주소를 입력해 주세요"
          />
        </UserInfo>

        <AccountInfo>
          <h3>계좌 정보</h3>

          <div className="account_wrap">
            <div>
              <label htmlFor="bank-name">• 입금 은행</label>
              <select name="bank-name" id="bank-name">
                <option>국민은행</option>
                <option>기업은행</option>
                <option>농협은행</option>
                <option>신한은행</option>
                <option>산업은행</option>
                <option>우리은행</option>
                <option>한국씨티은행</option>
                <option>하나은행</option>
                <option>SC제일은행</option>
                <option>경남은행</option>
                <option>광주은행</option>
                <option>대구은행</option>
                <option>부산은행</option>
                <option>저축은행</option>
                <option>새마을금고</option>
                <option>케이뱅크</option>
                <option>토스뱅크</option>
                <option>교보증권</option>
                <option>대신증권</option>
                <option>미래에셋증권</option> <option>유진투자증권</option>
                <option>신한투자증권</option>
                <option>키움증권</option>
                <option>하나증권</option>
                <option>하나투자증권</option>
                <option>KB증권</option>
                <option>NH투자증권</option>
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
