import styled from "styled-components";
import searchIcon from "../../public/assets/svgs/search.svg?url";

export const CommonHeader = styled.header`
  display: flex;
  flex: 0 0 auto;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 145px;
`;

export const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 125px;
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

  .btn_search {
    width: 30px;
    height: 30px;

    background-image: url(${searchIcon.src});
    background-repeat: no-repeat;
    background-size: 20px;

    position: absolute;
    top: 12px;
    left: 81%;
  }
`;

export const SearchInput = styled.input`
  margin: 0 30px;
  padding: 10px 50px 10px 30px;
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
  display: flex;
  align-items: center;
  margin-right: 60px;

  button {
    font-size: 14px;
  }

  .btn_chat {
    margin: 5px 10px 0 20px;
    padding: 10px;
  }

  & span:first-child {
    margin-right: 10px;
  }

  .null {
    width: 45px;
    height: 48px;
    margin: 5px 10px 0 20px;
    display: hidden;
  }
`;
