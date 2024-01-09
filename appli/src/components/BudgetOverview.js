import React from 'react';

function BudgetOverview({ budget }) {
  return (
    <div>
      <h2>Budget Overview</h2>
      <p>Your current budget is: ${budget}</p>
    </div>
  );
}

export default BudgetOverview;
