import React from "react";
import styled from "styled-components";
import CurrencyExchangeRate from "./CurrencyExchangeRate";

function BudgetOverview({ budget, baseCurrency, targetCurrency, showConverted }) {
  return (
    <div>
      <BudgetParagraph>Your current budget is: {showConverted ? <CurrencyExchangeRate baseCurrency={baseCurrency} targetCurrency={targetCurrency} amount={budget} label="" /> : `${budget} ${baseCurrency}`}</BudgetParagraph>
    </div>
  );
}

export default BudgetOverview;

const BudgetParagraph = styled.p`
  font-family: "Playfair Display", serif;
  color: #6b4e37; // 暗めの木の色
  background: url("path-to-wood-texture.jpg") repeat;
  padding: 15px;
  margin-bottom: 50px;
  border: 4px solid #917856; // 木の色をした境界線
  border-radius: 5px;
  font-size: 25px;
  text-shadow: 1px 1px 2px #917856; // テキストに影をつけて読みやすく
`;
