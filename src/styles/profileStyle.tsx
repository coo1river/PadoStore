import styled from "styled-components";
import { LoginMain } from "./loginStyle";

export const ProfileMain = styled(LoginMain)`
  justify-content: start;
  align-items: start;

  .img_profile {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: 0px 0px 4px 0px #0000001f;
    background-color: white;
  }

  .list_wrap {
    background-color: white;
    border-radius: 15px;
    width: 100%;
    max-width: 1080px;

    display: flex;
    margin: 0 auto;
    box-shadow: 0px 0px 4px 0px #0000001f;
  }

  .nav_menu {
    width: 150px;
    display: flex;
    height: 100%;
    flex-direction: column;

    font-size: 14px;
    line-height: 3rem;
    box-sizing: border-box;
    padding: 20px;
    color: white;
    border-radius: 10px;
    background-color: var(--color-main);

    p {
      font-size: 18px;
      font-weight: 700;
      border-bottom: 2px solid white;
    }

    li {
      cursor: pointer;
    }
  }

  .article_list {
    margin: 10px 20px;
    padding: 20px;
    width: 100%;
    line-height: 1.5rem;

    button {
      padding: 5px 20px;
      border-radius: 15px;
      margin: 0 10px 10px 0;
      font-weight: 600;
      background-color: var(--color-trans-grey);
    }

    ul {
      margin: 15px 0;
    }

    li {
      padding: 5px 0;
      border-bottom: 2px solid var(--color-trans-grey);
    }

    p {
      text-align: center;
    }
  }
`;

export const UserProfile = styled.section`
  width: 100%;
  max-width: 1080px;
  box-sizing: border-box;
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 0 auto;
  padding: 30px;
  gap: 30px;
  /* border-bottom: 2px solid #cecece; */

  .nickname {
    font-weight: 700;
    font-size: 22px;
    margin-bottom: 10px;
  }

  .profile_info_wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .rating {
    font-weight: 600;
  }

  .review_wish_list {
    display: flex;
    gap: 10px;
  }

  button {
    padding: 5px 20px;
    font-size: 16px;

    span {
      font-weight: 700;
    }
  }
`;
