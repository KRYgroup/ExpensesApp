import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import backgroundImage1 from "../images/signup.png";

const LoginContainer = styled.div`
  background-image: url(${backgroundImage1});
  background-size: cover;
  background-position: center center;
  padding: 20px;
  border-radius: 10px;
  height: 100vh;
  display: flex;
  align-items: center; // 水平方向の位置を中央に
  justify-content: flex-end; // 垂直方向の位置を右端に
  padding-right: 12%; // 右端から25%の位置に設定
`;

const Form = styled.form`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin-left: auto; // 左側に自動のマージンを設定し、右側に寄せる
  margin-right: 0; // 右側のマージンを0に設定
`;

const Input = styled.input`
  width: calc(100% - 20px); // paddingを考慮した幅
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc; // ボーダーカラーをより柔らかい色に
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); // 内側に影を追加
`;

const Button = styled.button`
  background-color: #88a65e; // ボタンの色をより自然な緑色に変更
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold; // フォントを太く
  margin-top: 20px; // ボタンの上の余白を追加
  transition: background-color 0.3s; // 背景色の変化にアニメーションを追加

  &:hover {
    background-color: #769f3e; // ホバー時の背景色を変更
  }
`;

const Login = ({ onUpdateUser, onBudgetUpdate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        fetchUserInfo(data.token, onUpdateUser);
        fetchUserBudget(data.token);
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const fetchUserInfo = async (token, onUpdateUser) => {
    try {
      const response = await fetch("http://localhost:3001/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const userInfo = await response.json();
        onUpdateUser(userInfo);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchUserBudget = async (token) => {
    try {
      const response = await fetch("http://localhost:3001/user-budget", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        onBudgetUpdate(data.budget);
      } else {
        console.error("Error fetching user budget:", data.message);
      }
    } catch (error) {
      console.error("Error fetching user budget:", error);
    }
  };

  return (
    <LoginContainer>
    <div>
      <Form onSubmit={handleSubmit}>
      <h2>Login</h2>
        <div>
          <label>Email:</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit">Login</Button>
      </Form>
    </div>
    </LoginContainer>
  );
};

export default Login;
