// Header.js
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/pig1.png";

const HeaderContainer = styled.header`
  background-image: url(${backgroundImage});
  background-size: cover; // 背景画像をカバーとして設定
  background-repeat: no-repeat; // 背景画像の繰り返しを防ぐ
  background-position: center; // 背景画像を中央に配置
  color: white;
  padding: 10px 20px;
  text-align: right;
  margin-bottom: 20px;
  font-size: 30px;
`;

const Nav = styled.nav`
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  color: white;
  margin: 0 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Logout = styled.button`
  background-color: #BBBBBB;
  color: black;
  font-weight: bold;
  border: 1px, solid, black;
  cursor: pointer;
  border-radius: 5px;
  padding: ${({ size }) => size ? `${size / 3}px ${size}px` : '10px 20px'};
  font-size: ${({ fontSize }) => fontSize || '16px'};
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
        <StyledLink to="/">Charts</StyledLink>
        {userInfo && <p>Welcome, {userInfo.name}</p>}
        <Logout onClick={handleLogout}>Logout</Logout>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
