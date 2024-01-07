//Yosuke
import React, { useState, useEffect } from "react";
import { convertCurrency } from "../utils/api";

const CurrencyExchangeRate = ({ baseCurrency, targetCurrency, amount }) => {
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchConvertedAmount = async () => {
      const result = await convertCurrency(baseCurrency, targetCurrency, amount);
      if (result && result.result) {
        const roundedAmount = Math.floor(result.result);
        setConvertedAmount(roundedAmount); // 変換後の金額をセット
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
          {amount} {baseCurrency} is approximately {convertedAmount} {targetCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyExchangeRate;
