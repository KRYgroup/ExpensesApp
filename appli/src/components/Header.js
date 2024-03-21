// Header.js
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/pig1.png";

const HeaderContainer = styled.header`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  padding: 10px 20px;
  text-align: right;
  margin-bottom: 20px;

  // デフォルトのフォントサイズ
  font-size: 30px;

  // 画面サイズが768px以下の場合にフォントサイズを小さくする
  @media (max-width: 768px) {
    font-size: 24px;
  }

  // 画面サイズが480px以下の場合にさらにフォントサイズを小さくする
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;


const Nav = styled.nav`
  margin-top: 10px;
`;

const Logout = styled.button`
  background-color: #bbbbbb;
  color: black;
  font-weight: bold;
  border: 1px, solid, black;
  cursor: pointer;
  border-radius: 5px;
  padding: ${({ size }) => (size ? `${size / 3}px ${size}px` : "10px 20px")};
  font-size: ${({ fontSize }) => fontSize || "16px"};
  margin-left: 10px;
`;

const Header = ({ userInfo }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <h1>ExpensesApp</h1>
      <Nav>
        {userInfo && <p>Welcome, {userInfo.name}!</p>}
        <Logout onClick={handleLogout}>Logout</Logout>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
