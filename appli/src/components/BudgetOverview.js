import React from "react";
import styled from "styled-components";

function BudgetOverview({ budget }) {
  return (
    <div>
      <BudgetParagraph>Your current budget is: ${budget}</BudgetParagraph>
    </div>
  );
}

export default BudgetOverview;

const BudgetParagraph = styled.p`
  font-family: "Playfair Display", serif;
  color: #6b4e37; // 暗めの木の色
  background: url("path-to-wood-texture.jpg") repeat;
  padding: 15px;
  margin-bottom: 30px;
  border: 4px solid #917856; // 木の色をした境界線
  border-radius: 5px;
  font-size: 25px;
  text-shadow: 1px 1px 2px #917856; // テキストに影をつけて読みやすく
`;
