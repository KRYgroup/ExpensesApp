import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import CurrencyExchangeRate from "./CurrencyExchangeRate";
import styled from "styled-components";
import backgroundImage1 from "../images/wood2.png";
import backgroundImage2 from "../images/wood3.png";

const FullCalendarStyles = styled.div`
  .fc-today-button {
    background-image: url(${backgroundImage1});
    border: none;
    color: white;
  }

  .fc-prev-button,
  .fc-next-button {
    background-image: url(${backgroundImage1});
    border: none;
    color: white;
    font-weight: bold;
  }

  /* ホバー状態のスタイル */
  .fc-today-button:hover,
  .fc-prev-button:hover,
  .fc-next-button:hover {
    background-image: url(${backgroundImage2});
  }
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  margin: 0 auto;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 10px;
  border: 1px solid #888;
  width: 40%;
  overflow-y: auto; // コンテンツが多い場合にスクロール可能にする
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
`;

const TransactionSection = styled.div`
  margin-top: 20px;
`;

const Calendar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("AUD"); // 基本通貨
  const [targetCurrency, setTargetCurrency] = useState("JPY"); // 目標通過
  const [showConverted, setShowConverted] = useState(false);

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options);
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /*const handleCurrencyChange = (newBaseCurrency, newTargetCurrency) => {
    setBaseCurrency(newBaseCurrency);
    setTargetCurrency(newTargetCurrency);
  };*/

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/transactions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if (response.ok) {
      setTransactions(data);
    } else {
      console.error("Error fetching transactions");
    }
  };

  const calculateTotalsByDate = () => {
    if (!transactions || transactions.length === 0) {
      return [];
    }

    const totals = transactions.reduce((acc, transaction) => {
      const { date, amount, type } = transaction;
      acc[date] = acc[date] || { expense: 0, income: 0 };
      if (type === "expense") {
        acc[date].expense += amount;
      } else if (type === "income") {
        acc[date].income += amount;
      }
      return acc;
    }, {});

    const events = Object.keys(totals).map((date) => {
      return {
        title: `Exp: ${totals[date].expense}, Inc: ${totals[date].income}`,
        date: date,
        allDay: true,
        backgroundColor: "transparent",
        borderColor: "transparent",
        textColor: "black",
        extendedProps: totals[date],
      };
    });

    return events;
  };

  const renderEventContent = (eventInfo) => {
    const { expense, income } = eventInfo.event.extendedProps;

    return (
      <div>
        {expense > 0 && <div style={{ color: "#FF5F17" }}>{showConverted ? <CurrencyExchangeRate baseCurrency={baseCurrency} targetCurrency={targetCurrency} amount={expense} /> : `Exp: ${expense} ${baseCurrency}`}</div>}
        {income > 0 && <div style={{ color: "green" }}>{showConverted ? <CurrencyExchangeRate baseCurrency={baseCurrency} targetCurrency={targetCurrency} amount={income} /> : `Inc: ${income} ${baseCurrency}`}</div>}
      </div>
    );
  };

  // Add transaction to backend
  const addTransaction = async (newTransaction) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      const data = await response.json();
      // Add the transaction with an ID to the local state
      setTransactions([...transactions, { ...data, id: Date.now() }]);
      setIsModalOpen(false);
    } else {
      console.error("Error adding transaction");
    }
  };

  // Delete transaction from backend
  const deleteTransaction = async (transactionId) => {
    console.log("Deleting transaction with ID:", transactionId);

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3001/transactions/${transactionId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.ok) {
      // If the deletion is successful on the backend, update the local state
      setTransactions(transactions.filter((t) => t._id !== transactionId));
    } else {
      console.error("Error deleting transaction");
    }
  };

  return (
    <FullCalendarStyles>
      <div>
        <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
          {/* 通貨のオプションを追加 */}
          <option value="AUD">AUD</option>
          {/* ...他の通貨オプション */}
        </select>
        <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
          {/* 通貨のオプションを追加 */}
          <option value="JPY">JPY</option>
          <option value="USD">USD</option>
          {/* ...他の通貨オプション */}
        </select>
        <button onClick={() => setShowConverted(!showConverted)}>{showConverted ? "Show in Base Currency" : "Convert Currency"}</button>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={calculateTotalsByDate()}
          eventContent={renderEventContent}
          buttonText={{
            today: "Today",
          }}
        />

        {isModalOpen && (
          <Modal>
            <ModalContent>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
              <TransactionForm addTransaction={addTransaction} date={selectedDate} />
              <TransactionSection>
                {/* ここで formatDate を使用して selectedDate をフォーマットします */}
                <h3>Transactions for {formatDate(selectedDate)}</h3>
                <TransactionList transactions={transactions.filter((t) => formatDate(t.date) === formatDate(selectedDate))} onDelete={deleteTransaction} baseCurrency={baseCurrency} targetCurrency={targetCurrency} showConverted={showConverted} />
              </TransactionSection>
            </ModalContent>
          </Modal>
        )}
      </div>
    </FullCalendarStyles>
  );
};

export default Calendar;
