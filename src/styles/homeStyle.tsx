import styled from "styled-components";

export const HomeMain = styled.main`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  h3 {
    margin-bottom: 10px;
    width: fit-content;
    font-size: 18px;
    background-color: var(--color-main);
    color: white;
    padding: 7px 12px;
    border-radius: 30px;
  }
`;

export const MainBanner = styled.article`
  cursor: pointer;
  margin-bottom: 20px;

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
