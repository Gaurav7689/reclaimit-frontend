import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

function PostItem() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [itemType, setItemType] = useState("LOST");
  const [msg, setMsg] = useState("");

  const submitItem = async () => {
    setMsg("");

    try {
      await api.post("/api/items", {
        title,
        category,
        description,
        location,
        itemType,
      });

      alert("Item posted successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setMsg("Failed to post item");
    }
  };

  return (
    <>
      {/* ✅ NAVBAR WITH BACK */}
      <Navbar title="Post Lost / Found Item" />

      <div className="container" style={{ maxWidth: "400px" }}>
        <h2>Report Item</h2>

        <div className="auth-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Item name"
          />
        </div>

        <div className="auth-group">
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Bag, Mobile, ID Card"
          />
        </div>

        <div className="auth-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="More details about item"
          />
        </div>

        <div className="auth-group">
          <label>Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where it was lost/found"
          />
        </div>

        <div className="auth-group">
          <label>Item Type</label>
          <select
            value={itemType}
            onChange={(e) => setItemType(e.target.value)}
          >
            <option value="LOST">Lost</option>
            <option value="FOUND">Found</option>
          </select>
        </div>

        <button className="auth-btn" onClick={submitItem}>
          Submit
        </button>

        <button
          className="auth-link-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        {msg && <p className="auth-msg">{msg}</p>}
      </div>
    </>
  );
}

export default PostItem;
