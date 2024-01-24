import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    font-family: "Pretendard";
    /* 색 */
    --color-main: #56b778;
    --color-dark: #4b9f68;
    --color-navy: #132644;
    --color-lime: #E1FF67;
    --color-blue: #1643DB;
    --color-steelblue: #5472A1;
    --color-maingrey: #C4C4C4;
    --color-darkgrey: #767676;
    --color-lightgrey: #DBDBDB;
    --color-trans-grey: #f2f2f2;
    --color-red: #EB5757;
    --color-bg: #F2F2F2;

    /* 폰트 */
    --font-main: 'Pretendard', sans-serif;
}
`;
