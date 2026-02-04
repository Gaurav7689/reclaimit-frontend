import { useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "220px",
        minHeight: "100vh",
        background: "#0f2027",
        color: "white",
        padding: "20px",
      }}
    >
      <h3>Admin Panel</h3>

      <button className="side-btn" onClick={() => navigate("/admin")}>
        📊 Dashboard
      </button>

      <button className="side-btn" onClick={() => navigate("/admin/users")}>
        👤 Users
      </button>

      <button className="side-btn" onClick={() => navigate("/admin/items")}>
        📦 Items
      </button>

      <button className="side-btn" onClick={() => navigate("/admin/reports")}>
        🚨 Reports
      </button>

      <button
        className="side-btn"
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default AdminSidebar;
