import React, { useState } from 'react';

function TransactionForm() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('expense'); // 'expense' または 'income'

  const handleSubmit = (e) => {
    e.preventDefault();
    // ここで入力値を処理します（例えば、状態をリフトアップして親コンポーネントに送信）
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TransactionForm;
