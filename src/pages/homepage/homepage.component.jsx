import React from "react";
import Directory from "../../components/directory/directory.component";
import "./homepage.style.scss";
import { HomePageContainer } from "./homepage.styles";
const HomePage = () => (
  <HomePageContainer>
    <h1>WELCOME TO SUMAZON</h1>
    <br />
    <Directory />
  </HomePageContainer>
);

export default HomePage;
