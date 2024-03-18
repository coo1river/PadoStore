import styled from "styled-components";

export const DetailModalDiv = styled.div`
  text-align: center;
  position: absolute;
  right: 10px;
  top: 20px;
  width: fit-content;
  height: fit-content;
  background-color: white;
  border-radius: 15px;
  border: 1px solid rgba(224, 224, 224, 0.377);
  box-shadow: 0px 0px 5px 0px #5e5e5e2c;

  li {
    font-weight: 500;
    cursor: pointer;
    padding: 14px 40px;

    &:hover {
      background-color: #d4d4d47f;
    }

    &:first-child:hover {
      border-radius: 15px 15px 0 0;
    }

    &:nth-child(3):hover {
      border-radius: 0 0 15px 15px;
    }

    &.active {
      color: var(--color-main);
    }
  }
`;
