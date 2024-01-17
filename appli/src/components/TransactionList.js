import React from "react";
import styled from "styled-components";

const TransactionItem = styled.li`
  background-color: white;
  list-style-type: none;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  color: ${(props) => (props.type === "expense" ? "black" : "green")};
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  background-color: #ff8856;
  color: black;
  font-weight: bold;
`;

const TransactionList = ({ transactions, onDelete }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <ul>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction._id} type={transaction.type}>
          {formatDate(transaction.date)} - {transaction.category}: {transaction.amount} ({transaction.type})<DeleteButton onClick={() => onDelete(transaction._id)}>Delete</DeleteButton>
          {formatDate(transaction.date)} - {transaction.category}: {transaction.amount} ({transaction.type})<DeleteButton onClick={() => onDelete(transaction._id)}>Delete</DeleteButton>
        </TransactionItem>
      ))}
    </ul>
  );
};

export default TransactionList;
