import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const WelcomeContainer = styled.div`
  text-align: center;
  padding: 50px;
`;

const WelcomeTitle = styled.h1`
  margin-bottom: 20px;
`;

const WelcomePage = () => {
  return (
    <WelcomeContainer>
      <WelcomeTitle>Welcome to ExpensesApp</WelcomeTitle>
      <p>
        <Link to="/login">Login</Link> if you already have an account.
      </p>
      <p>
        Or <Link to="/signup">Signup</Link> if you're new here.
      </p>
    </WelcomeContainer>
  );
};

export default WelcomePage;
