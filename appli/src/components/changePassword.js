import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import backgroundImage1 from "../images/signup.png";

const Container = styled.div`
  background-image: url(${backgroundImage1});
  background-size: cover;
  background-position: center center;
  padding: 20px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 5%;
`;

const Form = styled.form`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: 0%;

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

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Password changed successfully. Please login again.");
        navigate("/login");
      } else {
        alert("Failed to change password: " + data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred while changing password.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Change Password</h2>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" required />
        <Button type="submit">Change Password</Button>
      </Form>
    </Container>
  );
};

export default ChangePassword;
