"use client";
import styled from "styled-components";
import { HomeMain } from "./homeStyle";

export const ProductMain = styled(HomeMain)`
  .product_detail {
    width: 100%;
  }
`;

export const ProductContent = styled.article`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 5rem;

  &:first-child {
    padding-bottom: 10px;
    border-bottom: 2px solid var(--color-trans-grey);
  }

  .product_intro_wrap {
    width: 800px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .product_title {
    font-weight: 700;
    font-size: 30px;
  }

  .product_price {
    font-size: 25px;
    font-weight: 700;
    color: var(--color-main);
  }

  .product_intro {
    margin-top: 50px;
    font-size: 18px;
  }
`;

export const ProductImg = styled.img`
  width: fit-content;
  height: 400px;
  border-radius: 15px;
`;

export const BuyBtn = styled.button`
  width: 200px;
  height: 50px;
  background-color: var(--color-main);
  color: white;
  font-size: 20px;
  font-weight: 600;
  border-radius: 15px;
`;
