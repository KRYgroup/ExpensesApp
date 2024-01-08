import "./App.css";
import ExpenseChart from "./components/ExpenseChart";
import IncomeChart from "./components/IncomeChart";
import CurrencyExchangeRate from "./components/CurrencyExchangeRate";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  //ただの例（後で消す）
  const sampleExpenses = [
    { category: "Food", amount: 300 },
    { category: "Travel", amount: 200 },
    { category: "Activity", amount: 400 },
  ];

  const sampleIncomes = [
    { source: "Income", amount: 2000 },
    { source: "Second Job", amount: 500 },
  ];

  const amountToConvert = 1000;

  return (
    <div className="App">
      {/* 下の仮<header>の代わりに<Header></Header>を入れる */}
      <Header /> {/* Headerコンポーネントを追加 */}
      <div className="content">
        <ExpenseChart expenses={sampleExpenses} />
        <IncomeChart incomes={sampleIncomes} />
        <CurrencyExchangeRate baseCurrency="AUD" targetCurrency="JPY" amount={amountToConvert} />
      </div>
      <Footer /> {/* Footerコンポーネントを追加 */}
    </div>
  );
}

export default App;
