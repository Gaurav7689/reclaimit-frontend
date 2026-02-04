import { useEffect, useState } from "react";
import api from "../../api/api";
import AdminSidebar from "../../components/AdminSidebar";

function ManageReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const res = await api.get("/api/admin/reports");
    setReports(res.data);
  };

  const approve = async (id) => {
    await api.post(`/api/admin/reports/${id}/approve`);
    loadReports();
  };

  const reject = async (id) => {
    await api.post(`/api/admin/reports/${id}/reject`);
    loadReports();
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ padding: "30px", flex: 1 }}>
        <h2>Manage Reports</h2>

        {reports.length === 0 && <p>No reports found</p>}

        {reports.map((r) => (
          <div
            key={r.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "20px",
              background: "#fff"
            }}
          >
            <h3>📦 Item: {r.item.title}</h3>
            <p><b>Status:</b> {r.status}</p>

            <hr />

            {/* REPORTER DETAILS */}
            <h4>👤 Reporter</h4>
            <p><b>Name:</b> {r.reporter.name}</p>
            <p><b>Email:</b> {r.reporter.email}</p>
            <p><b>Phone:</b> {r.reporter.phone}</p>

            <div className="contact-buttons">
              <a
                href={`mailto:${r.reporter.email}`}
                className="btn email"
              >
                📧 Email
              </a>

              <a
                href={`https://wa.me/91${r.reporter.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp"
              >
                💬 WhatsApp
              </a>

              <a
                href={`tel:${r.reporter.phone}`}
                className="btn call"
              >
                📞 Call
              </a>
            </div>

            <hr />

            {/* ITEM OWNER DETAILS */}
            <h4>📮 Item Owner</h4>
            <p><b>Name:</b> {r.item.postedBy.name}</p>
            <p><b>Email:</b> {r.item.postedBy.email}</p>
            <p><b>Phone:</b> {r.item.postedBy.phone}</p>

            <div className="contact-buttons">
              <a
                href={`mailto:${r.item.postedBy.email}`}
                className="btn email"
              >
                📧 Email
              </a>

              <a
                href={`https://wa.me/91${r.item.postedBy.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp"
              >
                💬 WhatsApp
              </a>

              <a
                href={`tel:${r.item.postedBy.phone}`}
                className="btn call"
              >
                📞 Call
              </a>
            </div>

            <hr />

            {/* ACTION BUTTONS */}
            <button
              onClick={() => approve(r.id)}
              style={{
                padding: "8px 14px",
                background: "#2e7d32",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginRight: "10px"
              }}
            >
              ✅ Approve
            </button>

            <button
              onClick={() => reject(r.id)}
              style={{
                padding: "8px 14px",
                background: "#c62828",
                color: "white",
                border: "none",
                borderRadius: "5px"
              }}
            >
              ❌ Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageReports;
