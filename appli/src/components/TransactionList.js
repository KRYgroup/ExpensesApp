import React from 'react';


function TransactionList({ transactions, onDelete }) {
  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li key={transaction.id || index}>
          {transaction.date} - {transaction.category}: {transaction.amount} ({transaction.type})
          <button onClick={() => onDelete(transaction.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;

