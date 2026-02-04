import { useEffect, useState } from "react";
import api from "../api/api";
import AdminSidebar from "../components/AdminSidebar";

function AdminItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/api/admin/items");
    setItems(res.data);
  };

  const del = async (id) => {
    await api.delete(`/api/admin/items/${id}`);
    load();
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ padding: "30px", flex: 1 }}>
        <h2>Manage Items</h2>

        {items.map(i => (
          <div key={i.id} className="card">
            <h4>{i.title}</h4>
            <p>{i.category}</p>
            <p>Status: {i.status}</p>
            <button onClick={() => del(i.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminItems;
