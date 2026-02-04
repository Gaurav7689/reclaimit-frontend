import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "ADMIN") {
    alert("Access denied: Admin only");
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;
