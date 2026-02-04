import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = async () => {
    setMsg("");

    try {
      const res = await api.post("/api/auth/login", { email, password });

      const { token, role } = res.data;
      const selectedRole = localStorage.getItem("selectedRole");

      // 🔐 PORTAL VALIDATION
      if (selectedRole && selectedRole !== role) {
        alert("Access denied for selected portal");
        localStorage.clear();
        navigate("/");
        return;
      }

      // ✅ SAVE AUTH DATA
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);

      // 🔀 REDIRECT BASED ON ROLE
      role === "ADMIN" ? navigate("/admin") : navigate("/dashboard");

    } catch {
      setMsg("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 🔴 IMPORTANT: type="button" */}
        <button type="button" className="auth-btn" onClick={login}>
          Login
        </button>

        {/* ✅ REGISTER LINK */}
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          New user?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{
              color: "#1e88e5",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Register here
          </span>
        </p>

        {msg && <p className="auth-msg">{msg}</p>}
      </div>
    </div>
  );
}

export default Login;
