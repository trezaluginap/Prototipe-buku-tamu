import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Selamat Datang</h1>
        <div className="button-group">
          <button onClick={() => navigate("/tamu")}>Masuk sebagai Tamu</button>
          <button onClick={() => navigate("/admin-login")}>
            Masuk sebagai Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
