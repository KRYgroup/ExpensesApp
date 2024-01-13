import React from "react";
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
  align-items: flex-start; // コンテナ内のアイテムを開始端（左）に揃えます
  padding-left: 70%; // コンテンツを右側に寄せるための左側のパディング
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 20px;
  text-align: left; // テキストは左揃え
  font-size: 30px;
`;

const Message = styled.p`
  color: white;
  margin-bottom: 30px;
  text-align: left; // テキストは左揃え
  font-size: 30px;
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
`;




const SignupComplete = () => {
  return (
    <CompleteContainer>
      <Title>Thank you for Signing Up!</Title>
      <Message>Your account has been created. You can now log in to get started.</Message>
      <StyledLink to="/login">Log in here</StyledLink>
    </CompleteContainer>
  );
};

export default SignupComplete;