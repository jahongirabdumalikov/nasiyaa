import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateCustomer.css";
import myImage15 from "../assets/back.svg";
import myImage30 from "../assets/rasm.svg";

const CreateCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phones: [""],
    address: "",
    note: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBack = () => {
    navigate("/customers");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://nasiya.takedaservice.uz/api/debts?skip=1200&take=30&debtor_id=john",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phones: formData.phones.filter((phone) => phone.trim() !== ""),
            address: formData.address,
            note: formData.note,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Success:", data);
      navigate("/customers");
    } catch (error) {
      console.error("Error:", error);
      setError(
        "Ma'lumotlarni saqlashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
      );
 
      setTimeout(() => {
        navigate("/customers");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPhone = () => {
    setFormData({
      ...formData,
      phones: [...formData.phones, ""],
    });
  };

  const handlePhoneChange = (index, value) => {
    const newPhones = [...formData.phones];
    newPhones[index] = value;
    setFormData({
      ...formData,
      phones: newPhones,
    });
  };

  return (
    <div className="create-customer-container">
    
      <div className="create-customer-header">
        <button onClick={handleBack} className="back-button">
          <img src={myImage15} alt="back.svg" />
        </button>
        <h1>Mijoz yaratish</h1>
        <div className="placeholder"></div>
      </div>


      <form onSubmit={handleSubmit} className="create-customer-form">
        <div className="form-group">
          <label>
            Ismi <span className="required">*</span>
          </label>
          <input
            type="text"
            placeholder="Ismini kiriting"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>
            Telefon raqami <span className="required">*</span>
          </label>
          {formData.phones.map((phone, index) => (
            <input
              key={index}
              type="tel"
              placeholder="Telefon raqami"
              value={phone}
              onChange={(e) => handlePhoneChange(index, e.target.value)}
              required
            />
          ))}
          <button
            type="button"
            className="add-phone-button"
            onClick={handleAddPhone}
          >
            + Ko'proq qo'shish
          </button>
        </div>

        <div className="form-group">
          <label>Yashash manzili</label>
          <input
            type="text"
            placeholder="Yashash manzilini kiriting"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Eslatma</label>
          <textarea
            placeholder="Affiristlarga qoldi kunim"
            value={formData.note}
            onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Rasm biriktirish</label>
          <div className="image-upload-grid">
            <div className="image-upload-box">
              <div className="upload-placeholder">
                <img src={myImage30} alt="back.svg" />
                <span>O'zgartirish</span>
              </div>
            </div>
            <div className="image-upload-box">
              <div className="upload-placeholder">
                <img src={myImage30} alt="back.svg" />
                <span>O'zgartirish</span>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Saqlanmoqda..." : "Saqlash"}
        </button>
      </form>
    </div>
  );
};

export default CreateCustomer;
