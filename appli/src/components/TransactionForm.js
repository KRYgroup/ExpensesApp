import React, { useState } from 'react';

function TransactionForm({ addTransaction, date }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [type, setType] = useState('expense');

  const predefinedCategories = [
    'food', 'social life', 'transport', 'pets', 'culture',
    'household', 'apparel', 'beauty', 'health', 'education',
    'gift',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryValue = category === 'add' ? newCategory : category;
    const newTransaction = {
      date: date,
      category: categoryValue,
      amount: parseFloat(amount),
      type: type
    };
    addTransaction(newTransaction);
    setAmount('');
    setCategory('');
    setNewCategory('');
    setType('expense');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {predefinedCategories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
        <option value="add">Other</option>
      </select>
      {category === 'add' && (
        <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Description" />
      )}
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TransactionForm;
