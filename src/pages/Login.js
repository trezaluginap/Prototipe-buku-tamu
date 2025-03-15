import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles.css";
import LoginPict from "../assets/LoginPict.jpg";
import BPSLogo from "../assets/BPS.png"; // Assuming you have this from the previous form

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      {/* Left: Illustration */}
      <div className="login-image">
        <div className="login-image-overlay">
          <img src={LoginPict} alt="Login Illustration" />
        </div>
      </div>

      {/* Right: Login Box */}
      <div className="login-form">
        <div className="login-logo">
          <img src={BPSLogo} alt="BPS Logo" />
        </div>
        <h1>Selamat Datang</h1>
        <p className="subtext">Silakan pilih metode masuk ke sistem</p>

        <div className="button-group">
          <button className="btn-guest" onClick={() => navigate("/tamu")}>
            <span className="icon">👥</span>
            Masuk sebagai Tamu
          </button>
          <button
            className="btn-admin"
            onClick={() => navigate("/admin-login")}
          >
            <span className="icon">🔒</span>
            Masuk sebagai Admin
          </button>
        </div>

        <div className="login-footer">
          <p>Badan Pusat Statistik © {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
