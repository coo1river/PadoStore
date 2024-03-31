import styled from "styled-components";
import { GroupForm } from "./UploadStyle";
import { HomeMain } from "./homeStyle";
import iconMenu from "@/../public/assets/svgs/menu-dots.svg";
import iconSoldOut from "@/../public/assets/images/soldout.png";

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
    gap: 30px;
    padding-bottom: 60px;
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
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;

  .product_contents {
    line-height: 1.5rem;
    margin: 60px 0;
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
  height: calc(100% - 215px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .icon_check {
    width: 80px;
    height: 80px;
  }

  .completed_text {
    margin: 20px;
    font-size: 20px;
    font-weight: bold;
  }
`;
