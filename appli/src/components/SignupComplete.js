import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import backgroundImage1 from "../images/signup.png";

const CompleteContainer = styled.div`
  background-image: url(${backgroundImage1});
  background-size: cover;
  background-position: center center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 70%;

  @media (max-width: 480px) {
    padding-right: 50px;
  }
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 20px;
  text-align: left;
  font-size: 30px;
  width: 80%;

  @media (max-width: 480px) {
    font-size: 15px;
    width: 140%;
  }
`;

const Message = styled.p`
  color: white;
  margin-bottom: 30px;
  text-align: left;
  font-size: 30px;

  @media (max-width: 480px) {
    font-size: 20px;
    width: 140%;
  }
`;

const StyledLink = styled(Link)`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #88a65e;
  color: white;
  text-decoration: none;
  &:hover {
    background-color: #769f3e;
  }

  @media (max-width: 480px) {
    padding-right: 20px;
    font-size: 20px;
    max-width: 50px;
    width: 80%;
  }
`;

const SignupComplete = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CompleteContainer>
      <Title>Thank you for signing up!</Title>
      <Message>{isMobile ? "You can now log in to get started." : "Your account has been created. You can now log in to get started."}</Message>
      <StyledLink to="/login">Login</StyledLink>
    </CompleteContainer>
  );
};

export default SignupComplete;
