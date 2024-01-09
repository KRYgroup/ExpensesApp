import React from 'react';

function TransactionList({ transactions }) {
  return (
    <div>
      <h2>Transaction History</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.date} - {transaction.category}: {transaction.amount}円 ({transaction.type})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
