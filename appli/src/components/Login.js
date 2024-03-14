import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import backgroundImage1 from "../images/signup.png";

const LoginContainer = styled.div`
  background-image: url(${backgroundImage1});
  background-size: cover;
  background-position: center center;
  padding: 20px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12%;
`;

const Form = styled.form`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 600px) {
    max-width: 250px;
    padding: 20px;
  }
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  background-color: #88a65e;
  color: white;
  padding: 15px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #769f3e;
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
        navigate("/dashboard");
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
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          </div>
          <div>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <p>
            Forgot your password? <Link to="/change-password">Change password here</Link>
          </p>
          <p>
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    </LoginContainer>
  );
};

export default Login;
