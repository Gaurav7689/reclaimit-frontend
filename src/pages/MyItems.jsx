import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Navbar from "../components/Navbar";

function MyItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadMyItems();
  }, []);

  const loadMyItems = async () => {
    try {
      const res = await api.get("/api/user/items");
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load your items");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar title="My Posted Items" />

      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>My Items</h2>

          <button
            className="auth-btn"
            onClick={() => navigate("/post")}
            style={{ width: "auto" }}
          >
            + Post New Item
          </button>
        </div>

        {loading && <p>Loading your items...</p>}

        {!loading && items.length === 0 && (
          <p style={{ marginTop: "20px" }}>
            You have not posted any items yet.
          </p>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              marginTop: "20px",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <h3>{item.title}</h3>

            <p>
              <b>Category:</b> {item.category}
            </p>

            <p>
              <b>Description:</b> {item.description}
            </p>

            <p>
              <b>Location:</b> {item.location}
            </p>

            <p>
              <b>Type:</b>{" "}
              <span
                style={{
                  color: item.itemType === "LOST" ? "#d32f2f" : "#2e7d32",
                  fontWeight: "bold",
                }}
              >
                {item.itemType}
              </span>
            </p>

            <p>
              <b>Status:</b>{" "}
              <span style={{ fontWeight: "bold" }}>{item.status}</span>
            </p>

            <div style={{ marginTop: "10px" }}>
              <button
                className="auth-btn"
                style={{ width: "auto" }}
                onClick={() => navigate(`/my-items/edit/${item.id}`)}

              >
                ✏️ Edit Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MyItems;
