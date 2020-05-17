import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

  @media screen and (max-width: 800px) {
    height: 60px;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 13px;
  }
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;

  @media screen and (max-width: 800px) {
    width: 50px;
    padding: 5px;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media screen and (max-width: 800px) {
    padding: 25px 0;
    width: 70%;
    font-size: 12px;
  }
`;
export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
