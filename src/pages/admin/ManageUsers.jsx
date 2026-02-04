import { useEffect, useState } from "react";
import api from "../../api/api";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const res = await api.get("/api/admin/users");
    setUsers(res.data);
  };

  const blockUser = async (id) => {
    await api.put(`/api/admin/users/${id}/block`);
    loadUsers();
  };

  const unblockUser = async (id) => {
    await api.put(`/api/admin/users/${id}/unblock`);
    loadUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Manage Users</h2>

      {users.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "10px",
            background: "#fff"
          }}
        >
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phone}</p>
          <p><b>Role:</b> {user.role}</p>
          <p>
            <b>Status:</b>{" "}
            {user.blocked ? "❌ Blocked" : "✅ Active"}
          </p>

          {user.role !== "ADMIN" && (
            <>
              {user.blocked ? (
                <button onClick={() => unblockUser(user.id)}>
                  Unblock
                </button>
              ) : (
                <button onClick={() => blockUser(user.id)}>
                  Block
                </button>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ManageUsers;
