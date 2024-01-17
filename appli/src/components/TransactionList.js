import React from "react";
import styled from "styled-components";
import CurrencyExchangeRate from "./CurrencyExchangeRate";

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

const TransactionList = ({ transactions, onDelete, baseCurrency, targetCurrency, showConverted }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <ul>
      {transactions.map((transaction) => (
        <TransactionItem key={transaction._id} type={transaction.type}>
          <div>
            {formatDate(transaction.date)} - {transaction.category}:{showConverted ? <CurrencyExchangeRate baseCurrency={baseCurrency} targetCurrency={targetCurrency} amount={transaction.amount} /> : `${transaction.amount} ${baseCurrency}`}({transaction.type})
          </div>
          <DeleteButton onClick={() => onDelete(transaction._id)}>Delete</DeleteButton>
        </TransactionItem>
      ))}
    </ul>
  );
};

export default TransactionList;
