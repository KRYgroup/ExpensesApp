import axios from "axios";

/*const getExchangeRates = async (fromCurrency, toCurrencies) => {
  const options = {
    method: "GET",
    url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest",
    params: {
      from: fromCurrency,
      to: toCurrencies.join(","),
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};*/

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
  const options = {
    method: "GET",
    url: "https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert",
    params: {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      "X-RapidAPI-Host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { convertCurrency };
