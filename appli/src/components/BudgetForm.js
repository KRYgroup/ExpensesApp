import React, { useState } from "react";
import styled from "styled-components";
import backgroundImage1 from "../images/wood1.png";
import backgroundImage2 from "../images/wood2.png";

function BudgetForm({ onFormSubmit }) {
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    if (value < 0) {
      setError("Budget cannot be negative");
    } else {
      setError("");
      setBudget(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (error) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/update-budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ budget: budget }),
      });

      const data = await response.json();
      if (response.ok) {
        onFormSubmit(budget);
        console.log("Budget updated:", data.message);
      } else {
        console.error("Error updating budget:", data.message);
      }
    } catch (error) {
      console.error("Error updating budget:", error);
    }

    setBudget("");
  };

  return (
    <StyledBudgetForm onSubmit={handleSubmit}>
      <label htmlFor="budget">Set Your Budget:</label>
      <input type="number" id="budget" name="budget" value={budget} onChange={handleBudgetChange} required />
      <button type="submit">Submit</button>
      <StyledErrorMessage style={{ visibility: error ? "visible" : "hidden" }}>{error}</StyledErrorMessage>
    </StyledBudgetForm>
  );
}

const StyledErrorMessage = styled.div`
  color: red;
  margin-top: 5px;
  margin-bottom: 10px; // Ensure there's a margin below the error message
  margin-left: 300px;
  font-size: 14px;
  text-align: left;
  height: 20px; // Set a fixed height for the error container
  visibility: hidden; // By default, the error message is not visible

  // メディアクエリを追加
  @media (max-width: 768px) {
    margin-left: 0; // 画面幅が768px以下の場合、左マージンを取り除く
    text-align: left; // エラーメッセージのテキストを左寄せにする
  }
`;

export default BudgetForm;

const StyledBudgetForm = styled.form`
  text-align: left;
  margin-top: 30px;

  label {
    font-size: 30px;
    font-weight: bold;
    color: #6b4e37;
    text-shadow: 1px 1px 3px rgba(255, 255, 255, 0.5);
  }

  input {
    margin-left: 10px;
    background-color: #ffefd5;
    padding: 10px;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2); /* 軽い影を追加 */
    font-size: 1.2rem;
    color: #555;
  }

  button {
    margin-left: 10px;
    background-image: url(${backgroundImage1});
    color: #fff;
    font-size: 1.2rem;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* ホバーエフェクトのトランジション */
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.3s ease, transform 0.1s ease; /* ボックスシャドウとトランスフォームにトランジションを追加 */
  }

  button:active {
    /* ボタンがクリックされたときのスタイル */
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2); /* 影を小さくする */
    transform: translateY(2px); /* ボタンを少し下に移動 */
  }

  button:hover {
    background-image: url(${backgroundImage2});
  }
`;
