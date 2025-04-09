import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Customers.css";
import myImage20 from "../assets/sear.svg";
import myImage21 from "../assets/Slider icon.svg";
import myImage22 from "../assets/iconamoon_star-fill.svg";
import myImage11 from "../assets/home.svg";
import myImage12 from "../assets/odam.svg";
import myImage13 from "../assets/Folder.svg";
import myImage14 from "../assets/Settings.svg";

const Customers = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Rahmatulloh Madraximov",
      phone: "+998 91123 45 67",
      totalDebt: -800000,
      isFavorite: true,
    },
    {
      id: 2,
      name: "Lutfulloh Torayev",
      phone: "+998 91123 45 67",
      totalDebt: -56861000,
      isFavorite: true,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "https://nasiya.takedaservice.uz/api/debts?skip=12000&take=16062007&debtor_id=john"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (data.length > 0) {
          setCustomers(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const formatCurrency = (amount) => {
    return Math.abs(amount).toLocaleString("uz-UZ") + " so'm";
  };

  const handleCreateCustomer = () => {
    navigate("/customers/create");
  };

  return (
    <div className="customers-container">
      <div className="search-header">
        <div className="search-bar">
          <img src={myImage20} alt="search" />
          <input
            type="text"
            placeholder="Mijozlarni qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="filter-button">
          <img src={myImage21} alt="filter" />
        </button>
      </div>

      {loading && <p>Yuklanmoqda...</p>}
      {/* {error && <p>Xatolik yuz berdi: {error}</p>} */}

      <div className="customers-list">
        {customers
          .filter((customer) =>
            customer.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((customer) => (
            <div
              key={customer.id}
              className="customer-card"
              onClick={() => {
                console.log(
                  "Navigating to:",
                  `/customers/${customer.id}/${encodeURIComponent(
                    customer.name
                  )}/credit`
                );
                navigate(
                  `/customers/${customer.id}/${encodeURIComponent(
                    customer.name
                  )}/credit`
                );
              }}
            >
              <div className="customer-info">
                <h3>{customer.name}</h3>
                <p className="phone-number">
                  {customer.phone || "Telefon raqam mavjud emas"}
                </p>
                <div className="debt-info">
                  <span className="debt-label">Jami nasiya:</span>
                  <span className="debt-amount">
                    -{formatCurrency(customer.totalDebt || 0)}
                  </span>
                </div>
              </div>
              <button
                className={`favorite-button ${
                  customer.isFavorite ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  // Add favorite toggle logic here
                }}
              >
                <img src={myImage22} alt="filter" />
              </button>
            </div>
          ))}
      </div>

      {/* Add customer button */}
      <button className="add-customer-button" onClick={handleCreateCustomer}>
        <span className="plus-icon">+</span>
        <span>Yaratish</span>
      </button>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <Link to="/dashboard" className="nav-item">
          <img src={myImage11} alt="home.svg" />
          <span>Asosiy</span>
        </Link>
        <Link to="/customers" className="nav-item active">
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

export default Customers;
