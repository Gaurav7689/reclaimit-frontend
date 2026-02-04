import { useEffect, useState } from "react";
import { getAllItems, reportItem } from "../api/itemApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("LOST");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const loggedEmail = localStorage.getItem("email");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const res = await getAllItems();
    setItems(res.data);
  };

  const handleReport = async (id) => {
    await reportItem(id, "This item matches my lost/found item");
    alert("Item reported successfully");
    loadItems();
  };

  const filteredItems = items.filter(
    (item) =>
      item.itemType === type &&
      item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ✅ NAVBAR */}
      <Navbar title="Lost & Found Dashboard" />

      <div className="container">
        {/* ✅ POST ITEM BUTTON */}
        <button
          onClick={() => navigate("/post")}
          style={{
            marginBottom: "15px",
            padding: "8px 12px",
            background: "#1e88e5",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          + Report Item
        </button>

        <h2>Lost & Found Items</h2>

        {/* 🔍 SEARCH */}
        <input
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            marginBottom: "15px",
            display: "block",
          }}
        />

        {/* 🧭 TABS */}
        <div style={{ marginBottom: "20px" }}>
          <button onClick={() => setType("LOST")}>Lost Items</button>
          <button
            onClick={() => setType("FOUND")}
            style={{ marginLeft: "10px" }}
          >
            Found Items
          </button>
        </div>

        {/* 📦 ITEMS LIST */}
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
              maxWidth: "400px",
            }}
          >
            <h3>{item.title}</h3>
            <p>
              <b>Category:</b> {item.category}
            </p>
            <p>
              <b>Type:</b> {item.itemType}
            </p>
            <p>
              <b>Status:</b> {item.status}
            </p>

            {/* 🚫 OWNER CANNOT REPORT OWN ITEM */}
            {item.postedBy.email !== loggedEmail && (
              <button onClick={() => handleReport(item.id)}>
                Report Match
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;
