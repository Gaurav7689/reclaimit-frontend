import { useEffect, useState } from "react";
import api from "../api/api";
import AdminSidebar from "../components/AdminSidebar";

function AdminCategories() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await api.get("/api/admin/categories");
    setList(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    await api.post("/api/admin/categories", { name });
    setName("");
    load();
  };

  const del = async (id) => {
    await api.delete(`/api/admin/categories/${id}`);
    load();
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{ padding: "30px", flex: 1 }}>
        <h2>Categories</h2>

        <input
          placeholder="New Category"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={add}>Add</button>

        {list.map(c => (
          <div key={c.id}>
            {c.name}
            <button onClick={() => del(c.id)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCategories;
