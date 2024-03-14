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
  justify-content: flex-start;
  padding-top: 10vh;
  padding-left: 50%;
  padding-bottom: 10%;

  @media (max-width: 1024px) {
    padding-left: 40%;
  }

  @media (max-width: 768px) {
    padding-left: 5%;
    padding-top: 10vh;
  }

  @media (max-width: 480px) {
    padding: 10px;
    padding-top: 15vh;
  }
`;

const WelcomeTitle = styled.h1`
  color: white;
  margin-bottom: 20px;
  text-align: center;
  font-size: 80px;

  @media (max-width: 768px) {
    font-size: 55px;
    padding-left: 40%;
  }

  @media (max-width: 480px) {
    font-size: 30px;
    padding-left: 40%;
  }
`;

const StyledParagraph = styled.p`
  color: #eeeeee;
  font-size: 30px;
  margin-bottom: 10px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
    padding-left: 40%;
    color: #808080;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    padding-left: 40%;
    color: #808080;
  }
`;

const StyledLink = styled(Link)`
  color: #669933;
  text-decoration: none;

  &:hover {
    color: #66ff66;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    color: #669933;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    color: #669933;
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
