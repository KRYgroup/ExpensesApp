import React from 'react';
import styled from 'styled-components';

const TransactionItem = styled.li`
  background-color: white;
  list-style-type: none;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  color: ${props => props.type === 'expense' ? 'black' : 'green'};
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  background-color: #FF8856;
  color: black;
  font-weight: bold;
`;

function TransactionList({ transactions, onDelete }) {
  // 日付を dd/mm/yyyy 形式にフォーマットする関数
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <ul>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} type={transaction.type}>
          {formatDate(transaction.date)} - {transaction.category}: {transaction.amount} ({transaction.type})
          <DeleteButton onClick={() => onDelete(transaction.id)}>Delete</DeleteButton>
        </TransactionItem>
      ))}
    </ul>
  );
}

export default TransactionList;


