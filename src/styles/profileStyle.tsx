import styled from "styled-components";
import { LoginMain } from "./loginStyle";

export const ProfileMain = styled(LoginMain)`
  justify-content: start;
  align-items: start;

  .img_profile {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #cecece;
    background-color: white;
  }

  .article_profile {
    width: 100%;
    margin: 0 auto;
  }

  .list_wrap {
    width: 100%;
    max-width: 1080px;

    display: flex;
    margin: 0 auto;
  }

  .nav_menu {
    width: 140px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;

    font-size: 14px;
    line-height: 2rem;
    box-sizing: border-box;
    padding: 20px;
    color: white;
    border-radius: 10px;
    background-color: var(--color-main);

    p {
      font-size: 18px;
      font-weight: 700;
      border-bottom: 2px solid white;
      line-height: 3rem;
    }

    li {
      cursor: pointer;
    }
  }

  .article_list {
    padding: 40px;
    line-height: 3rem;
    width: 100%;
  }
`;

export const UserProfile = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 40px 0 40px 350px;
  display: flex;
  align-items: center;
  gap: 30px;
  border-bottom: 2px solid #cecece;

  .nickname {
    font-weight: 700;
    font-size: 20px;
  }
`;
