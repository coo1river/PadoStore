import styled from "styled-components";
import { GroupForm } from "./uploadStyle";
import { HomeMain } from "./homeStyle";
import iconMenu from "@/../public/assets/svgs/menu-dots.svg?url";
import iconSoldOut from "@/../public/assets/images/soldout.png";

export const ProductMain = styled(HomeMain)`
  flex: 1 1 auto;

  .product_detail {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

export const ProductInfo = styled.article`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5rem;
  position: relative;

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
    gap: 25px;
    padding-bottom: 30px;
    border-bottom: 2px solid var(--color-trans-grey);
    .product_condition_ship {
      p {
        margin-bottom: 10px;
      }
    }
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

  .btns_wrap {
    display: flex;
  }

  .btn_like {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    color: var(--color-main);
    border: 2px solid var(--color-main);

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    svg {
      margin-left: 5px;
    }
  }
`;

export const ProfileImg = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

export const SoldOutFilter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 400px;
  background: url(${iconSoldOut.src}) center / 250px no-repeat;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 15px;
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
  flex: 1;
  height: auto;
  justify-content: space-between;
  flex-direction: column;
  padding: 40px 0;

  .product_contents {
    line-height: 1.5rem;
    margin-bottom: 40px;
    font-size: 18px;
    font-weight: 500;
  }

  .tag_list {
    display: flex;
    gap: 10px;

    li {
      background-color: var(--color-trans-grey);
      padding: 5px 10px;
      border-radius: 30px;
    }
  }
`;

export const GroupSubmit = styled(GroupForm)`
  width: 100%;
`;

export const SubmitCompleted = styled.main`
  height: calc(100vh - 215px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .icon_check {
    width: 60px;
    height: 60px;
  }

  .completed_text {
    margin: 20px;
    font-size: 22px;
    font-weight: bold;
  }

  .btn_wrap {
    margin-top: 20px;
    display: flex;
    gap: 10px;
  }

  button {
    background-color: var(--color-main);
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 16px;
    position: relative;
  }
`;
