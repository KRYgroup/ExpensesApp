import React, { useState } from 'react';

function TransactionForm({ addTransaction, date }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      date: date, // Dashboardから渡された日付を使用
      category: category,
      amount: parseFloat(amount),
      type: type
    };
    addTransaction(newTransaction);
    setAmount('');
    setCategory('');
    setType('expense');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TransactionForm;
