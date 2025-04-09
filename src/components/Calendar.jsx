import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Calendar.css";
import myImage15 from "../assets/back.svg";
import myImage16 from "../assets/Left.png";
import myImage17 from "../assets/Right.png";

const Calendar = () => {
  const navigate = useNavigate();
  const days = ["DU", "SE", "CH", "PA", "JU", "SH", "YA"];
  const today = new Date().getDate();
  const [selectedDate, setSelectedDate] = useState(today);

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handleBack} className="back-button">
          <img src={myImage15} alt="back.svg" />
        </button>
        <h1>Kalendar</h1>
        <div className="placeholder"></div>
      </div>

      <div className="month-navigation">
        <div className="month-year">Oktabr, 2024</div>
        <div className="month-controls">
          <button className="month-arrow prev">
            <img src={myImage16} alt="left.svg" />
          </button>
          <button className="month-arrow next">
            <img src={myImage17} alt="right.svg" />
          </button>
        </div>
      </div>

      <div className="monthly-total">
        <div className="total-label">Oylik jami:</div>
        <div className="total-amount">50 125 000 so'm</div>
      </div>

      <div className="calendar-grid">
        <div className="days-header">
          {days.map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>

        <div className="dates-grid">
          {Array.from({ length: 31 }, (_, i) => {
            const date = i + 1;
            const hasPayment = [1, 8, 15, 22, 29].includes(date);
            return (
              <div
                key={date}
                className={`date-cell ${selectedDate === date ? "selected" : ""} ${
                  hasPayment ? "has-payment" : ""
                } ${date === today ? "today" : ""}`}
                onClick={() => setSelectedDate(date)}
              >
                {date < 10 ? `0${date}` : date}
                {hasPayment && <span className="payment-dot"></span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="payment-details">
        <h2>{selectedDate} Oktabr kuni to'lov kutilmoqda</h2>
        <div className="payment-list">
          <div className="payment-item">
            <div className="customer-name">Avazbek Jahongirov</div>
            <div className="payment-amount">UZS 1 000 000</div>
          </div>
          <div className="payment-item">
            <div className="customer-name">Otabek Sulaymonov</div>
            <div className="payment-amount">UZS 1 000 000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
