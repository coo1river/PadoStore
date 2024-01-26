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
  font-size: 45px;
  font-family: "SEOLLEIMcool";
`;

export const LogoImg = styled.img`
  width: 50px;
  margin-right: 10px;
`;

export const SearchIptBox = styled.div`
  position: relative;

  .search_btn {
    width: 30px;
    height: 30px;

    background-image: url(${searchIcon.src});
    background-repeat: no-repeat;
    background-size: 25px;

    position: absolute;
    top: 11px;
    left: 87%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 70px 10px 20px;
  box-sizing: border-box;
  border: 4px solid var(--color-main);
  border-radius: 20px;
  font-family: var(--font-main);
  font-size: 18px;

  caret-color: var(--color-main);
`;

export const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const UploadBtns = styled.div`
  display: flex;
  align-items: center;
`;

export const LoginJoin = styled.div`
  margin: 30px;
  font-size: 17px;

  & span:first-child {
    margin-right: 10px;
  }
`;
