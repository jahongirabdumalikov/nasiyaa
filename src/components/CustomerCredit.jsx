import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CustomerCredit.css";
import { IoArrowBack } from "react-icons/io5";
import myImage40 from "../assets/Vector (15).svg";
import myImage41 from "../assets/iconamoon_menu-kebab-vertical-bold.svg";

const CustomerCredit = () => {
  const { customerId, customerName } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCreditModalOpen, setIsAddCreditModalOpen] = useState(false);
  const [creditAmount, setCreditAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    console.log("CustomerCredit mounted with params:", {
      customerId,
      customerName,
    });
  }, [customerId, customerName]);

  const handleBack = () => {
    navigate("/customers");
  };

  const handleDelete = () => {
    setIsModalOpen(false);
    navigate("/customers");
  };

  const handleAddCredit = () => {
   
    console.log("Adding credit:", { creditAmount, dueDate });
    setIsAddCreditModalOpen(false);
  };

  const formatNumber = (value) => {
    if (!value) return "";
    const number = value.replace(/[^\d]/g, "");
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleCreditAmountChange = (e) => {
    const formatted = formatNumber(e.target.value);
    setCreditAmount(formatted);
  };

  const decodedCustomerName = decodeURIComponent(customerName || "");

  return (
    <div className="customer-credit-container">
      <div className="customer-credit-header">
        <div className="header-left">
          <IoArrowBack className="back-icon" onClick={handleBack} />
          <h2>{decodedCustomerName}</h2>
        </div>
        <div className="header-right">
          <img src={myImage40} alt="back.svg" />
          <button className="more-options" onClick={() => setIsModalOpen(true)}>
            <img src={myImage41} alt="back.svg" />
          </button>
        </div>
      </div>

      <div className="credit-info-section">
        <div className="total-credit-box">
          <div className="credit-row">
            <div className="credit-label">Umumiy nasiya:</div>
            <div className="credit-label1">14 786 000 so'm</div>
          </div>
        </div>
      </div>

      <div className="active-credits-section">
        <h3>Faol nasiyalar</h3>
        <div className="credit-item">
          <div className="credit-date">Nov 1, 2024 14:51</div>
          <div className="credit-amount">5 845 000 so'm</div>
          <div className="credit-due-date">Keyingi to'lov: 07.11.2024</div>
          <div className="credit-payment">500 000 so'm</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: "40%" }}></div>
          </div>
        </div>
      </div>

      <button
        className="add-credit-button"
        onClick={() => setIsAddCreditModalOpen(true)}
      >
        + Qo'shish
      </button>


      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>O'chirish</h3>
            <p>Haqiqatan ham ushbu mijozni o'chirmoqchimisiz?</p>
            <div className="modal-buttons">
              <button
                className="cancel-button"
                onClick={() => setIsModalOpen(false)}
              >
                Bekor qilish
              </button>
              <button className="delete-button" onClick={handleDelete}>
                O'chirish
              </button>
            </div>
          </div>
        </div>
      )}

     
      {isAddCreditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content add-credit-modal">
            <div className="modal-header">
              <h3>Nasiya qo'shish</h3>
              <button
                className="close-button"
                onClick={() => setIsAddCreditModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="credit-form">
              <div className="form-group">
                <label>Nasiya summasi</label>
                <div className="input-with-suffix">
                  <input
                    type="text"
                    value={creditAmount}
                    onChange={handleCreditAmountChange}
                    placeholder="0"
                  />
                  <span className="suffix">so'm</span>
                </div>
              </div>
              <div className="form-group">
                <label>To'lov muddati</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-buttons">
              <button
                className="cancel-button"
                onClick={() => setIsAddCreditModalOpen(false)}
              >
                Bekor qilish
              </button>
              <button
                className="confirm-button"
                onClick={handleAddCredit}
                disabled={!creditAmount || !dueDate}
              >
                Tasdiqlash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerCredit;
