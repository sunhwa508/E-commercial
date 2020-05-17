import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

body {
    font-family: "Righteous", cursive;
    padding: 40px 60px;

    @media screen and (max-width: 800px) {
        padding: 10px;
    }
  }
a {
    text-decoration: none;
    color: black;
  }
* {
    font-family: "Righteous", cursive;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  `;
