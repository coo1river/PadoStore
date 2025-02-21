import styled, { keyframes } from "styled-components";

const slideRight = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

export const HomeMain = styled.main`
  flex: 1 1 auto;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;

  .title_tag {
    font-weight: 600;
    margin-bottom: 20px;
    width: fit-content;
    font-size: 16px;
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
    gap: 24px;

    .active {
      color: var(--color-main);
    }

    .btn_tab {
      width: fit-content;
      font-size: 20px;
      font-weight: 700;
      margin: 10px;
      padding-bottom: 10px;
      text-align: center;
      cursor: pointer;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 4px;
        background-color: var(--color-main);
        transition: 0.3s ease;
      }

      &.active::after {
        animation: ${slideRight} 0.3s both;
      }
    }
  }
`;

export const MainBanner = styled.article`
  cursor: pointer;
  background-color: var(--color-trans-grey);
  border-radius: 15px;

  & img {
    border-radius: 15px;
    object-fit: contain;
    width: 1200px;
    height: 320px;
  }
`;

export const ProductTab = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;

  .sell_list {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;
  }

  .no_products {
    width: 100%;
    text-align: center;
    margin: 50px 0;
    font-weight: 600;
  }
`;

export const ProductArticle = styled.article`
  display: flex;
  flex-direction: column;
  width: 220px;
  box-shadow: 0px 0px 4px 0px #0000001f;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 30px;

  &:hover > * {
    transform: scale(1.03);
    transition: 0.1s all ease-in-out;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: var(--color-trans-grey);
    border-radius: 15px 15px 0 0;
  }

  .product_info {
    padding: 20px 15px;
  }

  .product_type {
    font-weight: bold;
    color: var(--color-main);
    margin-right: 5px;
  }

  .product_title {
    height: 30px;
    margin-bottom: 16px;
    font-size: 16px;
    line-height: 1.1rem;
  }

  .user_name {
    font-size: 13px;
  }

  .product_price {
    font-size: 16px;
    font-weight: 600;
  }

  .period {
    font-size: 12px;
    background-color: var(--color-trans-grey);
    padding: 5px;
    border-radius: 5px;
  }

  .price_nickname {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
