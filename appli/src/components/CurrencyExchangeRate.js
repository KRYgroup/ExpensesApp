import React, { useState, useEffect } from "react";
import { convertCurrency } from "../utils/api";

const CurrencyExchangeRate = ({ baseCurrency, targetCurrency, amount, label }) => {
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchConvertedAmount = async () => {
      const result = await convertCurrency(baseCurrency, targetCurrency, amount);
      if (result && result.result) {
        const roundedAmount = Math.floor(result.result);
        setConvertedAmount(roundedAmount);
      }
    };

    if (amount > 0) {
      fetchConvertedAmount();
    }
  }, [baseCurrency, targetCurrency, amount]);

  return (
    <div>
      {convertedAmount && (
        <p>
          {label}: {amount} {baseCurrency} ≈ {convertedAmount} {targetCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyExchangeRate;
