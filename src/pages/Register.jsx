import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const register = async () => {
    setMsg("");

    try {
      await api.post("/api/auth/register", {
        name,
        email,
        phone,
        password,
      });

      setMsg("Registration successful. Redirecting to login...");

      // ⏳ short delay then redirect
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (e) {
      setMsg("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

        <div className="auth-group">
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="auth-group">
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="auth-group">
          <label>Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="auth-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="button" className="auth-btn" onClick={register}>
          Register
        </button>

        {/* ✅ BACK TO LOGIN */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#1e88e5",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Login here
          </span>
        </p>

        {msg && <p className="auth-msg">{msg}</p>}
      </div>
    </div>
  );
}

export default Register;
