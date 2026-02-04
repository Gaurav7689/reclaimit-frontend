import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [msg, setMsg] = useState("");

  // 🔹 LOAD ITEM (FIXED API)
  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    try {
      const res = await api.get(`/api/user/items/${id}`); // ✅ FIXED
      const item = res.data;

      setTitle(item.title);
      setCategory(item.category);
      setDescription(item.description);
      setLocation(item.location);
    } catch (err) {
      console.error(err);
      alert("You are not allowed to edit this item");
      navigate("/my-items");
    }
  };

  // 🔹 UPDATE ITEM
  const updateItem = async () => {
    setMsg("");

    try {
      await api.put(`/api/user/items/${id}`, {
        title,
        category,
        description,
        location,
      });

      alert("Item updated successfully");
      navigate("/my-items");
    } catch (err) {
      console.error(err);
      setMsg("Failed to update item");
    }
  };

  return (
    <>
      <Navbar title="Edit Item" />

      <div className="container" style={{ maxWidth: "400px" }}>
        <h2>Edit Posted Item</h2>

        <div className="auth-group">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="auth-group">
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="auth-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="auth-group">
          <label>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button className="auth-btn" onClick={updateItem}>
          Update Item
        </button>

        <button
          className="auth-link-btn"
          onClick={() => navigate("/my-items")}
        >
          ← Back
        </button>

        {msg && <p className="auth-msg">{msg}</p>}
      </div>
    </>
  );
}

export default EditItem;
