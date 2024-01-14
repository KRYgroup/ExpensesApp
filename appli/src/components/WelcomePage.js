import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import backgroundImage1 from "../images/signup.png";

const WelcomeContainer = styled.div`
  background-image: url(${backgroundImage1});
  background-size: cover;
  background-position: center center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 50%; 
  padding-bottom: 10%; 
`;

const WelcomeTitle = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-align: center;
  font-size: 60px;
`;

const StyledParagraph = styled.p`
  color: #f3f3f3; // 明るいグレーで自然な色合い
  font-size: 20px;
  margin-bottom: 10px; // 適切な間隔
`;

const StyledLink = styled(Link)`
  color: #00AA00; // ソフトな青色
  text-decoration: none; // アンダーラインなし

  &:hover {
    color: #00CC00; // ホバー時の色
    text-decoration: underline; // ホバー時にアンダーラインを表示
  }
`;

const WelcomePage = () => {
  return (
    <WelcomeContainer>
      <WelcomeTitle>Welcome to ExpensesApp</WelcomeTitle>
      <StyledParagraph>
        <StyledLink to="/login">Login</StyledLink> if you already have an account.
      </StyledParagraph>
      <StyledParagraph>
        Or <StyledLink to="/signup">Signup</StyledLink> if you're new here.
      </StyledParagraph>
    </WelcomeContainer>
  );
};

export default WelcomePage;
