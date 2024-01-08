// Header.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  text-align: center;
  // 他のスタイリング
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

const Header = () => {
  return (
    <HeaderContainer>
      <h1>ExpencesApp</h1>
      <Nav>
        <StyledLink to="/">Dashboard</StyledLink>
        <StyledLink to="/about">Transaction Form</StyledLink>
        <StyledLink to="/contact">Transaction List</StyledLink> {/*to 以降随時変更*/}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
