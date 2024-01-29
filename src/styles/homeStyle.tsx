import styled from "styled-components";

export const HomeMain = styled.main`
  width: 1200px;
  height: calc(100% - 223px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  .title_tag {
    margin-bottom: 10px;
    width: fit-content;
    font-size: 18px;
    background-color: var(--color-main);
    color: white;
    padding: 7px 12px;
    border-radius: 30px;
  }

  nav {
    width: 100%;
  }

  .menu_tab {
    display: flex;
    justify-content: start;
    margin: 20px 0;
    gap: 100px;

    li {
      width: 50px;
      font-size: 20px;
      font-weight: 700;
      margin: 10px;
      padding-bottom: 10px;
      text-align: center;
      cursor: pointer;

      &:first-child {
        color: var(--color-main);
        border-bottom: 4px solid var(--color-main);
      }
    }
  }
`;

export const MainBanner = styled.article`
  cursor: pointer;

  & img {
    width: 1200px;
    height: 320px;
  }
`;

export const NowSell = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;

  .sell_list {
    display: flex;

    div {
      width: 200px;
    }
  }
`;
