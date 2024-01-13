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
import { useNavigate } from "react-router-dom";

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

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("AUD"); // 基本通貨
  const [targetCurrency, setTargetCurrency] = useState("JPY"); // 目標通過
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const deleteTransaction = (transactionId) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
  };

  const addTransaction = (newTransaction) => {
    // App.js の setTransactions 関数を使用して transactions 状態を更新
    setTransactions([...transactions, newTransaction]);
    setIsModalOpen(false);
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

  const calculateTotalsByDate = () => {
    const totals = transactions.reduce((acc, transaction) => {
      const { date, amount, type } = transaction;
      acc[date] = acc[date] || { expense: 0, income: 0 };
      if (type === "expense") {
        acc[date].expense += amount;
      } else {
        acc[date].income += amount;
      }
      return acc;
    }, {});

    return Object.keys(totals).map((date) => ({
      title: "",
      date,
      allDay: true,
      backgroundColor: "transparent",
      extendedProps: totals[date], // 支出と収入のデータを拡張プロパティに格納
    }));
  };

  const renderEventContent = (eventInfo) => {
    const { expense, income } = eventInfo.event.extendedProps;
    return (
      <div>
        {expense > 0 && <div style={{ color: "#FF5F17" }}>Exp:${expense}</div>}
        {income > 0 && <div style={{ color: "green" }}>Inc:${income}</div>}
      </div>
    );
  };

  useEffect(() => {
    // JWTトークンをローカルストレージから取得
    const token = localStorage.getItem("token");

    // ユーザー情報を取得する関数
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:3001/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          throw new Error("User info fetch failed");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        navigate("/login");
      }
    };

    if (token) {
      fetchUserInfo();
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <FullCalendarStyles>
      {/* user info display {(userInfo && () */}
      {userInfo && (
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

          <CurrencyExchangeRate
            baseCurrency={baseCurrency}
            targetCurrency={targetCurrency}
            amount={100} // 例として100を使用
          />

          {isModalOpen && (
            <Modal>
              <ModalContent>
                <CloseButton onClick={closeModal}>&times;</CloseButton>
                <TransactionForm addTransaction={addTransaction} date={selectedDate} />
                <TransactionSection>
                  <h3>Transactions for {selectedDate}</h3>
                  <TransactionList
                    transactions={transactions.filter((t) => t.date === selectedDate)}
                    onDelete={deleteTransaction} // ここに onDelete プロパティを追加
                  />
                </TransactionSection>
              </ModalContent>
            </Modal>
          )}
        </div>
      )}
    </FullCalendarStyles>
  );
};

export default Dashboard;
