import "../styles/Portal.css";
import { useNavigate } from "react-router-dom";

function Portal() {
  const navigate = useNavigate();

  const goToLogin = (role) => {
    localStorage.setItem("selectedRole", role);
    navigate("/login");
  };

  return (
    <div className="portal-wrapper">

      {/* 🔹 HEADER */}
      <header className="portal-header">
        <h1 className="portal-title">ReclaimIt</h1>
        <p className="portal-subtitle">
          A Smart Lost & Found Management System
        </p>
      </header>

      {/* 🔹 ABOUT PROJECT */}
      <section className="portal-about">
        <h2>About This Project</h2>
        <p>
          <b>ReclaimIt</b> helps people report, track, and recover lost or found
          items in a secure and organized way.  
          The system connects item owners and finders through admin verification
          to avoid misuse and fraud.
        </p>
      </section>

      {/* 🔹 HOW IT WORKS */}
      <section className="portal-steps">
        <h2>How It Works</h2>

        <div className="steps-container">
          <div className="step-card">
            <span>1️⃣</span>
            <p>User reports a lost or found item</p>
          </div>

          <div className="step-card">
            <span>2️⃣</span>
            <p>Other users can report matching items</p>
          </div>

          <div className="step-card">
            <span>3️⃣</span>
            <p>Admin verifies reports & connects users</p>
          </div>

          <div className="step-card">
            <span>4️⃣</span>
            <p>Item is safely returned to owner</p>
          </div>
        </div>
      </section>

      {/* 🔹 PORTAL SELECTION */}
      <section className="portal-container">

        {/* ADMIN */}
        <div className="portal-card admin">
          <h2>Admin Portal</h2>
          <p>
            • Manage reports <br />
            • Verify users <br />
            • Approve or reject claims
          </p>
          <button onClick={() => goToLogin("ADMIN")}>
            Enter Admin Portal
          </button>
        </div>

        {/* USER */}
        <div className="portal-card user">
          <h2>User Portal</h2>
          <p>
            • Report lost items <br />
            • Report found items <br />
            • Track claim status
          </p>
          <button onClick={() => goToLogin("USER")}>
            Enter User Portal
          </button>
        </div>
      </section>

      {/* 🔹 FOOTER */}
      <footer className="portal-footer">
        <p>
          Final Year Project | Built with Spring Boot & React
        </p>
      </footer>
    </div>
  );
}

export default Portal;
