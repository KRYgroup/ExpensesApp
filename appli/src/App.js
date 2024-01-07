import "./App.css";
import ExpenseChart from "./components/ExpenseChart";
import IncomeChart from "./components/IncomeChart";
import CurrencyExchangeRate from "./components/CurrencyExchangeRate";

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
      <header className="App-header">
        <h1>ExpensesApp</h1>
      </header>
      <div className="content">
        <ExpenseChart expenses={sampleExpenses} />
        <IncomeChart incomes={sampleIncomes} />
        <CurrencyExchangeRate baseCurrency="AUD" targetCurrency="JPY" amount={amountToConvert} />
      </div>
    </div>
  );
}

export default App;
