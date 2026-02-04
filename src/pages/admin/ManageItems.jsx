import { useEffect, useState } from "react";
import api from "../../api/api";

function ManageItems() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const res = await api.get("/api/admin/items");
    setItems(res.data);
  };

  // 🔄 STATUS UPDATE
  const updateStatus = async (id, status) => {
    await api.put(`/api/admin/items/${id}/status?status=${status}`);
    loadItems();
  };

  // ✏️ SAVE EDIT
  const saveEdit = async () => {
    await api.put(`/api/admin/items/${editingItem.id}`, editingItem);
    setEditingItem(null);
    loadItems();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Items</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "15px",
            background: "#fff",
          }}
        >
          <h3>{item.title}</h3>
          <p><b>Category:</b> {item.category}</p>
          <p><b>Type:</b> {item.itemType}</p>
          <p><b>Status:</b> {item.status}</p>

          {/* 🔄 STATUS BUTTON */}
          <button
            onClick={() =>
              updateStatus(
                item.id,
                item.status === "OPEN" ? "CLOSED" : "OPEN"
              )
            }
            style={{ marginRight: "10px" }}
          >
            {item.status === "OPEN" ? "Close Item" : "Reopen Item"}
          </button>

          {/* ✏️ EDIT */}
          <button onClick={() => setEditingItem(item)}>
            Edit
          </button>
        </div>
      ))}

      {/* ✏️ EDIT MODAL */}
      {editingItem && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              width: "400px",
              margin: "100px auto",
              borderRadius: "8px",
            }}
          >
            <h3>Edit Item</h3>

            <input
              placeholder="Title"
              value={editingItem.title}
              onChange={(e) =>
                setEditingItem({ ...editingItem, title: e.target.value })
              }
            />

            <input
              placeholder="Category"
              value={editingItem.category}
              onChange={(e) =>
                setEditingItem({ ...editingItem, category: e.target.value })
              }
            />

            <input
              placeholder="Location"
              value={editingItem.location || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, location: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              value={editingItem.description || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, description: e.target.value })
              }
            />

            <select
              value={editingItem.itemType}
              onChange={(e) =>
                setEditingItem({ ...editingItem, itemType: e.target.value })
              }
            >
              <option value="LOST">LOST</option>
              <option value="FOUND">FOUND</option>
            </select>

            <br /><br />

            <button onClick={saveEdit}>Save</button>
            <button
              onClick={() => setEditingItem(null)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageItems;
