import { AccountInfoWrap } from "@/styles/accountInfoStyle";

const AccountInfo: React.FC = () => {
  return (
    <AccountInfoWrap>
      <h2>입금 정보 작성</h2>
      <form>
        <label htmlFor="label-name">입금자 이름</label>
        <input id="label-name" type="text" />

        <label htmlFor="label-name">입금자 </label>
        <input id="label-name" type="text" />
      </form>
    </AccountInfoWrap>
  );
};

export default AccountInfo;
