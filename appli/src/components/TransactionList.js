import React from 'react';

function TransactionList({ transactions }) {
  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index}>
          {transaction.date} - {transaction.category}: {transaction.amount} ({transaction.type})
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
