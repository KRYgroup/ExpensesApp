import React, { useState } from 'react';

function TransactionForm({ addTransaction }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('expense'); // 'expense' または 'income'

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      date: date || new Date().toISOString().split('T')[0], // 日付が入力されていない場合、現在の日付を使用
      category: category,
      amount: parseFloat(amount),
      type: type
    };
    addTransaction(newTransaction); // 新しい取引を追加する関数を呼び出す
    // フォームのフィールドをクリアする
    setAmount('');
    setCategory('');
    setDate('');
    setType('expense');
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
