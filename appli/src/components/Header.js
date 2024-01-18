// Header.js
import React, { useState } from "react";
import styled from "styled-components";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../images/pig1.png";
import chartImage from "../images/Indian.png";

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

const ChartImage = styled.img`
  max-width: 100%;
`;

const StyledButton = styled.button`
  color: white;
  margin: 0 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    text-decoration: underline;
  }
`;

/*const StyledLink = styled(Link)`
  color: white;
  margin: 0 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
*/

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
  const [showChart, setShowChart] = useState(false);

  const handleChartButtonClick = () => {
    setShowChart(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <HeaderContainer>
      <h1>ExpensesApp</h1>
      <Nav>
        <StyledButton onClick={handleChartButtonClick}>Charts</StyledButton>
        {userInfo && <p>Welcome, {userInfo.name}!</p>}
        <Logout onClick={handleLogout}>Logout</Logout>
      </Nav>
      {showChart && <ChartImage src={chartImage} alt="Chart" />}
    </HeaderContainer>
  );
};

export default Header;
