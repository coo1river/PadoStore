"use client";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "../styles/fonts.css";

const GlobalStyle = createGlobalStyle`
${reset}


:root {
    /* 색 */
    --color-main: #3EABFA;
    --color-dark: #4b9f68;
    --color-navy: #132644;
    --color-lime: #E1FF67;
    --color-blue: #1643DB;
    --color-blackgrey: #2c2c2c;
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

body {
    height: 100vh;
    color: #333333;
    font-family: 'Pretendard', sans-serif;
    overflow: scroll;
    &::-webkit-scrollbar{
        display: none;
    }
}


input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input, textarea {
    font-family: 'Pretendard', sans-serif;
}

select{
    &:focus-visible{
        outline:none;
    }
}


button:focus,
button:active,
textarea,
textarea:focus,
textarea:active,
input{
border: none;
  box-shadow: none;
  outline: none;
}

textarea{
    resize: none;
}

a {
    text-decoration: none;
    color: inherit;
}

button {
  font-size: 16px;
    border: 0;
    background: none;
    font-family: 'Pretendard', sans-serif;
}

button:enabled {
    cursor: pointer;
}


.a11y-hidden {
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
    }



`;

export default GlobalStyle;
