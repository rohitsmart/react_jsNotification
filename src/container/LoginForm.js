import React, { useState } from "react";
import axios from "axios";
import { LOGIN_ENDPOINT } from "../api/endpoint";
import './LoginForm.css';
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(LOGIN_ENDPOINT, formData);
      const token = response.data.accessToken;

      // Check if token exists and save it to localStorage
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", formData.email);
        
        // Navigate to dashboard after successful login
        navigate("/dashboard");
        console.log("Login response:", response.data); // Debug log
      } else {
        setError("Failed to retrieve token. Please try again.");
      }

    } catch (err) {
      console.error("Login error:", err); // Log the actual error to see details
      if (err.response && err.response.status === 401) {
        setError("Invalid login credentials. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Please log in to continue</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="login-input"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="login-input"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={loading} className="login-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
