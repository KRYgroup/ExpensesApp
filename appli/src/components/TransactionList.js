import React from 'react';

function TransactionList({ transactions, onDelete }) {

  console.log(onDelete); 
  console.log("TransactionList rendering")

  return (
    <ul>
      {transactions.map((transaction, index) => (
        <li key={index}>
          {transaction.date} - {transaction.category}: {transaction.amount} ({transaction.type})
          <button onClick={() => onDelete(transaction.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
