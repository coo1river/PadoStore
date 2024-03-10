import styled from "styled-components";

export const HomeMain = styled.main`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding-bottom: 30px;

  .title_tag {
    margin-bottom: 20px;
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
    gap: 24px;

    .btn_tab {
      width: fit-content;
      font-size: 20px;
      font-weight: 700;
      margin: 10px;
      padding-bottom: 10px;
      text-align: center;
      cursor: pointer;
    }

    .active {
      color: var(--color-main);
      border-bottom: 4px solid var(--color-main);
    }
  }
`;

export const MainBanner = styled.article`
  cursor: pointer;

  & img {
    border-radius: 15px;
    object-fit: cover;
    width: 1200px;
    height: 320px;
  }
`;

export const ProductTab = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 40px;

  .sell_list {
    display: flex;
    justify-content: space-between;
  }
`;

export const ProductArticle = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 210px;
  box-shadow: 0px 0px 4px 0px #0000001f;
  border-radius: 15px;
  cursor: pointer;
  margin-bottom: 50px;

  &:hover > * {
    transform: scale(1.03);
    transition: 0.1s all ease-in-out;
  }

  img {
    width: 100%;
    border-radius: 15px 15px 0 0;
  }

  .product_info {
    padding: 12px 16px;
  }

  .product_title {
    height: 30px;
    margin-bottom: 16px;
    font-size: 16px;
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
