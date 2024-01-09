import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import styled from 'styled-components';

// スタイル付きコンポーネントの定義
const Modal = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
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

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (newTransaction) => {
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

  const calculateTotalsByDate = () => {
    const totals = transactions.reduce((acc, transaction) => {
      const { date, amount, type } = transaction;
      acc[date] = acc[date] || { expense: 0, income: 0 };
      if (type === 'expense') {
        acc[date].expense += amount;
      } else {
        acc[date].income += amount;
      }
      return acc;
    }, {});

    return Object.keys(totals).map(date => ({
      title: '',
      date,
      allDay: true,
      extendedProps: totals[date]  // 支出と収入のデータを拡張プロパティに格納
    }));
  };

  const renderEventContent = (eventInfo) => {
    const { expense, income } = eventInfo.event.extendedProps;
    return (
      <div>
        <div style={{ color: 'red' }}>Exp: ${expense}</div>
        <div style={{ color: 'green' }}>Inc: ${income}</div>
      </div>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={calculateTotalsByDate()}
        eventContent={renderEventContent}
      />
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <TransactionForm addTransaction={addTransaction} date={selectedDate} />
            <TransactionSection>
              <h3>Transactions for {selectedDate}</h3>
              <TransactionList transactions={transactions.filter(t => t.date === selectedDate)} />
            </TransactionSection>
          </ModalContent>
        </Modal>
      )}
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default Dashboard;
