import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import backgroundImage1 from "../images/signup.png";

const SignupContainer = styled.div`
  background-image: url(${backgroundImage1});
  background-size: cover;
  background-position: center center;
  padding: 20px;
  height: 100vh;
  display: flex;
  align-items: center; // 水平方向の位置を中央に
  justify-content: flex-end; // 垂直方向の位置を右端に
  padding-right: 12%; // 右端から25%の位置に設定
`;

const Form = styled.form`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin-left: auto; // 左側に自動のマージンを設定し、右側に寄せる
  margin-right: 0; // 右側のマージンを0に設定

  // スマートフォンサイズのデバイス向けのメディアクエリ
  @media (max-width: 600px) {
    max-width: 250px; // スマートフォンの画面サイズに合わせてフォームの最大幅を小さくする
    padding: 20px; // スマートフォンの画面サイズに合わせてパディングを調整する
  }
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

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        navigate("/signup-complete");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <SignupContainer>
      <div>
        <Form onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <div>
            <label>Name:</label>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Confirm Password:</label>
            <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <Button type="submit">Sign up</Button>
          <p>
            Already have an account? <Link to="/login">Log in here</Link> {/* Link to login page */}
          </p>
        </Form>
      </div>
    </SignupContainer>
  );
};

export default Signup;
