import React, { useState, useEffect } from 'react';

function TransactionForm({ addTransaction, date }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [type, setType] = useState('expense');
  const [categories, setCategories] = useState([]);

  const expenseCategories = [
    'food', 'social life', 'transport', 'pets', 'culture', 'household', 'apparel', 'beauty', 'health', 'education', 'gift'
  ];

  const incomeCategories = ['salary', 'invest', 'interest', 'split bill'];

  useEffect(() => {
    // 取引タイプに応じてカテゴリリストを設定
    if (type === 'expense') {
      setCategories(expenseCategories);
      setCategory(expenseCategories[0]);
    } else if (type === 'income') {
      setCategories(incomeCategories);
      setCategory(incomeCategories[0]);
    }
    setNewCategory('');
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryValue = category === 'other' ? newCategory : category;
    addTransaction({ date, category: categoryValue, amount: parseFloat(amount), type });
    setAmount('');
    setCategory('');
    setNewCategory('');
    setType('expense');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
        <option value="other">Other</option>
      </select>
      {category === 'other' && (
        <input type="text" value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="Description" />
      )}
      <button type="submit">Submit</button>
    </form>
  );
}

export default TransactionForm;
