import { useNavigate } from "react-router-dom";

function Navbar({ title }) {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h3>{title}</h3>

      <div>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/my-items")}>My Items</button>
        <button onClick={() => {
          localStorage.clear();
          navigate("/");
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
