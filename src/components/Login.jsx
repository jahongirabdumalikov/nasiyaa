import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import myImage from "../assets/logo.svg";
import myImages from "../assets/icon.svg";
import myImage2 from "../assets/carbon.svg";
import myImage3 from "../assets/show.svg";
import API from "../API";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); // <-- to‘g‘rilandi
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        hashed_password: password,
        login: username, // <-- to‘g‘rilandi
      });

      if (res.status === 201) {
        navigate("/dashboard");

        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(res.data.store));
      }

      console.log(res);
    } catch (err) {
      setError(err.message);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <div className="logo">
          <img src={myImage} alt="logo.svg" />
        </div>
        <h1>Dasturga kirish</h1>
        <p className="subtitle">
          Iltimos, tizimga kirish uchun login va parolingizni kiriting.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <div className="username-input">
            <img src={myImages} alt="icon.svg" />
            <input
              type="text"
              value={username} // <-- to‘g‘rilandi
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ismingizni kiriting"
            />
          </div>
        </div>

        <div className="input-group">
          <div className="password-input">
            <img src={myImage2} alt="carbon.svg" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parolingizni kiriting"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img src={myImage3} alt="show.svg" />
            </button>
          </div>
        </div>

        <div className="forgot-password">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            Parolni unutdingizmi?
          </a>
        </div>

        <button type="submit" className="login-button">
          Kirish
        </button>
      </form>

      {isModalOpen && (
        <div
          className="modal-overlay"
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="modal"
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
              width: "400px",
            }}
          >
            <h2 style={{ color: "black", marginBottom: "10px" }}>
              {error ? "Xatolik!" : "Juda ko‘p noaniq urinish"}
            </h2>
            <p style={{ color: "#333", fontSize: "16px" }}>
              {error || "Iltimos biroz vaqtdan so‘ng qayta urinib ko‘ring."}
            </p>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setError("");
              }}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                backgroundColor: "blue",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Tushunarli
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
