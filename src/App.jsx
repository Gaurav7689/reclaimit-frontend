import { Routes, Route, Navigate } from "react-router-dom";

import Portal from "./pages/Portal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PostItem from "./pages/PostItem";
import MyItems from "./pages/MyItems"; // ✅ ADD THIS
import EditItem from "./pages/EditItem"; // ✅ ADD THIS

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageItems from "./pages/admin/ManageItems";
import ManageReports from "./pages/admin/ManageReports";

import AdminRoute from "./components/AdminRoute";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* 🔓 PUBLIC */}
      <Route path="/" element={<Portal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 👤 USER */}
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/post"
        element={token ? <PostItem /> : <Navigate to="/login" />}
      />

      {/* ✅ MY ITEMS (NEW) */}
      <Route
  path="/my-items"
  element={token ? <MyItems /> : <Navigate to="/login" />}
/>

<Route
  path="/my-items/edit/:id"
  element={token ? <EditItem /> : <Navigate to="/login" />}
/>


      {/* 👮 ADMIN (PROTECTED) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/items"
        element={
          <AdminRoute>
            <ManageItems />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/reports"
        element={
          <AdminRoute>
            <ManageReports />
          </AdminRoute>
        }
      />

      {/* ❌ FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
