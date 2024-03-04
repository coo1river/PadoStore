import styled from "styled-components";
import { GroupForm } from "./UploadStyle";
import { HomeMain } from "./homeStyle";
import iconMenu from "@/../public/assets/svgs/menu-dots.svg";

export const ProductMain = styled(HomeMain)`
  .product_detail {
    width: 100%;
  }
`;

export const ProductInfo = styled.article`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5rem;

  &:first-child {
    padding-bottom: 10px;
    border-bottom: 2px solid var(--color-trans-grey);
  }

  .product_intro_button {
    margin: 20px 0;
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    strong {
      font-weight: 500;
    }
  }

  .product_intro {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding-bottom: 40px;
    border-bottom: 2px solid var(--color-trans-grey);
  }

  .title_update {
    display: flex;
    justify-content: space-between;
    position: relative;

    .btn_update {
      margin-right: 20px;
      width: 20px;
      height: 20px;

      background: url(${iconMenu.src}) center/15px no-repeat;
    }
  }

  .product_title {
    font-weight: 600;
    font-size: 30px;
  }

  .product_price {
    font-size: 30px;
    font-weight: 700;
    color: var(--color-main);
  }

  .profile_wrap {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .img_profile {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  .user_name {
    font-size: 15px;
    font-weight: 500;
  }

  button {
    width: 200px;
    height: 50px;
    background-color: var(--color-main);
    color: white;
    font-size: 20px;
    font-weight: 600;
    border-radius: 15px;
    margin-right: 10px;
  }

  .btn_like {
    background-color: white;
    color: var(--color-main);
    border: 2px solid var(--color-main);
  }
`;

export const ProductImg = styled.img`
  object-fit: contain;
  width: 400px;
  height: 400px;
  border-radius: 15px;
  background-color: var(--color-trans-grey);
`;

export const ProductContent = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .product_contents {
    margin-top: 50px;
    font-size: 18px;
  }
`;

export const GroupSubmit = styled(GroupForm)`
  width: 100%;
`;
