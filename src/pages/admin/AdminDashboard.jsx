import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminSidebar from "../../components/AdminSidebar";
import "./adminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    items: 0,
    reports: 0,
    users: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const res = await api.get("/api/admin/stats");
    setStats(res.data);
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />

      <div className="admin-main">
        {/* HEADER */}
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
          <p>Manage lost & found system operations</p>
        </div>

        {/* STAT CARDS */}
        <div className="stats-grid">
          <div
            className="stat-card items"
            onClick={() => navigate("/admin/items")}
          >
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <h2>{stats.items}</h2>
              <span>Total Items</span>
            </div>
          </div>

          <div
            className="stat-card reports"
            onClick={() => navigate("/admin/reports")}
          >
            <div className="stat-icon">🚨</div>
            <div className="stat-info">
              <h2>{stats.reports}</h2>
              <span>Total Reports</span>
            </div>
          </div>

          <div
            className="stat-card users"
            onClick={() => navigate("/admin/users")}
          >
            <div className="stat-icon">👤</div>
            <div className="stat-info">
              <h2>{stats.users}</h2>
              <span>Total Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
