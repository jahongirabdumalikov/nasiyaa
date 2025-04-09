import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";
import myImage7 from "../assets/avatar.svg";
import myImage8 from "../assets/Calendar.svg";
import myImage9 from "../assets/hisob.svg";
import myImage10 from "../assets/Button.svg";
import myImage11 from "../assets/home.svg";
import myImage12 from "../assets/odam.svg";
import myImage13 from "../assets/Folder.svg";
import myImage14 from "../assets/Settings.svg";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCalendarClick = () => {
    navigate("/calendar");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="user-info">
          <img src={myImage7} alt="avatar.svg" />
          <span className="username">Testuchun</span>
        </div>
        <div
          className="calendar-icon"
          onClick={handleCalendarClick}
          style={{ cursor: "pointer" }}
        >
          <img src={myImage8} alt="Calendar.svg" />
        </div>
      </div>

      <div className="stats-card">
        <div className="total-amount">
          <h1>135 214 200 so'm</h1>
          <div className="amount-label">
            <span>Umumiy nasiya:</span>
            <button className="eye-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-title">Kechiktirilgan to'lovlar</div>
          <div className="stat-value red">26</div>
        </div>
        <div className="stat-box">
          <div className="stat-title">Mijozlar soni</div>
          <div className="stat-value green">151</div>
        </div>
      </div>

      <div className="wallet-section">
        <h2>Hamyoningiz</h2>
        <div className="wallet-card">
          <div className="wallet-icon">
            <img src={myImage9} alt="hisob.svg" />
          </div>
          <div className="wallet-info">
            <span className="wallet-label">Hisobingizda</span>
            <span className="wallet-amount">300 000 so'm</span>
          </div>
          <button className="add-button">
            <img src={myImage10} alt="Button.svg" />
          </button>
        </div>
        <div className="payment-status">
          <span className="payment-label">Bu oy uchun to'lov:</span>
          <span className="payment-complete">To'lov qilingan</span>
        </div>
      </div>

      <nav className="bottom-nav">
        <Link to="/dashboard" className="nav-item active">
          <img src={myImage11} alt="home.svg" />
          <span>Asosiy</span>
        </Link>
        <Link to="/customers" className="nav-item">
          <img src={myImage12} alt="odam.svg" />
          <span>Mijozlar</span>
        </Link>
        <Link to="/reports" className="nav-item">
          <img src={myImage13} alt="Folder.svg" />
          <span>Hisobot</span>
        </Link>
        <Link to="/settings" className="nav-item">
          <img src={myImage14} alt="Settings.svg" />
          <span>Sozlama</span>
        </Link>
      </nav>
    </div>
  );
};

export default Dashboard;
