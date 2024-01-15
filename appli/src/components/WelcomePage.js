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
  justify-content: flex-start; // コンテンツを上部に寄せる
  padding-top: 10vh; // 上部のスペースを調整
  padding-left: 50%; // ラージスクリーンでコンテンツを右に寄せる
  padding-bottom: 10%;

  @media (max-width: 1024px) { // タブレットサイズ
   
padding-left: 40%; // タブレットサイズでは左のパディングを少なくする
}

@media (max-width: 768px) { // モバイルサイズ
padding-left: 5%; // モバイルサイズでは左のパディングを減らす
padding-top: 10vh; // コンテンツを少し下げる
}

@media (max-width: 480px) { // 小さなモバイルデバイス
padding: 10px; // 小さなデバイスではパディングを均一にする
padding-top: 15vh; // ヘッダー部分にスペースを追加する
}
`;

const WelcomeTitle = styled.h1`
color: white;
margin-bottom: 20px;
text-align: center;
font-size: 80px;

@media (max-width: 768px) {
font-size: 55px; // モバイルサイズでフォントサイズを小さくする
padding-left: 40%;
}

@media (max-width: 480px) {
font-size: 30px; // 小さなモバイルデバイスでフォントサイズをさらに小さくする
padding-left: 40%;
}
`;

const StyledParagraph = styled.p`
color: #EEEEEE; // 明るいグレーで自然な色合い
font-size: 30px;
margin-bottom: 10px; // 適切な間隔

@media (max-width: 768px) {
font-size: 20px; // モバイルサイズでフォントサイズを小さくする
padding-left: 40%;
color: #808080; 
}

@media (max-width: 480px) {
font-size: 10px; // 小さなモバイルデバイスで
padding-left: 40%;
color: #808080; 
}
`;

const StyledLink = styled(Link)`
color: #669933;  // ソフトな青色
text-decoration: none; // アンダーラインなし

&:hover {
color: #66FF66; // ホバー時の色
text-decoration: underline; // ホバー時にアンダーラインを表示
}

@media (max-width: 768px) {
font-size: 20px; // モバイルサイズでフォントサイズを調整
color: #669933; 
}

@media (max-width: 480px) {
font-size: 10px; // 小さなモバイルデバイスでフォントサイズを調整
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
