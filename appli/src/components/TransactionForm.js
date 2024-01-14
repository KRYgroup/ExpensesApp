import React, { useState, useEffect } from "react";
import styled from "styled-components";
import backgroundImage1 from "../images/wood2.png";

const Form = styled.form`
  background-image: url(${backgroundImage1});
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #aaa;
  width: 70%; // 幅を75%に設定
  margin: 0 auto;

  input,
  select,
  button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #888;
    border-radius: 4px;
  }

  button {
    background-color: #eee8aa;
    color: black;
    font-weight: bold;
  }

  input,
  select,
  button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #888;
    border-radius: 4px;
    box-sizing: border-box; // Add this line
  }

  select {
    -webkit-appearance: none; // for Chrome, Safari, and Opera
    -moz-appearance: none; // for Firefox
    appearance: none;
    // Reapply any custom styles you need here
  }
`;

function TransactionForm({ addTransaction, date }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [type, setType] = useState("expense");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const expenseCategories = ["food 🍔", "social life 🍺", "transport 🚞", "pets 🐶", "household 🏡", "apparel 👔", "beauty 💄", "health 💊", "education 🎓", "gift 🎁"];

    const incomeCategories = ["salary", "invest", "interest", "split bill"];

    if (type === "expense") {
      setCategories(expenseCategories);
      setCategory(expenseCategories[0]);
    } else if (type === "income") {
      setCategories(incomeCategories);
      setCategory(incomeCategories[0]);
    }
    setNewCategory("");
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryValue = category === "other" ? newCategory : category;
    addTransaction({ date, category: categoryValue, amount: parseFloat(amount), type });
    setAmount("");
    setCategory("");
    setNewCategory("");
    setType("expense");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
        <option value="other">Other</option>
      </select>
      {category === "other" && <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Description" />}
      <button type="submit">Submit</button>
    </Form>
  );
}

export default TransactionForm;
