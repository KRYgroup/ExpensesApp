// Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 10px 20px;
  text-align: center;
  // 他のスタイリング
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 ExpensesApp. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
