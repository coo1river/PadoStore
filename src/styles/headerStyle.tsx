import styled from "styled-components";
import searchIcon from "../../public/assets/svgs/search.svg";

export const CommonHeader = styled.header`
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  width: 1084px;
  height: 145px;
`;

export const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 40px;
  cursor: pointer;
`;

export const LogoText = styled.h1`
  color: var(--color-main);
  font-size: 40px;
  font-family: "SEOLLEIMcool";
`;

export const LogoImg = styled.img`
  width: 40px;
  margin-right: 10px;
`;

export const SearchIptBox = styled.div`
  position: relative;

  .search_btn {
    width: 30px;
    height: 30px;

    background-image: url(${searchIcon.src});
    background-repeat: no-repeat;
    background-size: 20px;

    position: absolute;
    top: 12px;
    left: 88%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 70px 10px 20px;
  box-sizing: border-box;
  border: 4px solid var(--color-main);
  border-radius: 20px;
  font-family: var(--font-main);
  font-size: 16px;

  caret-color: var(--color-main);
`;

export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const UploadBtn = styled.button`
  background-color: var(--color-main);
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;

  &:active {
    background-color: #3592d4;
  }
`;

export const LoginJoin = styled.div`
  button {
    font-size: 14px;
  }

  & span:first-child {
    margin-right: 10px;
  }
`;
