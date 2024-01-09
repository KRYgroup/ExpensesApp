import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // 必要に応じてインポート

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // スタイルオブジェクトを関数の中に配置
  const modalStyle = {
    position: 'fixed',
    zIndex: 1000,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)', // 黒色の背景に透明度を設定
  };

  const modalContentStyle = {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
  };

  const closeButtonStyle = {
    color: '#aaa',
    float: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setIsModalOpen(true); // モーダルを開く
  };

  const handleExpenseSubmit = (event) => {
    event.preventDefault();
    setIsModalOpen(false); // モーダルを閉じる
    console.log({ selectedDate, category, description, amount }); // 送信するデータ
    // ここで送信処理を行う
  };

  const closeModal = () => {
    setIsModalOpen(false); // モーダルを閉じる
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
      />
      {isModalOpen && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <span style={closeButtonStyle} onClick={closeModal}>&times;</span>
            <h2>Add Expense for {selectedDate}</h2>
            <form onSubmit={handleExpenseSubmit}>
              <label>
                Category:
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
              </label>
              <label>
                Description:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
              <label>
                Amount:
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </label>
              <button type="submit">Add Expense</button>
              <button type="button" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
