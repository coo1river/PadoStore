import styled from "styled-components";
import searchIcon from "../../public/assets/svgs/search.svg?url";

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
  margin-left: 80px;
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
    left: 97%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  margin-left: 25px;
  padding: 10px 40px 10px 20px;
  box-sizing: border-box;
  border: 3px solid var(--color-main);
  border-radius: 15px;
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
  position: relative;

  &:active {
    background-color: #3592d4;
  }
`;

// 모달 창
export const ModalWrap = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 0px 4px 0px #0000002f;
  border-radius: 15px;
  line-height: 2rem;
  font-size: 15px;
  font-weight: 600;
  position: absolute;
  margin-top: 10px;
  z-index: 10;

  li {
    padding: 15px 30px;
    border-radius: 15px;
    cursor: pointer;

    strong {
      border-bottom: 3px solid #3eacfa6e;
    }
  }

  li:first-child {
    border-radius: 15px 15px 0 0;
  }

  li:nth-child(2) {
    border-radius: 0 0 15px 15px;
  }

  li:hover {
    background-color: #ececec;
  }
`;

export const LoginJoin = styled.div`
  margin-right: 60px;
  button {
    font-size: 14px;
  }

  & span:first-child {
    margin-right: 10px;
  }
`;
