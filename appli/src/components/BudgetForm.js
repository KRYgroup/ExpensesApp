import React, { useState } from 'react';

function BudgetForm({ onFormSubmit }) {
  const [budget, setBudget] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit(budget);
    setBudget('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="budget">Set Your Budget:</label>
      <input
        type="number"
        id="budget"
        name="budget"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default BudgetForm;
